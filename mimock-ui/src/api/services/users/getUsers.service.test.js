import { get } from 'api/AxiosClient';
import { getAllUsers } from './getUsers.service';
import { getUserDetails } from 'utils/jwtUtils';

jest.mock('api/AxiosClient');
jest.mock('utils/jwtUtils');

describe('getUsers.service', () => {
	it('should return all users filtering current user', async () => {
		getUserDetails.mockReturnValue({
			userName: 'user_current',
			userRole: 'ROLE_ADMIN',
		});
		get.mockResolvedValue({
			data: {
				users: [
					{
						userName: 'user1',
						userRole: 'ROLE_ADMIN',
						userId: 'user1',
						name: 'User 1',
					},
					{
						userName: 'user_current',
						userRole: 'ROLE_ADMIN',
						userId: 'userCurrent',
						name: 'User Current',
					},
				],
			},
		});

		const users = await getAllUsers();

		expect(users).toBeDefined();
		expect(users).toHaveLength(1);

		expect(users[0].userName).toBe('user1');
		expect(users[0].userId).toBe('user1');
		expect(users[0].name).toBe('User 1');
	});

	it('should return empty list when no users are present other than current user', async () => {
		getUserDetails.mockReturnValue({
			userName: 'user_current',
			userRole: 'ROLE_ADMIN',
		});
		get.mockResolvedValue({
			data: {
				users: [
					{
						userName: 'user_current',
						userRole: 'ROLE_ADMIN',
						userId: 'userCurrent',
						name: 'User Current',
					},
				],
			},
		});

		const users = await getAllUsers();

		expect(users).toBeDefined();
		expect(users).toHaveLength(0);
	});

	it('should reject promise when getUserDetails throws error', async () => {
		getUserDetails.mockImplementation(() => {
			throw Error('Invalid user session');
		});
		get.mockResolvedValue({
			data: {
				users: [
					{
						userName: 'user_current',
						userRole: 'ROLE_ADMIN',
						userId: 'userCurrent',
						name: 'User Current',
					},
				],
			},
		});

		await getAllUsers().catch((err) => {
			expect(err).toBeDefined();
			expect(err).toBeInstanceOf(Error);
			expect(err.message).toBe('Invalid user session');
		});
	});

	it('should throw unauthorised error when user session is invalid', async () => {
		getUserDetails.mockReturnValue(null);
		get.mockResolvedValue({
			data: {
				users: [
					{
						userName: 'user_current',
						userRole: 'ROLE_ADMIN',
						userId: 'userCurrent',
						name: 'User Current',
					},
				],
			},
		});

		await getAllUsers().catch((err) => {
			expect(err).toBeDefined();
			expect(err).toBeInstanceOf(Error);
			expect(err.message).toBe('Unauthorized to access this resource');
		});
	});
});
