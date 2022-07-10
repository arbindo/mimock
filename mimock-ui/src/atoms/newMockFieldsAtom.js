import { atom } from 'recoil';

const newMockFieldsAtom = atom({
	key: 'newMockFieldsAtom',
	default: {
		id: '',
		name: '',
		description: '',
		route: '',
		httpMethod: '',
		responseContentType: 'application/json',
		responseType: '',
		queryParams: '',
		shouldDoExactHeaderMatching: false,
		requestHeader: '',
		requestBody: '',
		requestBodyType: 'application/json',
		statusCode: 200,
		expectedTextResponse: '',
		responseHeaders: '',
		binaryFile: null,
	},
});

export default newMockFieldsAtom;
