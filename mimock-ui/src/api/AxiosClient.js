import axios from 'axios';
import { Log, LogError } from '../logger/Logger';
import { Cookies } from 'react-cookie';

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
	try {
		const response = await client.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		Log(url, response);
		return response;
	} catch (err) {
		LogError(err);
	}
	return null;
};

const post = async (url, requestData, token, contentType) => {
	try {
		const response = await client.post(url, requestData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': contentType,
			},
		});
		Log(url, response);
		return response;
	} catch (err) {
		LogError(err);
	}
	return null;
};

const authenticate = async (url, requestData) => {
	try {
		const response = await client.post(url, requestData, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		Log(url, response);
		return response;
	} catch (err) {
		LogError(err);
	}
	return null;
};

const put = async (url, data, token, contentType) => {
	try {
		const response = await client.put(url, data, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': contentType,
			},
		});
		Log(url, response);
		return response;
	} catch (err) {
		LogError(err);
	}
	return null;
};

const remove = async (url, token) => {
	try {
		const response = await client.delete(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		Log(url, response);
		return response;
	} catch (err) {
		LogError(err);
	}
	return null;
};

const options = async (url, token) => {
	try {
		const response = await client.options(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		Log(url, response);
		return response;
	} catch (err) {
		LogError(err);
	}
	return null;
};

export { get, post, put, remove, options, authenticate };
