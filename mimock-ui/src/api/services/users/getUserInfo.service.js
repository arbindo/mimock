import { get } from 'api/AxiosClient';

export const getUserInfo = async (userId) => {
	const url = `/admin/users/user-info?userId=${userId}`;

	return await get(url, { showFullPageLoader: true })
		.then((res) => res.data.userInfo)
		.catch((err) => Promise.reject(err));
};
