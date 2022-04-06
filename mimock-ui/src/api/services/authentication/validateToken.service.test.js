import { isTokenValid } from './validateToken.service';
import { get } from 'api/AxiosClient';

jest.mock('api/AxiosClient');

describe('validateTokenService', () => {
	it('should return true when token validation succeeds', async () => {
		get.mockResolvedValue(true);

		const validationStatus = await isTokenValid();

		expect(validationStatus).toBe(true);
	});

	it('should return false when token validation fails', async () => {
		get.mockRejectedValue(false);

		const validationStatus = await isTokenValid();

		expect(validationStatus).toBe(false);
	});
});
