import { updateUserRole } from './updateUserRole.service';
import { put } from 'api/AxiosClient';

jest.mock('api/AxiosClient');

describe('updateUserRole.service', () => {
	it('should update user role with user name and role', async () => {
		put.mockResolvedValue({
			data: {
				userName: 'test1',
				updatedUserRole: 'MANAGER',
			},
		});

		const response = await updateUserRole('test1', 'MANAGER');

		expect(response).toEqual({
			userName: 'test1',
			updatedUserRole: 'MANAGER',
		});
		expect(put).toHaveBeenCalledTimes(1);
		expect(put).toHaveBeenCalledWith('/admin/users/update-role', {
			userName: 'test1',
			userRole: 'MANAGER',
		});
	});

	it('should return error when put call fails', async () => {
		put.mockRejectedValue(new Error('put failed'));

		await updateUserRole('test1', 'MANAGER').catch((err) => {
			expect(err).toBeInstanceOf(Error);
			expect(err.message).toBe('put failed');
			expect(put).toHaveBeenCalledTimes(1);
			expect(put).toHaveBeenCalledWith('/admin/users/update-role', {
				userName: 'test1',
				userRole: 'MANAGER',
			});
		});
	});
});
