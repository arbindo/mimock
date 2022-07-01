import { get } from 'api/AxiosClient';

export const getHttpMethods = async () => {
	return await get('/static-records/http-methods')
		.then((res) => {
			return res.data.map((item) => item.method);
		})
		.catch((err) => Promise.reject(err));
};
