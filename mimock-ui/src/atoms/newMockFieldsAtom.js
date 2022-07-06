import { atom } from 'recoil';

const newMockFieldsAtom = atom({
	key: 'newMockFieldsAtom',
	default: {
		name: '',
		description: '',
		route: '',
		httpMethod: 'GET',
		responseContentType: 'application/json',
		responseType: 'TEXTUAL_RESPONSE',
		queryParams: '',
		shouldDoExactHeaderMatching: false,
		requestHeader: '',
		requestBody: '',
		requestBodyType: '',
		statusCode: 200,
		expectedTextResponse: '',
		responseHeaders: '',
		binaryFile: null,
	},
});

export default newMockFieldsAtom;
