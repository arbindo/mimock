import { setCookiesWithExpiry } from './cookies';

describe('Cookie utils', () => {
	it('should set cookies with expiry', async () => {
		const response = await setCookiesWithExpiry('__authToken', 'token', 3600);

		expect(response).toBeTruthy();
		expect(response).toBe('token');
	});
});
