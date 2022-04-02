import { get } from 'api/AxiosClient';
import { exportMocks, exportMocksCsvTemplate } from './exportMock.service';

jest.mock('api/AxiosClient');

describe('export mocks service', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.resetAllMocks();
	});

	describe('exportMocks', () => {
		it('should export mocks', async () => {
			get.mockResolvedValue(
				'id,name,description\n1,mock1,description1\n2,mock2,description2'
			);

			const response = await exportMocks('token');

			expect(get).toHaveBeenCalledTimes(1);
			expect(get).toHaveBeenCalledWith('/mocks/csv/export', 'token');

			expect(response).toBeTruthy();
			expect(response).toEqual(
				'id,name,description\n1,mock1,description1\n2,mock2,description2'
			);
		});

		it('should return error when exporting mock fails', async () => {
			get.mockRejectedValue(new Error('Failed to export mocks'));

			await exportMocks('token').catch((error) => {
				expect(get).toHaveBeenCalledTimes(1);
				expect(get).toHaveBeenCalledWith('/mocks/csv/export', 'token');

				expect(error).toBeTruthy();
				expect(error).toBeInstanceOf(Error);
				expect(error.message).toEqual('Failed to export mocks');
			});
		});
	});

	describe('exportMocksCsvTemplate', () => {
		it('should export mocks CSV template', async () => {
			get.mockResolvedValue('id,name,description');

			const response = await exportMocksCsvTemplate('token');

			expect(get).toHaveBeenCalledTimes(1);
			expect(get).toHaveBeenCalledWith('/mocks/csv/template/export', 'token');

			expect(response).toBeTruthy();
			expect(response).toEqual('id,name,description');
		});

		it('should return error when exporting CSV template fails', async () => {
			get.mockRejectedValue(new Error('Failed to fetch CSV template'));

			await exportMocksCsvTemplate('token').catch((error) => {
				expect(get).toHaveBeenCalledTimes(1);
				expect(get).toHaveBeenCalledWith('/mocks/csv/template/export', 'token');

				expect(error).toBeTruthy();
				expect(error).toBeInstanceOf(Error);
				expect(error.message).toEqual('Failed to fetch CSV template');
			});
		});
	});
});
