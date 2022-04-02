import { authenticate } from 'api/AxiosClient';

const getToken = async (userName, password) => {
	return await authenticate(`/user/authenticate`, {
		userName,
		password,
	}).catch((err) => err);
};

export { getToken };
