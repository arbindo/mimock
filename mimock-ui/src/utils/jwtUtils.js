import { Buffer } from 'buffer';
import { Cookies } from 'react-cookie';
import { globalConstants } from 'src/constants/globalConstants';

export const getUserDetails = () => {
	const authToken = new Cookies().get(globalConstants.AUTH_TOKEN_COOKIE_NAME);

	if (!authToken) {
		throw new Error('Auth token does not exist');
	}

	const splitToken = authToken.toString().split('.');
	if (splitToken?.length < 3) {
		throw new Error('Auth token is invalid');
	}

	const userDetails = Buffer.from(authToken.split('.')[1], 'base64').toString(
		'ascii'
	);

	return JSON.parse(userDetails);
};
