import { post } from 'api/AxiosClient';

const importMocks = async (requestData) => {
	return await post(
		'/mocks/csv/import',
		requestData,
		'multipart/form-data; boundary=----WebKitFormBoundaryCRo3Ba2zzMcT9X03'
	);
};

export { importMocks };
