import { get } from 'api/AxiosClient';
import { getResponseTypes } from './getResponseContentTypes.service';

jest.mock('api/AxiosClient');

describe('getResponseContentTypes.service', () => {
	it('should return response content types', async () => {
		const responseContentTypes = {
			TEXTUAL_RESPONSE: ['application/xml', 'text/plain'],
			BINARY_RESPONSE: ['audio/webm', 'application/pdf'],
		};

		get.mockImplementation(() =>
			Promise.resolve({
				data: [
					{
						id: 1,
						contentType: 'audio/webm',
						description: 'WEBM audio',
						responseType: {
							id: 2,
							name: 'BINARY_RESPONSE',
						},
					},
					{
						id: 2,
						contentType: 'application/xml',
						description: 'XML document',
						responseType: {
							id: 1,
							name: 'TEXTUAL_RESPONSE',
						},
					},
					{
						id: 3,
						contentType: 'application/pdf',
						description: 'PDF',
						responseType: {
							id: 2,
							name: 'BINARY_RESPONSE',
						},
					},
					{
						id: 4,
						contentType: 'text/plain',
						description: 'Text document',
						responseType: {
							id: 1,
							name: 'TEXTUAL_RESPONSE',
						},
					},
				],
			})
		);

		const result = await getResponseTypes();

		expect(result).toEqual(responseContentTypes);
	});

	it('should return error when get fails', async () => {
		get.mockImplementation(() => Promise.reject(new Error('Error')));

		getResponseTypes().catch((err) => {
			expect(err).toBeInstanceOf(Error);
			expect(err.message).toBe('Error');
		});
	});
});
