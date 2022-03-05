import { get, post, put, remove } from './AxiosClient';

const getMocks = async (token) => {
	return await get('/mocks', token);
};

const getMockById = async (id, token) => {
	return await get(`/mocks/${id}`, token);
};

const createMock = async (requestData, token) => {
	return await post(
		`/mocks`,
		requestData,
		token,
		'multipart/form-data; boundary=----WebKitFormBoundaryCRo3Ba2zzMcT9X03'
	);
};

const updateMock = async (id, requestData, token) => {
	return await put(
		`/mocks/${id}`,
		requestData,
		token,
		'multipart/form-data; boundary=----WebKitFormBoundaryCRo3Ba2zzMcT9X03'
	);
};

const deleteMockById = async (id, token) => {
	return await remove(`/mocks/${id}`, token);
};

export { getMocks, getMockById, createMock, updateMock, deleteMockById };
