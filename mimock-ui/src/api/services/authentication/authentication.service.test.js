import { authenticate } from 'api/AxiosClient';
import { getToken } from './authentication.service';

jest.mock('api/AxiosClient');

describe('Authentication service', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.resetAllMocks();
	});

	it('should get token', async () => {
		authenticate.mockResolvedValue(
			Promise.resolve({
				data: {
					token: 'token',
				},
			})
		);

		const response = await getToken('admin', 'admin');

		expect(authenticate).toHaveBeenCalledTimes(1);
		expect(authenticate).toHaveBeenCalledWith(
			'/user/authenticate',
			{ password: 'admin', userName: 'admin' },
			{ showFullPageLoader: true }
		);

		expect(response).toBeTruthy();
		expect(response.data.token).toBe('token');
	});

	it('should get error when invoking authenticate', async () => {
		authenticate.mockRejectedValueOnce(
			Promise.reject(new Error('Authentication failed!'))
		);

		getToken('admin', 'admin').catch((err) => {
			expect(authenticate).toHaveBeenCalledTimes(1);
			expect(authenticate).toHaveBeenCalledWith(
				'/user/authenticate',
				{ password: 'admin', userName: 'admin' },
				{ showFullPageLoader: true }
			);
			expect(err).toBeTruthy();
			expect(err).toBeInstanceOf(Error);
			expect(err).toHaveProperty('message', 'Authentication failed!');
		});
	});
});
