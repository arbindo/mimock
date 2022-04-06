import { get } from 'api/AxiosClient';

const isTokenValid = async () => {
	return await get('/auth-token/validate')
		.then(() => {
			return true;
		})
		.catch(() => false);
};

export { isTokenValid };
