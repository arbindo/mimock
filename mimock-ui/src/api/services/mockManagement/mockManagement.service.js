import { get, post, put, remove } from 'api/AxiosClient';

const DEFAULT_LIST_FETCH_SIZE = 5;

const getAllMocks = async (token) => {
	return await get('/mocks', token);
};

const getMockById = async (id) => {
	return await get(`/mocks/${id}`, { showFullPageLoader: true });
};

const createMock = async (requestData) => {
	return await post(
		`/mocks`,
		requestData,
		'multipart/form-data; boundary=----WebKitFormBoundaryCRo3Ba2zzMcT9X03',
		{ showFullPageLoader: true }
	);
};

const updateMock = async (id, requestData) => {
	return await put(
		`/mocks/${id}`,
		requestData,
		'multipart/form-data; boundary=----WebKitFormBoundaryCRo3Ba2zzMcT9X03',
		{ showFullPageLoader: true }
	);
};

const deleteMockById = async (id, token) => {
	return await remove(`/mocks/${id}`, token);
};

const forceDeleteMockById = async (id, token) => {
	return await remove(`/mocks/${id}:forceDelete`, token);
};

const listMocks = async (token, pageNumber) => {
	return await get(
		`/mocks/filter?size=${DEFAULT_LIST_FETCH_SIZE}&page=${pageNumber}`,
		token
	);
};

const listActiveMocks = async (token, pageNumber) => {
	return await get(
		`/mocks/filter?status=NONE&size=${DEFAULT_LIST_FETCH_SIZE}&page=${pageNumber}`,
		token
	);
};

const listArchivedMocks = async (token, pageNumber) => {
	return await get(
		`/mocks/filter?status=ARCHIVED&size=${DEFAULT_LIST_FETCH_SIZE}&page=${pageNumber}`,
		token
	);
};

const listDeletedMocks = async (token, pageNumber) => {
	return await get(
		`/mocks/filter?status=DELETED&size=${DEFAULT_LIST_FETCH_SIZE}&page=${pageNumber}`,
		token
	);
};

const listMocksWithMultipleFilters = async (
	token,
	pageNumber,
	status,
	httpMethodFilter,
	sortColumnWithDirection,
	expectedResponseType
) => {
	let urlToBeQueried = `/mocks/filter?size=${DEFAULT_LIST_FETCH_SIZE}&page=${pageNumber}`;
	if (httpMethodFilter !== '' && httpMethodFilter !== undefined) {
		urlToBeQueried += `&httpMethod=${httpMethodFilter}`;
	}
	if (status !== '' && status !== undefined) {
		urlToBeQueried += `&status=${status}`;
	}
	if (sortColumnWithDirection !== '' && sortColumnWithDirection !== undefined) {
		urlToBeQueried += `&sort=${sortColumnWithDirection}`;
	}
	if (expectedResponseType !== '' && expectedResponseType !== undefined) {
		urlToBeQueried += `&expectedResponseType=${expectedResponseType}`;
	}
	return await get(urlToBeQueried, token);
};

const archiveMock = async (id, token) => {
	return await post(`/mocks/${id}:archive`, null, token);
};

const unarchiveMock = async (id, token) => {
	return await post(`/mocks/${id}:unarchive`, null, token);
};

export {
	getAllMocks,
	getMockById,
	createMock,
	updateMock,
	deleteMockById,
	forceDeleteMockById,
	listMocks,
	listActiveMocks,
	listArchivedMocks,
	listDeletedMocks,
	listMocksWithMultipleFilters,
	archiveMock,
	unarchiveMock,
};
