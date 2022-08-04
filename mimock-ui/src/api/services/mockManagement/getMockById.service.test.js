import { getMockById } from './mockManagement.service';
import { getMock } from './getMockById.service';

jest.mock('./mockManagement.service');

describe('getMockById.service', () => {
	it('should return mock data', async () => {
		getMockById.mockResolvedValue({
			data: {
				data: {
					id: '5fde802c-56b6-4473-a68f-5cb9eccca268',
					mockName: 'Github Mock',
					description: 'Mock for github users',
					route: '/api/github/users/defunkt',
					httpMethod: {
						method: 'GET',
					},
					statusCode: 200,
					responseContentType: {
						id: 26,
						contentType: 'application/json',
						description: 'JSON format',
						responseType: {
							name: 'TEXTUAL_RESPONSE',
						},
					},
					queryParams: '',
					requestBodiesForMock: {
						id: 8,
						requestBody: {
							id: '2',
							url: 'https://api.github.com/users/defunkt',
							login: 'defunkt',
							node_id: 'MDQ6VXNlcjI=',
							html_url: 'https://github.com/defunkt',
							avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
							gravatar_id: '',
						},
						requestBodyType: {
							requestBodyType: 'application/json',
						},
					},
					textualResponse: {
						responseBody:
							'{\r\n  "data": {\r\n    "viewer": {\r\n      "login": "tester"\r\n    }\r\n  }\r\n}',
					},
				},
			},
		});

		const mockData = await getMock('5fde802c-56b6-4473-a68f-5cb9eccca268');

		expect(mockData).toEqual({
			id: '5fde802c-56b6-4473-a68f-5cb9eccca268',
			name: 'Github Mock',
			description: 'Mock for github users',
			route: '/api/github/users/defunkt',
			httpMethod: 'GET',
			responseContentType: 'application/json',
			responseType: 'TEXTUAL_RESPONSE',
			queryParams: '',
			shouldDoExactHeaderMatching: false,
			requestHeader: '',
			requestBody: JSON.stringify({
				id: '2',
				url: 'https://api.github.com/users/defunkt',
				login: 'defunkt',
				node_id: 'MDQ6VXNlcjI=',
				html_url: 'https://github.com/defunkt',
				avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
				gravatar_id: '',
			}),
			requestBodyType: 'application/json',
			statusCode: 200,
			expectedTextResponse:
				'{\r\n  "data": {\r\n    "viewer": {\r\n      "login": "tester"\r\n    }\r\n  }\r\n}',
			responseHeaders: '',
			binaryFile: null,
		});
	});

	it('should reject with error when getMockById call fails', async () => {
		getMockById.mockRejectedValue(new Error('Failed to get mock'));

		await getMock('5fde802c-56b6-4473-a68f-5cb9eccca268').catch((e) => {
			expect(e).toBeInstanceOf(Error);
			expect(e.message).toEqual('Failed to get mock');
		});
	});
});
