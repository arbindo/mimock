import { get, post, put, remove, options, authenticate } from './AxiosClient';
import mockAxios from 'jest-mock-axios';

jest.mock('react-cookie', () => ({
	Cookies: jest.fn().mockImplementation(() => ({
		...jest.requireActual('react-cookie'),
		get: () => 'eyJpYXQiOiJTYXQg',
	})),
}));

describe('AxiosClient', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.clearAllMocks();
		mockAxios.reset();
	});

	afterAll(() => {
		jest.resetAllMocks();
	});

	describe('get', () => {
		it('should call axios.get with the correct url and headers', async () => {
			mockAxios.get.mockResolvedValue({ data: { mock: { id: 1 } } });

			const response = await get('/test');

			expect(mockAxios.get).toHaveBeenCalledWith('/test', {
				headers: {
					Authorization: 'Bearer eyJpYXQiOiJTYXQg',
				},
			});

			expect(response).toBeTruthy();
			expect(response.data).toEqual({ mock: { id: 1 } });
		});

		it('should fail in axios.get call', async () => {
			mockAxios.get.mockRejectedValue(new Error('error'));

			const err = await get('/test');

			expect(mockAxios.get).toHaveBeenCalledWith('/test', {
				headers: {
					Authorization: 'Bearer eyJpYXQiOiJTYXQg',
				},
			});
			expect(err).toBeTruthy();
			expect(err).toBeInstanceOf(Error);
			expect(err.message).toEqual('error');
		});
	});

	describe('post', () => {
		it('should call axios.post with the correct url, request body and headers', async () => {
			mockAxios.post.mockResolvedValue({ data: { message: 'Mock created' } });

			const response = await post(
				'/test',
				{ mock: { id: 1 } },
				'application/json'
			);

			expect(mockAxios.post).toHaveBeenCalledWith(
				'/test',
				{ mock: { id: 1 } },
				{
					headers: {
						Authorization: 'Bearer eyJpYXQiOiJTYXQg',
						'Content-Type': 'application/json',
					},
				}
			);

			expect(response).toBeTruthy();
			expect(response.data).toEqual({ message: 'Mock created' });
		});

		it('should fail in axios.post call', async () => {
			mockAxios.post.mockRejectedValue(new Error('error'));

			const err = await post('/test', { mock: { id: 1 } }, 'application/json');

			expect(mockAxios.post).toHaveBeenCalledWith(
				'/test',
				{ mock: { id: 1 } },
				{
					headers: {
						Authorization: 'Bearer eyJpYXQiOiJTYXQg',
						'Content-Type': 'application/json',
					},
				}
			);
			expect(err).toBeTruthy();
			expect(err).toBeInstanceOf(Error);
			expect(err.message).toEqual('error');
		});
	});

	describe('authenticate', () => {
		it('should call authenticate with the correct url and request body', async () => {
			mockAxios.post.mockResolvedValue({ data: { token: 'BHGBMBJB78KJGH89' } });

			const response = await authenticate('/test', {
				userName: 'user',
				password: 'password',
			});

			expect(mockAxios.post).toHaveBeenCalledWith(
				'/test',
				{
					userName: 'user',
					password: 'password',
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			expect(response).toBeTruthy();
			expect(response.data).toEqual({ token: 'BHGBMBJB78KJGH89' });
		});

		it('should fail in authenticate call', async () => {
			mockAxios.post.mockRejectedValue(new Error('auth error'));

			const err = await authenticate('/test', {
				userName: 'user',
				password: 'password',
			});

			expect(mockAxios.post).toHaveBeenCalledWith(
				'/test',
				{
					userName: 'user',
					password: 'password',
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			expect(err).toBeTruthy();
			expect(err).toBeInstanceOf(Error);
			expect(err.message).toEqual('auth error');
		});
	});

	describe('put', () => {
		it('should call axios.put with the correct url, request body and headers', async () => {
			mockAxios.put.mockResolvedValue({ data: { message: 'Mock updated' } });

			const response = await put(
				'/test',
				{ mock: { id: 1 } },
				'application/json'
			);

			expect(mockAxios.put).toHaveBeenCalledWith(
				'/test',
				{ mock: { id: 1 } },
				{
					headers: {
						Authorization: 'Bearer eyJpYXQiOiJTYXQg',
						'Content-Type': 'application/json',
					},
				}
			);
			expect(response).toBeTruthy();
			expect(response.data).toEqual({ message: 'Mock updated' });
		});

		it('should fail in axios.put call', async () => {
			mockAxios.put.mockRejectedValue(new Error('error'));

			const err = await put('/test', { mock: { id: 1 } }, 'application/json');

			expect(mockAxios.put).toHaveBeenCalledWith(
				'/test',
				{ mock: { id: 1 } },
				{
					headers: {
						Authorization: 'Bearer eyJpYXQiOiJTYXQg',
						'Content-Type': 'application/json',
					},
				}
			);
			expect(err).toBeTruthy();
			expect(err).toBeInstanceOf(Error);
			expect(err.message).toEqual('error');
		});
	});

	describe('remove', () => {
		it('should call axios.delete with the correct url and headers', async () => {
			mockAxios.delete.mockResolvedValue({ data: { message: 'Mock deleted' } });

			const response = await remove('/test');

			expect(mockAxios.delete).toHaveBeenCalledWith('/test', {
				headers: {
					Authorization: 'Bearer eyJpYXQiOiJTYXQg',
				},
			});
			expect(response).toBeTruthy();
			expect(response.data).toEqual({ message: 'Mock deleted' });
		});

		it('should fail in axios.delete call', async () => {
			mockAxios.delete.mockRejectedValue(new Error('error'));

			const err = await remove('/test');

			expect(mockAxios.delete).toHaveBeenCalledWith('/test', {
				headers: {
					Authorization: 'Bearer eyJpYXQiOiJTYXQg',
				},
			});
			expect(err).toBeTruthy();
			expect(err).toBeInstanceOf(Error);
			expect(err.message).toEqual('error');
		});
	});

	describe('options', () => {
		it('should call axios.options with the correct url and headers', async () => {
			mockAxios.options.mockResolvedValue({
				data: { message: 'Mock options' },
			});

			const response = await options('/test');

			expect(mockAxios.options).toHaveBeenCalledWith('/test', {
				headers: {
					Authorization: 'Bearer eyJpYXQiOiJTYXQg',
				},
			});
			expect(response).toBeTruthy();
			expect(response.data).toEqual({ message: 'Mock options' });
		});

		it('should fail in axios.options call', async () => {
			mockAxios.options.mockRejectedValue(new Error('error'));

			const err = await options('/test');

			expect(mockAxios.options).toHaveBeenCalledWith('/test', {
				headers: {
					Authorization: 'Bearer eyJpYXQiOiJTYXQg',
				},
			});
			expect(err).toBeTruthy();
			expect(err).toBeInstanceOf(Error);
			expect(err.message).toEqual('error');
		});
	});
});
