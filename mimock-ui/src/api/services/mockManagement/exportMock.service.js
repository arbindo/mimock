import { get } from 'api/AxiosClient';

const exportMocks = async (token) => {
	return await get('/mocks/csv/export', token);
};

const exportMocksCsvTemplate = async (token) => {
	return await get('/mocks/csv/template/export', token);
};

export { exportMocks, exportMocksCsvTemplate };
