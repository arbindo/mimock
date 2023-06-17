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

			const response = await importMocks('token');

			expect(post).toHaveBeenCalledTimes(1);
			expect(post).toHaveBeenCalledWith('/mocks/csv/import', 'token');

			expect(response).toBeTruthy();
			expect(response).toEqual('Imported Mocks Successfully');
		});

		it('should return error when importing mock fails', async () => {
			post.mockRejectedValue(new Error('Failed to import mocks'));

			await importMocks('token').catch((error) => {
				expect(post).toHaveBeenCalledTimes(1);
				expect(post).toHaveBeenCalledWith('/mocks/csv/import', 'token');

				expect(error).toBeTruthy();
				expect(error).toBeInstanceOf(Error);
				expect(error.message).toEqual('Failed to import mocks');
			});
		});
	});
});
