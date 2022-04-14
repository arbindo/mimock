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

const mockGetImplementation = () => {
	mockedCookieGet.mockImplementation((key) => {
		return key;
	});
};

export {
	mockedCookieGet,
	mockedCookieSet,
	mockedCookieRemove,
	mockGetImplementation,
};
