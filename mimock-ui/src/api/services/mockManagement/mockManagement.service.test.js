import { get, post, put, remove } from 'api/AxiosClient';
import {
	createMock,
	deleteMockById,
	forceDeleteMockById,
	getAllMocks,
	getMockById,
	listActiveMocks,
	listArchivedMocks,
	listMocks,
	updateMock,
	listDeletedMocks,
	archiveMock,
	unarchiveMock,
} from './mockManagement.service';

jest.mock('api/AxiosClient');

describe('Mock management service', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.resetAllMocks();
	});

	describe('getAllMocks', () => {
		it('should get all mocks', async () => {
			const mocks = [
				{ id: 1, name: 'mock-1' },
				{ id: 2, name: 'mock-2' },
			];
			get.mockResolvedValue({
				data: mocks,
			});

			const response = await getAllMocks('token');

			expect(get).toHaveBeenCalledTimes(1);
			expect(get).toHaveBeenCalledWith('/mocks', 'token');
			expect(response).toBeTruthy();
			expect(response.data).toHaveLength(2);
			expect(response.data).toStrictEqual(mocks);
		});

		it('should return error when get all mocks call fails', async () => {
			get.mockRejectedValue(new Error('Failed to get all mocks'));

			await getAllMocks('token').catch((err) => {
				expect(get).toHaveBeenCalledTimes(1);
				expect(get).toHaveBeenCalledWith('/mocks', 'token');

				expect(err).toBeTruthy();
				expect(err).toBeInstanceOf(Error);
				expect(err.message).toBe('Failed to get all mocks');
			});
		});
	});

	describe('getMockById', () => {
		it('should get single mock by ID', async () => {
			const expectedMock = { id: 1, name: 'mock-1' };
			get.mockResolvedValue({
				data: expectedMock,
			});

			const response = await getMockById(1, 'token');

			expect(get).toHaveBeenCalledTimes(1);
			expect(get).toHaveBeenCalledWith('/mocks/1', {
				showFullPageLoader: true,
			});

			expect(response).toBeTruthy();
			expect(response.data).toBe(expectedMock);
		});

		it('should return error when get mock by ID call fails', async () => {
			get.mockRejectedValue(new Error('Failed to get mock with ID 1'));

			await getMockById(1, 'token').catch((err) => {
				expect(get).toHaveBeenCalledTimes(1);
				expect(get).toHaveBeenCalledWith('/mocks/1', {
					showFullPageLoader: true,
				});

				expect(err).toBeTruthy();
				expect(err).toBeInstanceOf(Error);
				expect(err.message).toBe('Failed to get mock with ID 1');
			});
		});
	});

	describe('createMock', () => {
		it('should create new mock', async () => {
			post.mockResolvedValue({
				data: { message: "Mock 'mock-1' created" },
			});

			const requestData = new FormData();
			requestData.append('name', 'mock-1');
			requestData.append('description', 'mock-1 description');
			requestData.append('content', 'mock-1 content');

			const response = await createMock(requestData, 'token');

			expect(post).toHaveBeenCalledTimes(1);
			expect(post).toHaveBeenCalledWith(
				'/mocks',
				requestData,
				'multipart/form-data; boundary=----WebKitFormBoundaryCRo3Ba2zzMcT9X03',
				{ showFullPageLoader: true }
			);

			expect(response).toBeTruthy();
			expect(response.data.message).toBe("Mock 'mock-1' created");
		});

		it('should return error when creating new mock', async () => {
			post.mockRejectedValue(new Error('Failed to create mock'));

			await createMock(new FormData(), 'token').catch((err) => {
				expect(post).toHaveBeenCalledTimes(1);
				expect(post).toHaveBeenCalledWith(
					'/mocks',
					new FormData(),
					'multipart/form-data; boundary=----WebKitFormBoundaryCRo3Ba2zzMcT9X03',
					{ showFullPageLoader: true }
				);

				expect(err).toBeTruthy();
				expect(err).toBeInstanceOf(Error);
				expect(err.message).toBe('Failed to create mock');
			});
		});
	});

	describe('updateMock', () => {
		it('should update existing mock', async () => {
			put.mockResolvedValue({
				data: { message: "Mock 'mock-1' updated" },
			});

			const requestData = new FormData();
			requestData.append('name', 'mock-1');
			requestData.append('description', 'mock-1 description');
			requestData.append('content', 'mock-1 content');

			const response = await updateMock(1, requestData, 'token');

			expect(put).toHaveBeenCalledTimes(1);
			expect(put).toHaveBeenCalledWith(
				'/mocks/1',
				requestData,
				'multipart/form-data; boundary=----WebKitFormBoundaryCRo3Ba2zzMcT9X03',
				{ showFullPageLoader: true }
			);

			expect(response).toBeTruthy();
			expect(response.data.message).toBe("Mock 'mock-1' updated");
		});

		it('should return error when updating existing mock', async () => {
			put.mockRejectedValue(new Error('Failed to update mock 1'));

			await updateMock(1, new FormData(), 'token').catch((err) => {
				expect(put).toHaveBeenCalledTimes(1);
				expect(put).toHaveBeenCalledWith(
					'/mocks/1',
					new FormData(),
					'multipart/form-data; boundary=----WebKitFormBoundaryCRo3Ba2zzMcT9X03',
					{ showFullPageLoader: true }
				);

				expect(err).toBeTruthy();
				expect(err).toBeInstanceOf(Error);
				expect(err.message).toBe('Failed to update mock 1');
			});
		});
	});

	describe('deleteMockById', () => {
		it('should delete existing mock by ID', async () => {
			remove.mockResolvedValue({
				data: { message: "Mock 'mock-1' deleted" },
			});

			const response = await deleteMockById(1);

			expect(remove).toHaveBeenCalledTimes(1);
			expect(remove).toHaveBeenCalledWith('/mocks/1');

			expect(response).toBeTruthy();
			expect(response.data.message).toBe("Mock 'mock-1' deleted");
		});

		it('should return error when deleting existing mock', async () => {
			remove.mockRejectedValue(new Error('Failed to delete mock 1'));

			await deleteMockById(1).catch((err) => {
				expect(remove).toHaveBeenCalledTimes(1);
				expect(remove).toHaveBeenCalledWith('/mocks/1');

				expect(err).toBeTruthy();
				expect(err).toBeInstanceOf(Error);
				expect(err.message).toBe('Failed to delete mock 1');
			});
		});
	});

	describe('forceDeleteMockById', () => {
		it('should delete existing mock by ID forcefully', async () => {
			remove.mockResolvedValue({
				message: "Mock 'mock-1' deleted",
			});

			const response = await forceDeleteMockById(1);

			expect(remove).toHaveBeenCalledTimes(1);
			expect(remove).toHaveBeenCalledWith('/mocks/1:forceDelete');

			expect(response).toBeTruthy();
			expect(response.message).toBe("Mock 'mock-1' deleted");
		});

		it('should return error when deleting existing mock forcefully', async () => {
			remove.mockRejectedValue(new Error('Failed to delete mock 1'));

			await forceDeleteMockById(1).catch(async (err) => {
				expect(remove).toHaveBeenCalledTimes(1);
				expect(remove).toHaveBeenCalledWith('/mocks/1:forceDelete');

				expect(err).toBeTruthy();
				expect(err).toBeInstanceOf(Error);
				expect(err.message).toBe('Failed to delete mock 1');
			});
		});
	});

	describe('listMocks', () => {
		it('should list mocks without filters', async () => {
			const mockList = [
				{
					id: 1,
					name: 'mock-1',
					description: 'mock-1 description',
				},
				{
					id: 2,
					name: 'mock-2',
					description: 'mock-2 description',
				},
			];
			get.mockResolvedValue({
				data: {
					mocks: mockList,
				},
			});

			const response = await listMocks('token', 0);

			expect(get).toHaveBeenCalledTimes(1);
			expect(get).toHaveBeenCalledWith('/mocks/filter?size=5&page=0', 'token');

			expect(response).toBeTruthy();
			expect(response.data.mocks).toHaveLength(2);
			expect(response.data.mocks).toBe(mockList);
		});

		it('should return error when listing mocks fails', async () => {
			get.mockRejectedValue(new Error('Failed to list mocks'));

			await listMocks('token', 0).catch((err) => {
				expect(get).toHaveBeenCalledTimes(1);
				expect(get).toHaveBeenCalledWith(
					'/mocks/filter?size=5&page=0',
					'token'
				);

				expect(err).toBeTruthy();
				expect(err).toBeInstanceOf(Error);
				expect(err.message).toBe('Failed to list mocks');
			});
		});
	});

	describe('listActiveMocks', () => {
		it('should list active mocks', async () => {
			const activeMocks = [
				{
					id: 4,
					name: 'mock-1',
					description: 'mock-1 description',
				},
			];
			get.mockResolvedValue({
				data: {
					mocks: activeMocks,
				},
			});

			const response = await listActiveMocks('token', 0);

			expect(get).toHaveBeenCalledTimes(1);
			expect(get).toHaveBeenCalledWith(
				'/mocks/filter?status=NONE&size=5&page=0',
				'token'
			);

			expect(response).toBeTruthy();
			expect(response.data.mocks).toHaveLength(1);
			expect(response.data.mocks).toBe(activeMocks);
		});

		it('should return error when listing active mocks fails', async () => {
			get.mockRejectedValue(new Error('Failed to list active mocks'));

			await listActiveMocks('token', 0).catch((err) => {
				expect(get).toHaveBeenCalledTimes(1);
				expect(get).toHaveBeenCalledWith(
					'/mocks/filter?status=NONE&size=5&page=0',
					'token'
				);

				expect(err).toBeTruthy();
				expect(err).toBeInstanceOf(Error);
				expect(err.message).toBe('Failed to list active mocks');
			});
		});
	});

	describe('listArchivedMocks', () => {
		it('should list archived mocks', async () => {
			const archivedMocks = [
				{
					id: 4,
					name: 'mock-1',
					description: 'mock-1 description',
				},
			];
			get.mockResolvedValue({
				data: {
					mocks: archivedMocks,
				},
			});

			const response = await listArchivedMocks('token', 0);

			expect(get).toHaveBeenCalledTimes(1);
			expect(get).toHaveBeenCalledWith(
				'/mocks/filter?status=ARCHIVED&size=5&page=0',
				'token'
			);

			expect(response).toBeTruthy();
			expect(response.data.mocks).toHaveLength(1);
			expect(response.data.mocks).toBe(archivedMocks);
		});

		it('should return error when listing archived mocks fails', async () => {
			get.mockRejectedValue(new Error('Failed to list archived mocks'));

			await listArchivedMocks('token', 0).catch((err) => {
				expect(get).toHaveBeenCalledTimes(1);
				expect(get).toHaveBeenCalledWith(
					'/mocks/filter?status=ARCHIVED&size=5&page=0',
					'token'
				);

				expect(err).toBeTruthy();
				expect(err).toBeInstanceOf(Error);
				expect(err.message).toBe('Failed to list archived mocks');
			});
		});
	});

	describe('listDeletedMocks', () => {
		it('should list deleted mocks', async () => {
			const deletedMocks = [
				{
					id: 5,
					name: 'mock-1',
					description: 'mock-1 description',
				},
			];
			get.mockResolvedValue({
				data: {
					mocks: deletedMocks,
				},
			});

			const response = await listDeletedMocks('token', 0);

			expect(get).toHaveBeenCalledTimes(1);
			expect(get).toHaveBeenCalledWith(
				'/mocks/filter?status=DELETED&size=5&page=0',
				'token'
			);

			expect(response).toBeTruthy();
			expect(response.data.mocks).toHaveLength(1);
			expect(response.data.mocks).toBe(deletedMocks);
		});

		it('should return error when listing deleted mocks fails', async () => {
			get.mockRejectedValue(new Error('Failed to list archived mocks'));

			await listArchivedMocks('token', 0).catch((err) => {
				expect(get).toHaveBeenCalledTimes(1);
				expect(get).toHaveBeenCalledWith(
					'/mocks/filter?status=ARCHIVED&size=5&page=0',
					'token'
				);

				expect(err).toBeTruthy();
				expect(err).toBeInstanceOf(Error);
				expect(err.message).toBe('Failed to list archived mocks');
			});
		});
	});

	describe('archiveMock', () => {
		it('should archive an existing mock', async () => {
			post.mockResolvedValue({
				data: {
					message: 'Mock-1 archived successfully',
				},
			});

			const response = await archiveMock(1);

			expect(post).toHaveBeenCalledTimes(1);
			expect(post).toHaveBeenCalledWith('/mocks/1:archive', null);

			expect(response).toBeTruthy();
			expect(response.data.message).toBe('Mock-1 archived successfully');
		});

		it('should return error archiving mock fails', async () => {
			post.mockRejectedValue(new Error('Failed to archive mock 1'));

			await archiveMock(1).catch((err) => {
				expect(post).toHaveBeenCalledTimes(1);
				expect(post).toHaveBeenCalledWith('/mocks/1:archive', null);

				expect(err).toBeTruthy();
				expect(err).toBeInstanceOf(Error);
				expect(err.message).toBe('Failed to archive mock 1');
			});
		});
	});

	describe('unarchiveMock', () => {
		it('should unarchive an archived mock', async () => {
			post.mockResolvedValue({
				data: {
					message: 'Mock-1 removed from archive successfully',
				},
			});

			const response = await unarchiveMock(1);

			expect(post).toHaveBeenCalledTimes(1);
			expect(post).toHaveBeenCalledWith('/mocks/1:unarchive', null);

			expect(response).toBeTruthy();
			expect(response.data.message).toBe(
				'Mock-1 removed from archive successfully'
			);
		});

		it('should return error archiving mock fails', async () => {
			post.mockRejectedValue(new Error('Failed to unarchive mock 1'));

			await unarchiveMock(1).catch((err) => {
				expect(post).toHaveBeenCalledTimes(1);
				expect(post).toHaveBeenCalledWith('/mocks/1:unarchive', null);

				expect(err).toBeTruthy();
				expect(err).toBeInstanceOf(Error);
				expect(err.message).toBe('Failed to unarchive mock 1');
			});
		});
	});
});
