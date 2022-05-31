import { put } from 'api/AxiosClient';

export const updateUserActivationStatus = async (userName, isUserActive) => {
	const payload = {
		userName,
		isUserActive,
	};

	return await put('/admin/users/update-activation', payload)
		.then((res) => res.data)
		.catch((err) => Promise.reject(err));
};
