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
			const { users } = res.data;
			return users
				.filter((user) => user.userName !== userDetails.userName)
				.sort((a, b) => (a.name < b.name ? -1 : 1));
		});
	}

	throw new Error('Unauthorized to access this resource');
};
