import { put } from 'api/AxiosClient';
import { Cookies } from 'react-cookie';
import { globalConstants } from 'constants/globalConstants';

const updatePlatformSettings = async (
	isExportImportEnabled,
	isFlushBinCronEnabled
) => {
	const cookies = new Cookies();
	var payloadData = {
		isExportImportEnabled: isExportImportEnabled,
		isFlushBinCronEnabled: isFlushBinCronEnabled,
	};
	const response = await put('/platform-settings', payloadData);
	if (response != null && response.status == 200) {
		cookies.set(
			globalConstants.PLATFORM_SETTINGS_COOKIE_NAME,
			response.data.data
		);
		return response.data.data;
	}
	return null;
};

export { updatePlatformSettings };
