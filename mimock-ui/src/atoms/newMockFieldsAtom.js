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
		requestBodyType: 'application/json',
		statusCode: 200,
		expectedTextResponse: '',
		responseHeaders: '',
		binaryFile: new File([], ''),
	},
});

export default newMockFieldsAtom;
