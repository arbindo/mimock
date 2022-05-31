import { updateUserActivationStatus } from './updateUserActivationStatus.service';
import { put } from 'api/AxiosClient';

jest.mock('api/AxiosClient');

describe('updateUserActivationStatus.service', () => {
	it('should update user activation status', async () => {
		put.mockResolvedValue({
			data: {
				userName: 'test123',
				updatedActivationStatus: true,
			},
		});

		const updatedStatus = await updateUserActivationStatus('test123', true);

		expect(put).toHaveBeenCalledWith('/admin/users/update-activation', {
			userName: 'test123',
			isUserActive: true,
		});
		expect(updatedStatus).toEqual({
			userName: 'test123',
			updatedActivationStatus: true,
		});
	});

	it('should return error when update user activation status fails', async () => {
		put.mockRejectedValue(new Error('update failed'));

		await updateUserActivationStatus('test123', true).catch((err) => {
			expect(put).toHaveBeenCalledWith('/admin/users/update-activation', {
				userName: 'test123',
				isUserActive: true,
			});
			expect(err).toBeInstanceOf(Error);
			expect(err.message).toEqual('update failed');
		});
	});
});
