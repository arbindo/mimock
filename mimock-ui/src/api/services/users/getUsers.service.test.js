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
						name: 'Boris',
					},
					{
						userName: 'user_current',
						userRole: 'ROLE_ADMIN',
						userId: 'userCurrent',
						name: 'Adam',
					},
					{
						userName: 'user2',
						userRole: 'ROLE_ADMIN',
						userId: 'user2',
						name: 'Cindy',
					},
				],
			},
		});

		const users = await getAllUsers();

		expect(users).toBeDefined();
		expect(users).toHaveLength(2);

		expect(users[0].userName).toBe('user1');
		expect(users[0].userId).toBe('user1');
		expect(users[0].name).toBe('Boris');

		expect(users[1].userName).toBe('user2');
		expect(users[1].userId).toBe('user2');
		expect(users[1].name).toBe('Cindy');
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
