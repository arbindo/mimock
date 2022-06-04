import { updatePassword } from './updatePassword.service';
import { put } from 'api/AxiosClient';

jest.mock('api/AxiosClient');
const Bcrypt = jest.requireActual('bcryptjs');

describe('updatePassword.service', () => {
	let hashedPassword;

	beforeEach(() => {
		hashedPassword =
			'$2a$12$Afk34nIJptnvK2vI2PW3Q.zLnqonCB5XMMoCrPtYRJuKPBC1qN1Iq';
		jest
			.spyOn(Bcrypt, 'genSaltSync')
			.mockReturnValue('$2a$12$Afk34nIJptnvK2vI2PW3Q.');
		jest.spyOn(Bcrypt, 'hashSync').mockReturnValue(hashedPassword);
		put.mockResolvedValue({});
	});

	it('should call update password api with username and hashed password', async () => {
		updatePassword('test', 'password');

		expect(put).toHaveBeenCalledTimes(1);
		expect(put).toHaveBeenCalledWith('/admin/users/update-password', {
			userName: 'test',
			password: hashedPassword,
		});
	});

	it('should throw error when put call fails', async () => {
		put.mockRejectedValue(new Error('update error'));

		updatePassword('test', 'password').catch((err) => {
			expect(put).toHaveBeenCalledTimes(1);
			expect(put).toHaveBeenCalledWith('/admin/users/update-password', {
				userName: 'test',
				password: hashedPassword,
			});
			expect(err).toBeInstanceOf(Error);
			expect(err.message).toBe('update error');
		});
	});
});
