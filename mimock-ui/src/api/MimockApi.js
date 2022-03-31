import { get, post, put, remove, authenticate } from './AxiosClient';

const getAllMocks = async (token) => {
	return await get('/mocks', token);
};

const getMockById = async (id, token) => {
	return await get(`/mocks/${id}`, token);
};

const getToken = async (userName, password) => {
	return await authenticate(`/user/authenticate`, {
		userName,
		password,
	});
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

const forceDeleteMockById = async (id, token) => {
	return await remove(`/mocks/${id}:forceDelete`, token);
};

const listMocks = async (token) => {
	return await get('/mocks/filter?status=NONE', token);
};

const listArchivedMocks = async (token) => {
	return await get('/mocks/filter?status=ARCHIVED', token);
};

const listDeletedMocks = async (token) => {
	return await get('/mocks/filter?status=DELETED', token);
};

const archiveMock = async (id, token) => {
	return await post(`/mocks/${id}:archive`, null, token);
};

const unarchiveMock = async (id, token) => {
	return await post(`/mocks/${id}:unarchive`, null, token);
};

const exportMocks = async (token) => {
	return await get('/mocks/csv/export', token);
};

const exportMocksCsvTemplate = async (token) => {
	return await get('/mocks/csv/template/export', token);
};

export {
	getAllMocks,
	getMockById,
	createMock,
	updateMock,
	deleteMockById,
	forceDeleteMockById,
	listMocks,
	listArchivedMocks,
	listDeletedMocks,
	archiveMock,
	unarchiveMock,
	exportMocks,
	exportMocksCsvTemplate,
	getToken,
};
