import { get } from './AxiosClient';

const listHttpMethods = async (token) => {
	return await get('/static-records/http-methods', token);
};

const listResponseContentTypes = async (token) => {
	return await get('/static-records/response-content-types', token);
};

const listEntityStatus = async (token) => {
	return await get('/static-records/entity-status', token);
};

export { listHttpMethods, listResponseContentTypes, listEntityStatus };
