import axios from 'axios';
import { Cookies } from 'react-cookie';
import { LogError } from './logger/Logger';

const cookies = new Cookies();
const csrfToken = cookies.get('XSRF-TOKEN');

export const controller = new AbortController();

export const client = axios.create({
	//TODO: Replace origin with value fetched from config file
	baseURL: 'http://localhost:8080/api/mimock/v1',
	withCredentials: true,
	headers: {
		'X-XSRF-TOKEN': csrfToken,
	},
	signal: controller.signal,
});

const get = async (url, token) => {
	return await client
		.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.catch((err) => {
			LogError(err);
			return err;
		});
};

const post = async (url, requestData, token, contentType) => {
	return await client
		.post(url, requestData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': contentType,
			},
		})
		.catch((err) => {
			LogError(err);
			return err;
		});
};

const authenticate = async (url, requestData) => {
	return await client
		.post(url, requestData, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.catch((err) => {
			LogError(err);
			return err;
		});
};

const put = async (url, data, token, contentType) => {
	return await client
		.put(url, data, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': contentType,
			},
		})
		.catch((err) => {
			LogError(err);
			return err;
		});
};

const remove = async (url, token) => {
	return await client
		.delete(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.catch((err) => {
			LogError(err);
			return err;
		});
};

const options = async (url, token) => {
	return await client
		.options(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.catch((err) => {
			LogError(err);
			return err;
		});
};

export { get, post, put, remove, options, authenticate };
