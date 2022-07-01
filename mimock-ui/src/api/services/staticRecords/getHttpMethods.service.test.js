import { getHttpMethods } from './getHttpMethods.service';
import { get } from 'api/AxiosClient';

jest.mock('api/AxiosClient');

describe('getHttpMethod.service', () => {
	it('should return list of HTTP methods', async () => {
		const httpMethods = ['GET', 'HEAD', 'POST', 'PUT'];
		get.mockResolvedValue({
			data: [
				{
					id: 1,
					method: 'GET',
				},
				{
					id: 2,
					method: 'HEAD',
				},
				{
					id: 3,
					method: 'POST',
				},
				{
					id: 4,
					method: 'PUT',
				},
			],
		});

		const result = await getHttpMethods();

		expect(get).toHaveBeenCalledWith('/static-records/http-methods');
		expect(result).toEqual(httpMethods);
	});

	it('should return error if API returns error', async () => {
		get.mockRejectedValue(new Error('API error'));

		getHttpMethods().catch((err) => {
			expect(err.message).toEqual('API error');
		});
	});
});
