import { get } from 'api/AxiosClient';

export const getUserRoles = async () => {
	return await get('/static-records/user-roles')
		.then((res) => res.data)
		.catch((err) => err);
};
