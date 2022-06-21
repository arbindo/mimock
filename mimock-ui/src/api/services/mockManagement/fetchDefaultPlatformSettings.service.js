import { get } from 'api/AxiosClient';
import { Cookies } from 'react-cookie';
import { globalConstants } from 'constants/globalConstants';

const fetchDefaultPlatformSettings = async (token) => {
	const cookies = new Cookies();
	const response = await get('/platform-settings', token);
	if (response != null && response.status == 200) {
		const defaultSettings = response.data[0];
		cookies.set(globalConstants.PLATFORM_SETTINGS_COOKIE_NAME, defaultSettings);
		return defaultSettings;
	}
	return null;
};

export { fetchDefaultPlatformSettings };
