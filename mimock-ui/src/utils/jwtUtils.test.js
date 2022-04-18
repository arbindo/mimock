import { getUserDetails } from './jwtUtils';

let mockGetCookie;
jest.mock('react-cookie', () => {
	mockGetCookie = jest
		.fn()
		.mockImplementation(
			() =>
				'eyJpYXQiOiJNb24gQXByIDExIDIzOjQ0OjI3IElTVCAyMDIyIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VyTmFtZSI6Im1pbW9ja19hZG1pbiIsInVzZXJSb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6Im1pbW9ja19hZG1pbiIsImV4cCI6MTY0OTcwMjY2N30.LPui9yRnbtittDutEi6F05zNi4mUe_2plNx2EROxo_k'
		);

	return {
		Cookies: jest.fn().mockImplementation(() => ({
			get: mockGetCookie,
		})),
	};
});

describe('jwtUtils', () => {
	it('should return user details', () => {
		const userDetails = getUserDetails();

		expect(userDetails).toStrictEqual({
			userName: 'mimock_admin',
			userRole: 'ROLE_ADMIN',
			sub: 'mimock_admin',
			exp: 1649702667,
		});
	});

	it('should throw error when cookie does not exist', () => {
		mockGetCookie.mockImplementation(
			() =>
				'eyJpYXQiOiJNb24gQXByIDExIDIzOjQ0OjI3IElTVCAyMDIyIiwiYWxnIjoiSFMyNTYifQ'
		);

		try {
			getUserDetails();
		} catch (err) {
			expect(err).toBeInstanceOf(Error);
			expect(err.message).toBe('Auth token is invalid');
		}
	});

	it('should throw error when auth token is invalid', () => {
		mockGetCookie.mockImplementation(() => null);

		try {
			getUserDetails();
		} catch (err) {
			expect(err).toBeInstanceOf(Error);
			expect(err.message).toBe('Auth token does not exist');
		}
	});
});
