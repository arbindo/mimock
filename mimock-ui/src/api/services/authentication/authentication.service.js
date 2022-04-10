import { authenticate } from 'api/AxiosClient';
import { setCookiesWithExpiry } from 'utils/cookies';
import { globalConstants } from 'constants/globalConstants';
import { isTokenValid } from 'services/authentication/validateToken.service';

const getToken = async (userName, password) => {
	return await authenticate(
		`/user/authenticate`,
		{
			userName,
			password,
		},
		{ showFullPageLoader: true }
	)
		.then(async (res) => {
			const authCookie = await setCookiesWithExpiry(
				globalConstants.AUTH_TOKEN_COOKIE_NAME,
				res.data.token,
				res.data.expiresAfterSeconds
			);

			if (authCookie) {
				return (await isTokenValid()) ? authCookie : null;
			}

			throw new Error('Failed to set auth cookie');
		})
		.catch((err) => {
			console.error(err);
			throw new Error(err);
		});
};

export { getToken };
