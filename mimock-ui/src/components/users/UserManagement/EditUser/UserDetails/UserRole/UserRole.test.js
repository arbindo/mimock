import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import { useRecoilState } from 'recoil';
import { getUserRoles, updateUserRole } from 'services/users';
import UserRole from './UserRole';

const actualNotification = jest.requireActual('hooks/useNotification');

let mockedRecoilFn = jest.fn();
jest.mock('recoil');
jest.mock('services/users');
jest.mock('react-notifications-component', () => {
	const Store = {
		addNotification: jest.fn(),
	};
	return { Store };
});

describe('UserRole', () => {
	beforeEach(() => {
		useRecoilState.mockImplementation(() => {
			return [
				{
					userName: 'test1',
					name: 'Test User',
					isUserActive: false,
					userRole: 'MANAGER',
					userCreatedAt: '2022-04-30 20:35:35',
					passwordUpdatedAt: '2022-04-30 20:35:35',
				},
				mockedRecoilFn,
			];
		});
		getUserRoles.mockResolvedValue([
			{
				roleName: 'ADMIN',
				roleDescription:
					'Administrator can create and manage mocks, and also has user management privileges',
			},
			{
				roleName: 'MANAGER',
				roleDescription:
					'Manager can create and manage mocks, but cannot manage users',
			},
			{
				roleName: 'VIEWER',
				roleDescription: 'Viewer can only view mocks',
			},
		]);
	});

	it('should render user role', async () => {
		let tree;
		await act(async () => {
			tree = await render(<UserRole />);
		});

		const { getByTestId, queryByTestId, container, rerender } = tree;

		await rerender(<UserRole />);

		expect(queryByTestId('confirmation-modal')).not.toBeInTheDocument();
		expect(queryByTestId('update-role-btn')).not.toBeInTheDocument();

		expect(getByTestId('user-role-options')).toBeInTheDocument();
		expect(getByTestId('user-role-options')).toHaveTextContent('MANAGER');
		expect(getByTestId('edit-user-role')).toBeInTheDocument();
		expect(getByTestId('user-role-tooltip')).toBeInTheDocument();

		expect(getUserRoles).toHaveBeenCalledTimes(1);

		expect(container).toMatchSnapshot();
	});

	it('should show error banner when get user role call fails', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');
		getUserRoles.mockRejectedValue(new Error('Error'));

		let tree;
		await act(async () => {
			tree = await render(<UserRole />);
		});

		const { queryByTestId, rerender } = tree;

		await rerender(<UserRole currentUserRole='MANAGER' />);

		expect(queryByTestId('confirmation-modal')).not.toBeInTheDocument();
		expect(queryByTestId('update-role-btn')).not.toBeInTheDocument();
		expect(queryByTestId('edit-user-role')).not.toBeInTheDocument();

		expect(getUserRoles).toHaveBeenCalledTimes(1);
		expect(notificationSpy).toHaveBeenCalledTimes(1);
		expect(notificationSpy).toHaveBeenCalledWith({
			animationIn: 'animate__slideInRight',
			animationOut: 'animate__slideOutRight',
			message: 'Excluding role modification from edit user form',
			title: 'Failed to fetch role for user',
			type: 'danger',
		});
	});

	it('should show update role button on changing user role', async () => {
		let tree;
		await act(async () => {
			tree = await render(<UserRole />);
		});

		const { getByTestId, queryByTestId, container } = tree;

		expect(queryByTestId('confirmation-modal')).not.toBeInTheDocument();
		expect(getByTestId('edit-user-role')).toBeInTheDocument();
		expect(getUserRoles).toHaveBeenCalledTimes(1);

		await act(async () => {
			fireEvent.change(getByTestId('user-role-options'), {
				target: { value: 'ADMIN' },
			});
		});

		expect(getByTestId('update-role-btn')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should show update role confirmation modal on clicking update role button', async () => {
		let tree;
		await act(async () => {
			tree = await render(<UserRole />);
		});

		const { getByTestId, queryByTestId } = tree;

		expect(queryByTestId('confirmation-modal')).not.toBeInTheDocument();
		expect(getByTestId('edit-user-role')).toBeInTheDocument();
		expect(getUserRoles).toHaveBeenCalledTimes(1);

		await act(async () => {
			fireEvent.change(getByTestId('user-role-options'), {
				target: { value: 'ADMIN' },
			});
		});

		await act(async () => {
			fireEvent.click(getByTestId('update-role-btn'));
		});

		expect(getByTestId('confirmation-modal')).toBeInTheDocument();

		expect(document.body).toMatchSnapshot();
	});

	it('should close update role confirmation modal on clicking cancel', async () => {
		let tree;
		await act(async () => {
			tree = await render(<UserRole />);
		});

		const { getByTestId, queryByTestId } = tree;

		expect(queryByTestId('confirmation-modal')).not.toBeInTheDocument();
		expect(getByTestId('edit-user-role')).toBeInTheDocument();
		expect(getUserRoles).toHaveBeenCalledTimes(1);

		await act(async () => {
			fireEvent.change(getByTestId('user-role-options'), {
				target: { value: 'ADMIN' },
			});
			fireEvent.click(getByTestId('update-role-btn'));
		});
		expect(getByTestId('confirmation-modal')).toBeInTheDocument();

		await act(async () => {
			fireEvent.click(getByTestId('confirmation-modal-cancel-btn'));
		});
		expect(queryByTestId('confirmation-modal')).not.toBeInTheDocument();

		expect(document.body).toMatchSnapshot();
	});

	it('should update role on clicking confirm button', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');
		updateUserRole.mockResolvedValue({
			userName: 'frodo1',
			updatedUserRole: 'MANAGER',
		});

		let tree;
		await act(async () => {
			tree = await render(<UserRole />);
		});

		const { getByTestId, queryByTestId } = tree;

		expect(queryByTestId('confirmation-modal')).not.toBeInTheDocument();
		expect(getByTestId('edit-user-role')).toBeInTheDocument();
		expect(getUserRoles).toHaveBeenCalledTimes(1);

		await act(async () => {
			fireEvent.change(getByTestId('user-role-options'), {
				target: { value: 'ADMIN' },
			});
			fireEvent.click(getByTestId('update-role-btn'));
		});
		expect(getByTestId('confirmation-modal')).toBeInTheDocument();

		await act(async () => {
			fireEvent.click(getByTestId('confirmation-modal-confirm-btn'));
		});
		expect(updateUserRole).toHaveBeenCalledTimes(1);
		expect(updateUserRole).toHaveBeenCalledWith('test1', 'ADMIN');
		expect(queryByTestId('confirmation-modal')).not.toBeInTheDocument();
		expect(mockedRecoilFn).toHaveBeenCalledWith({
			isUserActive: false,
			name: 'Test User',
			passwordUpdatedAt: '2022-04-30 20:35:35',
			userCreatedAt: '2022-04-30 20:35:35',
			userName: 'test1',
			userRole: 'ADMIN',
		});

		expect(notificationSpy).toHaveBeenCalledTimes(1);
		expect(notificationSpy).toHaveBeenCalledWith({
			animationIn: 'animate__slideInRight',
			animationOut: 'animate__slideOutRight',
			message: 'User role updated to ADMIN',
			title: 'User role updated successfully',
			type: 'success',
		});

		expect(document.body).toMatchSnapshot();
	});

	it('should show error notification when role update fails', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');
		updateUserRole.mockRejectedValue(new Error('Role update failed'));

		let tree;
		await act(async () => {
			tree = await render(<UserRole />);
		});

		const { getByTestId, queryByTestId } = tree;

		expect(queryByTestId('confirmation-modal')).not.toBeInTheDocument();
		expect(getByTestId('edit-user-role')).toBeInTheDocument();
		expect(getUserRoles).toHaveBeenCalledTimes(1);

		await act(async () => {
			fireEvent.change(getByTestId('user-role-options'), {
				target: { value: 'ADMIN' },
			});
			fireEvent.click(getByTestId('update-role-btn'));
		});
		expect(getByTestId('confirmation-modal')).toBeInTheDocument();

		await act(async () => {
			fireEvent.click(getByTestId('confirmation-modal-confirm-btn'));
		});
		expect(updateUserRole).toHaveBeenCalledTimes(1);
		expect(updateUserRole).toHaveBeenCalledWith('test1', 'ADMIN');
		expect(queryByTestId('confirmation-modal')).not.toBeInTheDocument();
		expect(notificationSpy).toHaveBeenCalledTimes(1);
		expect(notificationSpy).toHaveBeenCalledWith({
			animationIn: 'animate__slideInRight',
			animationOut: 'animate__slideOutRight',
			message: 'Please try again',
			title: 'Failed to update user role',
			type: 'danger',
		});

		expect(document.body).toMatchSnapshot();
	});
});
