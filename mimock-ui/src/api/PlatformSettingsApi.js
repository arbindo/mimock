import { get, put } from './AxiosClient';

const listPlatformSettings = async (token) => {
	return await get('/platform-settings', token);
};

const updatePlatformSettings = async (requestData, token) => {
	return await put('/platform-settings', requestData, token);
};

export { listPlatformSettings, updatePlatformSettings };
