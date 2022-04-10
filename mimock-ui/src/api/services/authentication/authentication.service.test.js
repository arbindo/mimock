import { authenticate } from 'api/AxiosClient';
import { getToken } from './authentication.service';

let mockTokenValidator;
let mockCookieSetter;

jest.mock('api/AxiosClient');
jest.mock('utils/cookies', () => {
	mockCookieSetter = jest.fn();
	return { setCookiesWithExpiry: mockCookieSetter.mockResolvedValue('token') };
});
jest.mock('services/authentication/validateToken.service', () => {
	mockTokenValidator = jest.fn();

	return {
		isTokenValid: mockTokenValidator.mockResolvedValue(true),
	};
});

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
					expiresAfterSeconds: 3600,
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

		expect(mockCookieSetter).toHaveBeenCalledTimes(1);
		expect(mockCookieSetter).toHaveBeenCalledWith(
			'__authToken',
			'token',
			expect.any(Number)
		);

		expect(mockTokenValidator).toHaveBeenCalledTimes(1);

		expect(response).toBeTruthy();
		expect(response).toBe('token');
	});

	it('should return null when token validation fails', async () => {
		authenticate.mockResolvedValue(
			Promise.resolve({
				data: {
					token: 'token',
					expiresAfterSeconds: 3600,
				},
			})
		);
		mockTokenValidator.mockResolvedValue(false);

		const response = await getToken('admin', 'admin');

		expect(authenticate).toHaveBeenCalledTimes(1);
		expect(authenticate).toHaveBeenCalledWith(
			'/user/authenticate',
			{ password: 'admin', userName: 'admin' },
			{ showFullPageLoader: true }
		);

		expect(mockCookieSetter).toHaveBeenCalledTimes(1);
		expect(mockCookieSetter).toHaveBeenCalledWith(
			'__authToken',
			'token',
			expect.any(Number)
		);

		expect(mockTokenValidator).toHaveBeenCalledTimes(1);

		expect(response).toBeNull();
	});

	it('should throw error when setting auth cookie fails', async () => {
		authenticate.mockResolvedValue(
			Promise.resolve({
				data: {
					token: 'token',
				},
			})
		);
		mockCookieSetter.mockResolvedValue(null);

		const errorResponse = await getToken('admin', 'admin').catch((err) => err);

		expect(authenticate).toHaveBeenCalledTimes(1);
		expect(authenticate).toHaveBeenCalledWith(
			'/user/authenticate',
			{ password: 'admin', userName: 'admin' },
			{ showFullPageLoader: true }
		);

		expect(errorResponse).toBeInstanceOf(Error);
		expect(errorResponse.message).toBe('Error: Failed to set auth cookie');
	});

	it('should get error when invoking authenticate', async () => {
		authenticate.mockRejectedValueOnce(new Error('Authentication failed!'));

		getToken('admin', 'admin').catch((err) => {
			expect(authenticate).toHaveBeenCalledTimes(1);
			expect(authenticate).toHaveBeenCalledWith(
				'/user/authenticate',
				{ password: 'admin', userName: 'admin' },
				{ showFullPageLoader: true }
			);
			expect(err).toBeTruthy();
			expect(err).toBeInstanceOf(Error);
			expect(err).toHaveProperty('message', 'Error: Authentication failed!');
		});
	});
});
