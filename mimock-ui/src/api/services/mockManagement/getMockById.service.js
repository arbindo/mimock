import { getMockById } from './mockManagement.service';
import { Base64 } from 'js-base64';

export const getMock = async (id) => {
	return await getMockById(id).then((res) => {
		const { data: mockData } = res.data;

		const parsedData = {
			id,
			name: mockData.mockName,
			description: mockData.description,
			route: mockData.route,
			httpMethod: mockData.httpMethod?.method,
			responseContentType: mockData.responseContentType?.contentType || '',
			responseType: mockData.responseContentType?.responseType?.name || '',
			queryParams: mockData.queryParams || '',
			shouldDoExactHeaderMatching: mockData.requestHeaders?.matchExact
				? true
				: false,
			requestHeader:
				JSON.stringify(mockData.requestHeaders?.requestHeader) || '',
			requestBody:
				JSON.stringify(mockData.requestBodiesForMock?.requestBody) || '',
			requestBodyType:
				mockData.requestBodiesForMock?.requestBodyType?.requestBodyType ||
				'application/json',
			statusCode: mockData.statusCode,
			expectedTextResponse:
				mockData.textualResponse?.responseBody?.toString() || '',
			responseHeaders:
				JSON.stringify(mockData.responseHeaders?.responseHeader) || '',
			binaryFile: mockData.binaryResponse?.responseFile
				? new File(
						[Base64.decode(mockData.binaryResponse?.responseFile)],
						'____'
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  )
				: null,
		};

		return parsedData;
	});
};
