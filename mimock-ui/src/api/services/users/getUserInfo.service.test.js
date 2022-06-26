import { getUserInfo } from './getUserInfo.service';
import { get } from 'api/AxiosClient';

jest.mock('api/AxiosClient');

describe('getUserInfo.service', () => {
	it('should return user info when userId is passed', async () => {
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
		const userInfo = await getUserInfo({ userId });

		expect(get).toHaveBeenCalledWith(
			`/admin/users/user-info?userId=d749184e-b60d-4ac0-b459-e3b9cc5710d1`,
			{ showFullPageLoader: true }
		);
		expect(userInfo).toEqual({
			userName: 'mimock_admin',
			userId: '00000000-0000-0000-0000-000000000000',
			name: 'Mimock Admin',
			userRole: 'ADMIN',
		});
	});

	it('should return user info when userName is passed', async () => {
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

		const userName = 'mimock_admin';
		const userInfo = await getUserInfo({ userName });

		expect(get).toHaveBeenCalledWith(
			`/admin/users/user-info?userName=mimock_admin`,
			{ showFullPageLoader: true }
		);
		expect(userInfo).toEqual({
			userName: 'mimock_admin',
			userId: '00000000-0000-0000-0000-000000000000',
			name: 'Mimock Admin',
			userRole: 'ADMIN',
		});
	});

	it('should throw error when get call fails', async () => {
		get.mockRejectedValue(new Error('Failed to get user info'));

		await getUserInfo({ userId: 'd749184e-b60d-4ac0-b459-e3b9cc5710d1' }).catch(
			(err) => {
				expect(get).toHaveBeenCalledWith(
					`/admin/users/user-info?userId=d749184e-b60d-4ac0-b459-e3b9cc5710d1`,
					{ showFullPageLoader: true }
				);

				expect(err).toBeDefined();
				expect(err).toBeInstanceOf(Error);
				expect(err.message).toBe('Failed to get user info');
			}
		);
	});

	it('should throw error when required field is missing', async () => {
		await getUserInfo().catch((err) => {
			expect(get).toHaveBeenCalledTimes(0);

			expect(err).toBeDefined();
			expect(err).toBeInstanceOf(Error);
		});
	});
});
