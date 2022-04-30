import { deleteUser } from './deleteUser.service';
import { remove } from 'api/AxiosClient';

jest.mock('api/AxiosClient');

describe('deleteUser.service', () => {
	it('should delete user', async () => {
		const userName = 'user_name';
		const url = '/admin/users/delete-user?userName=' + userName;

		remove.mockResolvedValue({
			data: {
				message: 'User deleted successfully.',
			},
		});

		const response = await deleteUser(userName);

		expect(response).toBeDefined();
		expect(response.message).toBe('User deleted successfully.');

		expect(remove).toHaveBeenCalledWith(url);
	});

	it('should throw error when remove api call fails', async () => {
		const userName = 'user_name';
		const url = '/admin/users/delete-user?userName=' + userName;

		remove.mockRejectedValue(new Error('Error'));

		await deleteUser(userName).catch((err) => {
			expect(err).toBeDefined();
			expect(err.message).toBe('Error');

			expect(remove).toHaveBeenCalledWith(url);
		});
	});
});
