import { getUserInfo } from './getUserInfo.service';
import { get } from 'api/AxiosClient';

jest.mock('api/AxiosClient');

describe('getUserInfo.service', () => {
	it('should return user info', async () => {
		get.mockResolvedValue({
			data: {
				userInfo: {
					userName: 'mimock_admin',
					userId: '00000000-0000-0000-0000-000000000000',
					name: 'Mimock Admin',
					userRole: 'ADMIN',
				},
			},
		});

		const userId = 'd749184e-b60d-4ac0-b459-e3b9cc5710d1';
		const userInfo = await getUserInfo(userId);

		expect(userInfo).toEqual({
			userName: 'mimock_admin',
			userId: '00000000-0000-0000-0000-000000000000',
			name: 'Mimock Admin',
			userRole: 'ADMIN',
		});
	});

	it('should throw error when get call fails', async () => {
		get.mockRejectedValue(new Error('Failed to get user info'));

		await getUserInfo('d749184e-b60d-4ac0-b459-e3b9cc5710d1').catch((err) => {
			expect(err).toBeDefined();
			expect(err).toBeInstanceOf(Error);
			expect(err.message).toBe('Failed to get user info');
		});
	});
});
