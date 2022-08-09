import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	getMockById,
	archiveMock,
	unarchiveMock,
	deleteMockById,
} from 'services/mockManagement/mockManagement.service';
import { getUserDetails } from 'utils/jwtUtils';
import Detail from './Detail';

jest.mock('react-router-dom');
jest.mock('utils/jwtUtils');
jest.mock('services/mockManagement/mockManagement.service');

const actualNotification = jest.requireActual('hooks/useNotification');
jest.mock('react-notifications-component', () => {
	const Store = {
		addNotification: jest.fn(),
	};
	return { Store };
});

jest.useFakeTimers();

const data = {
	id: '4708bf6f-8122-4ca5-915f-1b098aa362b8',
	mockName: 'Test mock',
	description: 'Test mock',
	route: '/test1',
	httpMethod: {
		method: 'GET',
	},
	statusCode: 200,
	responseContentType: {
		contentType: 'application/json',
		description: 'JSON format',
		responseType: {
			name: 'TEXTUAL_RESPONSE',
		},
	},
	queryParams: 'q=ship',
	queryParamValues: {
		q: 'ship',
	},
	requestBodiesForMock: {
		id: 1,
		requestBody: {
			key: 'value',
		},
		createdAt: '2022-08-03T23:23:50.535995+05:30',
		updatedAt: '2022-08-03T23:23:50.535995+05:30',
		requestBodyType: {
			requestBodyType: 'application/json',
		},
	},
	createdAt: '2022-08-03T22:31:32.911138+05:30',
	updatedAt: '2022-08-07T21:19:41.046908+05:30',
	deletedAt: null,
	entityStatus: {
		status: 'NONE',
	},
	createdBy: 'Mimock Admin',
	modifiedBy: 'Mimock Admin',
	deleted: false,
	archived: false,
};

describe('Detail', () => {
	beforeEach(() => {
		useLocation.mockImplementation(() => ({
			pathname: '/detail/4708bf6f-8122-4ca5-915f-1b098aa362b8',
		}));

		getMockById.mockResolvedValue({
			data: {
				data,
			},
		});

		archiveMock.mockResolvedValue({
			data: {
				message: 'Mock archived successfully',
				data: {
					...data,
					entityStatus: {
						status: 'ARCHIVED',
					},
				},
			},
		});

		unarchiveMock.mockResolvedValue({
			data: {
				message: 'Mock unarchived successfully',
				data: {
					...data,
					entityStatus: {
						status: 'NONE',
					},
				},
			},
		});

		getUserDetails.mockImplementation(() => ({
			userRole: 'ROLE_ADMIN',
		}));
	});

	it('should render detail component for ADMIN', async () => {
		jest.spyOn(global, 'setTimeout');

		let tree;
		await act(async () => {
			tree = await render(<Detail />);
		});

		const { container, getByTestId, queryByTestId } = tree;

		expect(getByTestId('detail-container')).toBeInTheDocument();
		expect(getByTestId('detail-toolbar-container')).toBeInTheDocument();
		expect(queryByTestId('fetch-mock-details-error')).not.toBeInTheDocument();

		await act(async () => {
			await fireEvent.click(getByTestId('copy-url-button'));
		});

		await act(() => {
			jest.advanceTimersByTime(1500);
			expect(setTimeout).toHaveBeenCalledTimes(1);
			expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
		});
		expect(container).toMatchSnapshot();
	});

	it('should render detail component for VIEWER', async () => {
		getMockById.mockResolvedValue({
			data: {
				data: {
					...data,
					queryParams: '',
				},
			},
		});

		getUserDetails.mockImplementation(() => ({
			userRole: 'ROLE_VIEWER',
		}));

		let tree;
		await act(async () => {
			tree = await render(<Detail />);
		});

		const { container, getByTestId, queryByTestId } = tree;

		expect(getByTestId('detail-container')).toBeInTheDocument();
		expect(queryByTestId('operations-container')).not.toBeInTheDocument();
		expect(queryByTestId('fetch-mock-details-error')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should render ARCHIVED mock details', async () => {
		getMockById.mockResolvedValue({
			data: {
				data: {
					...data,
					entityStatus: {
						status: 'ARCHIVED',
					},
					archived: true,
				},
			},
		});

		let tree;
		await act(async () => {
			tree = await render(<Detail />);
		});

		const { container, getByTestId, queryByTestId } = tree;

		expect(getByTestId('detail-container')).toBeInTheDocument();
		expect(getByTestId('detail-toolbar-container')).toBeInTheDocument();
		expect(queryByTestId('fetch-mock-details-error')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should render DELETED mock details', async () => {
		getMockById.mockResolvedValue({
			data: {
				data: {
					...data,
					entityStatus: {
						status: 'DELETED',
					},
					deleted: true,
				},
			},
		});

		let tree;
		await act(async () => {
			tree = await render(<Detail />);
		});

		const { container, getByTestId, queryByTestId } = tree;

		expect(getByTestId('detail-container')).toBeInTheDocument();
		expect(getByTestId('warning-message-operations')).toBeInTheDocument();

		expect(queryByTestId('fetch-mock-details-error')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should display error banner when getMockById call fails', async () => {
		getMockById.mockRejectedValue(new Error('Error fetching mock details'));

		let tree;
		await act(async () => {
			tree = await render(<Detail />);
		});

		const { container, getByTestId, queryByTestId } = tree;

		expect(getByTestId('detail-container')).toBeInTheDocument();
		expect(getByTestId('fetch-mock-details-error')).toBeInTheDocument();

		expect(queryByTestId('detail-toolbar-container')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should display error when path is invalid', async () => {
		useLocation.mockImplementation(() => ({
			pathname: '/detail',
		}));

		getMockById.mockRejectedValue(new Error('Error fetching mock details'));

		let tree;
		await act(async () => {
			tree = await render(<Detail />);
		});

		const { container, getByTestId, queryByTestId } = tree;

		expect(getByTestId('detail-container')).toBeInTheDocument();
		expect(getByTestId('fetch-mock-details-error')).toBeInTheDocument();

		expect(queryByTestId('detail-toolbar-container')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should hide toolbar when getting user details fail', async () => {
		getUserDetails.mockImplementation(() => {
			throw new Error('Error fetching user details');
		});

		let tree;
		await act(async () => {
			tree = await render(<Detail />);
		});

		const { container, getByTestId, queryByTestId } = tree;

		expect(getByTestId('detail-container')).toBeInTheDocument();

		expect(queryByTestId('fetch-mock-details-error')).not.toBeInTheDocument();
		expect(queryByTestId('operations-container')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should archive mock', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');

		let tree;
		await act(async () => {
			tree = await render(<Detail />);
		});

		const { getByTestId } = tree;

		const archiveButton = getByTestId('archive-btn');
		await act(async () => {
			await fireEvent.click(archiveButton);
		});

		expect(archiveMock).toHaveBeenCalledTimes(1);
		expect(notificationSpy).toHaveBeenCalledTimes(1);
		expect(notificationSpy).toHaveBeenCalledWith({
			animationIn: 'animate__bounceIn',
			animationOut: 'animate__bounceOut',
			message: 'Test mock: Mock archived successfully',
			title: 'Archive success',
			type: 'success',
		});
	});

	it('should show error notification when archiving mock fails', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');
		archiveMock.mockRejectedValue(new Error('Failed to archive mock'));

		let tree;
		await act(async () => {
			tree = await render(<Detail />);
		});

		const { getByTestId } = tree;

		const archiveButton = getByTestId('archive-btn');
		await act(async () => {
			await fireEvent.click(archiveButton);
		});

		expect(archiveMock).toHaveBeenCalledTimes(1);
		expect(notificationSpy).toHaveBeenCalledTimes(1);
		expect(notificationSpy).toHaveBeenCalledWith({
			animationIn: 'animate__bounceIn',
			animationOut: 'animate__bounceOut',
			message: 'Failed to archive mock',
			title: 'Failed to archive mock',
			type: 'danger',
		});
	});

	it('should unarchive mock', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');
		getMockById.mockResolvedValue({
			data: {
				data: {
					...data,
					entityStatus: {
						status: 'ARCHIVED',
					},
				},
			},
		});

		let tree;
		await act(async () => {
			tree = await render(<Detail />);
		});

		const { getByTestId } = tree;

		const unArchiveButton = getByTestId('unarchive-btn');
		await act(async () => {
			await fireEvent.click(unArchiveButton);
		});

		expect(unarchiveMock).toHaveBeenCalledTimes(1);
		expect(notificationSpy).toHaveBeenCalledTimes(1);
		expect(notificationSpy).toHaveBeenCalledWith({
			animationIn: 'animate__bounceIn',
			animationOut: 'animate__bounceOut',
			message: 'Test mock: Mock unarchived successfully',
			title: 'Unarchive success',
			type: 'success',
		});
	});

	it('should show error notification when un-archiving mock fails', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');
		getMockById.mockResolvedValue({
			data: {
				data: {
					...data,
					entityStatus: {
						status: 'ARCHIVED',
					},
				},
			},
		});

		unarchiveMock.mockRejectedValue(new Error('Failed to unarchive mock'));

		let tree;
		await act(async () => {
			tree = await render(<Detail />);
		});

		const { getByTestId } = tree;

		const unArchiveButton = getByTestId('unarchive-btn');
		await act(async () => {
			await fireEvent.click(unArchiveButton);
		});

		expect(unarchiveMock).toHaveBeenCalledTimes(1);
		expect(unarchiveMock).toHaveBeenCalledWith(data.id);

		expect(notificationSpy).toHaveBeenCalledTimes(1);
		expect(notificationSpy).toHaveBeenCalledWith({
			animationIn: 'animate__bounceIn',
			animationOut: 'animate__bounceOut',
			message: 'Failed to unarchive mock',
			title: 'Failed to unarchive mock',
			type: 'danger',
		});
	});

	it('should delete mock', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');
		deleteMockById.mockResolvedValue({});

		let tree;
		await act(async () => {
			tree = await render(<Detail />);
		});

		const { getByTestId } = tree;

		const deleteButton = getByTestId('delete-btn');
		await act(async () => {
			await fireEvent.click(deleteButton);
		});

		const confirmDelete = getByTestId('confirmation-modal-confirm-btn');
		await act(async () => {
			await fireEvent.click(getByTestId('confirmation-modal-cancel-btn'));

			await fireEvent.click(deleteButton);
			await fireEvent.click(confirmDelete);
		});

		expect(deleteMockById).toHaveBeenCalledTimes(1);
		expect(deleteMockById).toHaveBeenCalledWith(data.id);

		expect(notificationSpy).toHaveBeenCalledTimes(1);
		expect(notificationSpy).toHaveBeenCalledWith({
			animationIn: 'animate__bounceIn',
			animationOut: 'animate__bounceOut',
			message: 'Deleted resource successfully!',
			title: 'Deletion success',
			type: 'success',
		});
	});

	it('should show error notification when deleting mock fails', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');
		deleteMockById.mockRejectedValue(new Error('Failed to delete mock'));

		let tree;
		await act(async () => {
			tree = await render(<Detail />);
		});

		const { getByTestId } = tree;

		const deleteButton = getByTestId('delete-btn');
		await act(async () => {
			await fireEvent.click(deleteButton);
		});

		const confirmDelete = getByTestId('confirmation-modal-confirm-btn');
		await act(async () => {
			await fireEvent.click(confirmDelete);
		});

		expect(deleteMockById).toHaveBeenCalledTimes(1);
		expect(deleteMockById).toHaveBeenCalledWith(data.id);

		expect(notificationSpy).toHaveBeenCalledTimes(1);
		expect(notificationSpy).toHaveBeenCalledWith({
			animationIn: 'animate__bounceIn',
			animationOut: 'animate__bounceOut',
			message: 'Failed to delete mock',
			title: 'Failed to delete mock',
			type: 'danger',
		});
	});

	it('should navigate to edit mock page', async () => {
		const mockNavigate = jest.fn();
		useNavigate.mockImplementation(() => mockNavigate);

		let tree;
		await act(async () => {
			tree = await render(<Detail />);
		});

		const { getByTestId } = tree;

		const editButton = getByTestId('edit-btn');
		await act(async () => {
			await fireEvent.click(editButton);
		});

		expect(mockNavigate).toHaveBeenCalledTimes(1);
		expect(mockNavigate).toHaveBeenCalledWith(
			'/mimock-ui/mocks/manage/edit-mock?mockId=' + data.id
		);
	});
});
