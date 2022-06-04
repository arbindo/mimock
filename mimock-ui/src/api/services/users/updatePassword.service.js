import { put } from 'api/AxiosClient';
import Bcrypt from 'bcryptjs';

export const updatePassword = async (userName, password) => {
	const salt = Bcrypt.genSaltSync(12);
	const hash = Bcrypt.hashSync(password, salt);

	return await put('/admin/users/update-password', {
		userName,
		password: hash,
	}).catch((err) => Promise.reject(err));
};
