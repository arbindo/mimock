import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import { useRecoilState } from 'recoil';
import { updateUserActivationStatus } from 'services/users';
import UserActivationStatus from './UserActivationStatus';

let mockedRecoilFn = jest.fn();
jest.mock('recoil');
jest.mock('services/users');

const actualNotification = jest.requireActual('hooks/useNotification');
jest.mock('react-notifications-component', () => {
	const Store = {
		addNotification: jest.fn(),
	};
	return { Store };
});

describe('UserActivationStatus', () => {
	beforeEach(() => {
		updateUserActivationStatus.mockResolvedValue({
			userName: 'test123',
			updatedActivationStatus: true,
		});
		useRecoilState.mockImplementation(() => {
			return [
				{
					userName: 'test123',
					name: 'Test User',
					isUserActive: false,
					userRole: 'ADMIN',
					userCreatedAt: '2022-04-30 20:35:35',
					passwordUpdatedAt: '2022-04-30 20:35:35',
				},
				mockedRecoilFn,
			];
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should render UserActivationStatus when user status is active', async () => {
		useRecoilState.mockImplementation(() => {
			return [
				{
					userName: 'test123',
					name: 'Test User',
					isUserActive: true,
					userRole: 'ADMIN',
					userCreatedAt: '2022-04-30 20:35:35',
					passwordUpdatedAt: '2022-04-30 20:35:35',
				},
				mockedRecoilFn,
			];
		});
		let tree;
		await act(async () => {
			tree = render(<UserActivationStatus />);
		});

		const { getByTestId, container, getByRole } = tree;

		expect(getByTestId('edit-user-activation-status')).toBeInTheDocument();
		expect(getByTestId('activation-switch')).toBeInTheDocument();
		expect(getByRole('checkbox').checked).toBe(true);
		expect(getByTestId('activation-status-label')).toHaveTextContent('Active');

		expect(container).toMatchSnapshot();
	});

	it('should render UserActivationStatus when user status is inactive', async () => {
		let tree;
		await act(async () => {
			tree = render(<UserActivationStatus />);
		});

		const { getByTestId, container, getByRole } = tree;

		expect(getByTestId('edit-user-activation-status')).toBeInTheDocument();
		expect(getByTestId('activation-switch')).toBeInTheDocument();
		expect(getByRole('checkbox').checked).toBe(false);
		expect(getByTestId('activation-status-label')).toHaveTextContent(
			'Inactive'
		);

		expect(container).toMatchSnapshot();
	});

	it('should activate user on clicking switch', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');

		let tree;
		await act(async () => {
			tree = render(<UserActivationStatus />);
		});

		const { getByTestId, container, getByRole } = tree;

		expect(getByTestId('edit-user-activation-status')).toBeInTheDocument();
		expect(getByRole('checkbox').checked).toBe(false);
		expect(getByTestId('activation-status-label')).toHaveTextContent(
			'Inactive'
		);

		await act(async () => {
			await fireEvent.click(getByRole('checkbox'));
		});
		expect(getByRole('checkbox').checked).toBe(true);
		expect(getByTestId('activation-status-label')).toHaveTextContent('Active');

		expect(updateUserActivationStatus).toHaveBeenCalledWith('test123', true);
		expect(mockedRecoilFn).toHaveBeenCalledWith({
			isUserActive: true,
			name: 'Test User',
			passwordUpdatedAt: '2022-04-30 20:35:35',
			userCreatedAt: '2022-04-30 20:35:35',
			userName: 'test123',
			userRole: 'ADMIN',
		});
		expect(notificationSpy).toHaveBeenCalledWith({
			animationIn: 'animate__slideInRight',
			animationOut: 'animate__slideOutRight',
			position: 'bottom-right',
			message: 'User - test123 has been activated',
			title: 'User activated',
			type: 'success',
		});

		expect(container).toMatchSnapshot();
	});

	it('should deactivate user on clicking switch', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');
		updateUserActivationStatus.mockResolvedValue({
			userName: 'test123',
			updatedActivationStatus: false,
		});
		useRecoilState.mockImplementation(() => {
			return [
				{
					userName: 'test123',
					name: 'Test User',
					isUserActive: true,
					userRole: 'ADMIN',
					userCreatedAt: '2022-04-30 20:35:35',
					passwordUpdatedAt: '2022-04-30 20:35:35',
				},
				mockedRecoilFn,
			];
		});

		let tree;
		await act(async () => {
			tree = render(<UserActivationStatus />);
		});

		const { getByTestId, container, getByRole } = tree;

		expect(getByTestId('edit-user-activation-status')).toBeInTheDocument();
		expect(getByRole('checkbox').checked).toBe(true);
		expect(getByTestId('activation-status-label')).toHaveTextContent('Active');

		await act(async () => {
			await fireEvent.click(getByRole('checkbox'));
		});
		expect(getByRole('checkbox').checked).toBe(false);
		expect(getByTestId('activation-status-label')).toHaveTextContent(
			'Inactive'
		);

		expect(updateUserActivationStatus).toHaveBeenCalledWith('test123', false);
		expect(mockedRecoilFn).toHaveBeenCalledWith({
			isUserActive: false,
			name: 'Test User',
			passwordUpdatedAt: '2022-04-30 20:35:35',
			userCreatedAt: '2022-04-30 20:35:35',
			userName: 'test123',
			userRole: 'ADMIN',
		});
		expect(notificationSpy).toHaveBeenCalledWith({
			animationIn: 'animate__slideInRight',
			animationOut: 'animate__slideOutRight',
			message: 'User - test123 has been deactivated',
			title: 'User deactivated',
			position: 'bottom-right',
			type: 'success',
		});

		expect(container).toMatchSnapshot();
	});

	it('should show error notification when user activation status update fails', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');
		updateUserActivationStatus.mockRejectedValue(new Error('update failed'));
		useRecoilState.mockImplementation(() => {
			return [
				{
					userName: 'test123',
					name: 'Test User',
					isUserActive: true,
					userRole: 'ADMIN',
					userCreatedAt: '2022-04-30 20:35:35',
					passwordUpdatedAt: '2022-04-30 20:35:35',
				},
				mockedRecoilFn,
			];
		});

		let tree;
		await act(async () => {
			tree = render(<UserActivationStatus />);
		});

		const { getByTestId, container, getByRole } = tree;

		expect(getByTestId('edit-user-activation-status')).toBeInTheDocument();
		expect(getByRole('checkbox').checked).toBe(true);
		expect(getByTestId('activation-status-label')).toHaveTextContent('Active');

		await act(async () => {
			await fireEvent.click(getByRole('checkbox'));
		});
		expect(getByRole('checkbox').checked).toBe(true);
		expect(getByTestId('activation-status-label')).toHaveTextContent('Active');

		expect(updateUserActivationStatus).toHaveBeenCalledWith('test123', false);
		expect(notificationSpy).toHaveBeenCalledWith({
			animationIn: 'animate__bounceIn',
			animationOut: 'animate__bounceOut',
			title: 'Failed to update activation status',
			message: 'Please try again',
			type: 'danger',
		});

		expect(container).toMatchSnapshot();
	});
});
