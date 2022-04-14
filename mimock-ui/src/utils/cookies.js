import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookiesWithExpiry = async (name, value, expiryInSeconds) => {
	document.cookie = `${name}=${value}; expires=${new Date(
		Date.now() + parseInt(expiryInSeconds) * 1000
	)}; path=/`;

	return Promise.resolve(cookies.get(name));
};
