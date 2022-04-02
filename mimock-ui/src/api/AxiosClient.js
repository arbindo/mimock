import axios from 'axios';
import { Cookies } from 'react-cookie';
import { globalConstants } from 'constants/globalConstants';
import { LogError } from './logger/Logger';
import { config } from '../Config';

const cookies = new Cookies();
const csrfToken = cookies.get('XSRF-TOKEN');
const authToken = cookies.get(globalConstants.authCookieName);

export const controller = new AbortController();

export const client = axios.create({
	baseURL: `${config.hostName[process.env.NODE_ENV]}/api/mimock/v1`,
	withCredentials: true,
	headers: {
		'X-XSRF-TOKEN': csrfToken,
	},
	signal: controller.signal,
});

const get = async (url, config = {}) => {
	return await client
		.get(url, {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
			...config,
		})
		.catch((err) => {
			LogError(err);
			return err;
		});
};

const post = async (url, requestData, contentType, config = {}) => {
	return await client
		.post(url, requestData, {
			headers: {
				Authorization: `Bearer ${authToken}`,
				'Content-Type': contentType,
			},
			...config,
		})
		.catch((err) => {
			LogError(err);
			return err;
		});
};

const authenticate = async (url, requestData, config = {}) => {
	return await client
		.post(url, requestData, {
			headers: {
				'Content-Type': 'application/json',
			},
			...config,
		})
		.catch((err) => {
			LogError(err);
			return err;
		});
};

const put = async (url, data, contentType, config) => {
	return await client
		.put(url, data, {
			headers: {
				Authorization: `Bearer ${authToken}`,
				'Content-Type': contentType,
			},
			...config,
		})
		.catch((err) => {
			LogError(err);
			return err;
		});
};

const remove = async (url, config) => {
	return await client
		.delete(url, {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
			...config,
		})
		.catch((err) => {
			LogError(err);
			return err;
		});
};

const options = async (url, config) => {
	return await client
		.options(url, {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
			...config,
		})
		.catch((err) => {
			LogError(err);
			return err;
		});
};

export { get, post, put, remove, options, authenticate };
