import { post } from 'api/AxiosClient';

const importMocks = async (token) => {
	return await post('/mocks/csv/import', token);
};

export { importMocks };
