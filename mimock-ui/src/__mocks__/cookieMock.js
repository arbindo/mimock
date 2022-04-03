const mockedCookieSet = jest.fn();
const mockedCookieRemove = jest.fn();
const mockedCookieGet = jest.fn();

jest.mock('react-cookie', () => ({
	Cookies: jest.fn().mockImplementation(() => ({
		get: mockedCookieGet,
		set: mockedCookieSet,
		remove: mockedCookieRemove,
	})),
}));

const mockGetImplementationForCSRFCookie = () => {
	mockedCookieGet.mockImplementation((key) => {
		if (key === 'XSRF-TOKEN') {
			return 'XSRF_COOKIE';
		}
	});
};

export {
	mockedCookieGet,
	mockedCookieSet,
	mockedCookieRemove,
	mockGetImplementationForCSRFCookie,
};
