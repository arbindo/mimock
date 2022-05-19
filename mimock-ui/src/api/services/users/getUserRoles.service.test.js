import { get } from 'api/AxiosClient';
import { getUserRoles } from './getUserRoles.service';

jest.mock('api/AxiosClient');

describe('getUserRoles.service', () => {
	it('should get all user roles', async () => {
		const expectedUserRoles = [
			{
				roleName: 'ADMIN',
			},
			{
				roleName: 'MANAGER',
			},
			{
				roleName: 'VIEWER',
			},
		];

		get.mockResolvedValue({
			data: expectedUserRoles,
		});

		const userRoles = await getUserRoles();

		expect(userRoles).toEqual(expectedUserRoles);
	});

	it('should throw error when get api call fails', async () => {
		get.mockRejectedValue(new Error('Get call failed!'));

		getUserRoles().catch((err) => {
			expect(err.message).toEqual('Get call failed!');
			expect(err).toBeInstanceOf(Error);
		});
	});
});
