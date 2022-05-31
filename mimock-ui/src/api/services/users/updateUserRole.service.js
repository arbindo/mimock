import { put } from 'api/AxiosClient';

export const updateUserRole = async (userName, role) => {
	return await put('/admin/users/update-role', {
		userName,
		userRole: role,
	})
		.then((res) => res.data)
		.catch((err) => Promise.reject(err));
};
