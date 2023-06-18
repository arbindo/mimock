import { post } from 'api/AxiosClient';
import { importMocks } from './importMock.service';

jest.mock('api/AxiosClient');

describe('import mocks service', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.resetAllMocks();
	});

	describe('importMocks', () => {
		it('should import mocks', async () => {
			post.mockResolvedValue('Imported Mocks Successfully');

			var requestData = new FormData();
			requestData.append('file', 'file');
			const response = await importMocks(requestData);
			expect(post).toHaveBeenCalledTimes(1);
			expect(post).toHaveBeenCalledWith(
				'/mocks/csv/import',
				requestData,
				'multipart/form-data; boundary=----WebKitFormBoundaryCRo3Ba2zzMcT9X03'
			);

			expect(response).toBeTruthy();
			expect(response).toEqual('Imported Mocks Successfully');
		});

		it('should return error when importing mock fails', async () => {
			post.mockRejectedValue(new Error('Failed to import mocks'));
			var requestData = new FormData();
			requestData.append('file', 'file');
			await importMocks(requestData).catch((error) => {
				expect(post).toHaveBeenCalledTimes(1);
				expect(post).toHaveBeenCalledWith(
					'/mocks/csv/import',
					requestData,
					'multipart/form-data; boundary=----WebKitFormBoundaryCRo3Ba2zzMcT9X03'
				);

				expect(error).toBeTruthy();
				expect(error).toBeInstanceOf(Error);
				expect(error.message).toEqual('Failed to import mocks');
			});
		});
	});
});
