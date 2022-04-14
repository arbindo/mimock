import { get } from 'api/AxiosClient';

let result;

const isTokenValid = async () => {
	return await get('/auth-token/validate')
		.then(() => {
			result = true;
			return result;
		})
		.catch(() => {
			result = false;
			return result;
		});
};

const readToken = () => {
	return {
		read() {
			return result;
		},
	};
};

export { isTokenValid, readToken };
