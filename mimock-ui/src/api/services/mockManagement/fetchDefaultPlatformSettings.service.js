import { get } from 'api/AxiosClient';
import { Cookies } from 'react-cookie';
import { globalConstants } from 'constants/globalConstants';

const fetchDefaultPlatformSettings = async () => {
	const cookies = new Cookies();
	await get('/platform-settings').then((response) => {
		const defaultSettings = response.data[0];
		cookies.set(globalConstants.PLATFORM_SETTINGS_COOKIE_NAME, defaultSettings);
	});
};

export { fetchDefaultPlatformSettings };
