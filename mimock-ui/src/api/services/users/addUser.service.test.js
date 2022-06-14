import { addNewUser } from './addUser.service';
import { post } from 'api/AxiosClient';

jest.mock('api/AxiosClient');

const Bcrypt = jest.requireActual('bcryptjs');

describe('addUser.service', () => {
	let hashedPassword;

	beforeEach(() => {
		hashedPassword =
			'$2a$12$ZlN1NFw1WRhLb7Hn1BSFt.W.PkWjRa/I598Aab/WuXP4PM0QH9yau';
		jest
			.spyOn(Bcrypt, 'genSaltSync')
			.mockReturnValue('$2a$12$Afk34nIJptnvK2vI2PW3Q.');
		jest.spyOn(Bcrypt, 'hashSync').mockReturnValue(hashedPassword);
	});

	it('should add new user', async () => {
		post.mockResolvedValue({});

		const userData = {
			name: 'Darth Vader',
			userName: 'lord1977',
			password: '$2a$12$ZlN1NFw1WRhLb7Hn1BSFt.W.PkWjRa/I598Aab/WuXP4PM0QH9yau',
			userRole: 'ADMIN',
		};

		const result = await addNewUser(userData);

		expect(result).toEqual({});
		expect(post).toHaveBeenCalledTimes(1);
		expect(post).toHaveBeenCalledWith('/admin/users', userData, undefined, {
			showFullPageLoader: true,
		});
	});

	it('should reject promise when post call fails', async () => {
		post.mockRejectedValue(new Error('Error'));

		const userData = {
			name: 'Darth Vader',
			userName: 'lord1977',
			password: '$2a$12$ZlN1NFw1WRhLb7Hn1BSFt.W.PkWjRa/I598Aab/WuXP4PM0QH9yau',
			userRole: 'ADMIN',
		};

		addNewUser(userData).catch((err) => {
			expect(err).toBeInstanceOf(Error);
			expect(err.message).toBe('Error');
			expect(post).toHaveBeenCalledWith('/admin/users', userData, undefined, {
				showFullPageLoader: true,
			});
			expect(post).toHaveBeenCalledTimes(1);
		});
	});
});
