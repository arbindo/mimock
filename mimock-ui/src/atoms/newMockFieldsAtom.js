import { atom } from 'recoil';

const newMockFieldsAtom = atom({
	key: 'newMockFieldsAtom',
	default: {
		name: '',
		description: '',
		route: '',
		httpMethod: 'GET',
		responseContentType: 'application/json',
		queryParams: '',
		shouldDoExactHeaderMatching: false,
		requestHeader: '',
		requestBody: '',
		requestBodyType: '',
		statusCode: 200,
		expectedTextResponse: '',
		responseHeaders: '',
		binaryFile: '',
	},
});

export default newMockFieldsAtom;
