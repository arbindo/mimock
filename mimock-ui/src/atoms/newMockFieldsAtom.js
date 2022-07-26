import { atom } from 'recoil';
import { mockManagementConstants } from 'constants/mockManagementConstants';

const newMockFieldsAtom = atom({
	key: 'newMockFieldsAtom',
	default: {
		mode: mockManagementConstants.mode.CREATE,
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
		statusCode: null,
		expectedTextResponse: '',
		responseHeaders: '',
		binaryFile: null,
	},
});

export default newMockFieldsAtom;
