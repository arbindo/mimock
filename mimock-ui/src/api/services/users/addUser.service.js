import { post } from 'api/AxiosClient';
import Bcrypt from 'bcryptjs';

export const addNewUser = async ({ name, userName, password, userRole }) => {
	const salt = Bcrypt.genSaltSync(12);
	const hashedPassword = Bcrypt.hashSync(password, salt);

	return await post(
		'/admin/users',
		{
			name,
			userName,
			userRole,
			password: hashedPassword,
		},
		undefined,
		{ showFullPageLoader: true }
	).catch((err) => Promise.reject(err));
};
