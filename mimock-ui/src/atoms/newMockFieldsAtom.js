import { atom } from 'recoil';

const newMockFieldsAtom = atom({
	key: 'newMockFieldsAtom',
	default: {
		name: '',
		description: '',
		httpStatus: 200,
		route: '',
		httpMethod: 'GET',
		queryParams: '',
		requestHeaders: '',
		shouldMatchExactRequestHeaders: false,
		requestBody: '',
		responseHeaders: '',
		responseBody: '',
	},
});

export default newMockFieldsAtom;
