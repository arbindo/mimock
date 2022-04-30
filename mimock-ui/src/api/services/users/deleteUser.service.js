import { remove } from 'api/AxiosClient';

export const deleteUser = async (userName) => {
	const url = '/admin/users/delete-user?userName=' + userName;

	return await remove(url)
		.then((res) => res.data)
		.catch((err) => Promise.reject(err));
};
