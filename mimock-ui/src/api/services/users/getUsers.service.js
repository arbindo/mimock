import { get } from 'api/AxiosClient';
import { getUserDetails } from 'utils/jwtUtils';

export const getAllUsers = async () => {
	let userDetails;

	try {
		userDetails = getUserDetails();
	} catch (err) {
		return Promise.reject(err);
	}

	if (userDetails && userDetails.userRole === 'ROLE_ADMIN') {
		return await get('/admin/users', {
			showFullPageLoader: true,
		}).then((res) => {
			const { data } = res;
			return data.filter((user) => user.userName !== userDetails.userName);
		});
	}

	throw new Error('Unauthorized to access this resource');
};
