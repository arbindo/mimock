import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { getAllUsers, deleteUser } from 'services/users';
import UserList from './UserList';

const actualNotification = jest.requireActual('hooks/useNotification');
jest.mock('services/users/getUsers.service');
jest.mock('services/users/deleteUser.service');

jest.mock('react-notifications-component', () => {
	const Store = {
		addNotification: jest.fn(),
	};
	return { Store };
});

describe('UserList', () => {
	beforeEach(() => {
		jest.spyOn(global.Math, 'random').mockReturnValue(0);

		getAllUsers.mockResolvedValue([
			{
				userId: 1,
				userName: 'user1',
				name: 'User 1',
			},
			{
				userId: 2,
				userName: 'user2',
				name: 'User 2',
			},
		]);
	});

	it('should render Users list', async () => {
		let tree;
		await act(async () => {
			tree = await render(<UserList />);
		});

		const { container, getByTestId, queryByTestId } = tree;

		expect(getByTestId('user-management-header')).toBeInTheDocument();
		expect(getByTestId('add-user-btn')).toBeInTheDocument();
		expect(getByTestId('users-list')).toBeInTheDocument();

		expect(getByTestId('user-1')).toBeInTheDocument();
		expect(getByTestId('user-1-icon')).toBeInTheDocument();
		expect(getByTestId('user-1-icon').innerHTML).toBe('U');
		expect(getByTestId('user-1-name')).toBeInTheDocument();
		expect(getByTestId('user-1-username')).toBeInTheDocument();

		expect(getByTestId('user-2')).toBeInTheDocument();
		expect(getByTestId('user-2-icon')).toBeInTheDocument();
		expect(getByTestId('user-2-icon').innerHTML).toBe('U');
		expect(getByTestId('user-2-name')).toBeInTheDocument();
		expect(getByTestId('user-2-username')).toBeInTheDocument();

		expect(getByTestId('edit-1')).toBeInTheDocument();
		expect(getByTestId('edit-2')).toBeInTheDocument();
		expect(getByTestId('delete-1')).toBeInTheDocument();
		expect(getByTestId('delete-2')).toBeInTheDocument();

		expect(queryByTestId('no-users-error')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should show user error when getAllUsers api call fails', async () => {
		getAllUsers.mockRejectedValue({ message: 'error' });

		let tree;
		await act(async () => {
			tree = await render(<UserList />);
		});

		const { container, getByTestId, queryByTestId } = tree;

		expect(getByTestId('user-management-header')).toBeInTheDocument();
		expect(getByTestId('add-user-btn')).toBeInTheDocument();
		expect(queryByTestId('users-list')).not.toBeInTheDocument();

		expect(getByTestId('user-error')).toBeInTheDocument();
		expect(getByTestId('user-error').innerHTML).toBe(
			'There was an error getting the users. Please try again later.'
		);

		expect(queryByTestId('no-users-error')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should show no users error when user list is empty', async () => {
		getAllUsers.mockResolvedValue([]);

		let tree;
		await act(async () => {
			tree = await render(<UserList />);
		});

		const { container, getByTestId, queryByTestId } = tree;

		expect(getByTestId('user-management-header')).toBeInTheDocument();
		expect(getByTestId('add-user-btn')).toBeInTheDocument();

		expect(queryByTestId('users-list')).not.toBeInTheDocument();

		expect(getByTestId('no-users-error')).toBeInTheDocument();
		expect(getByTestId('no-users-error').innerHTML).toBe(
			'There are no users to display.'
		);

		expect(container).toMatchSnapshot();
	});

	it('should show confirmation modal on clicking delete user button', async () => {
		let tree;
		await act(async () => {
			tree = await render(<UserList />);
		});

		const { getByTestId, queryByTestId } = tree;

		expect(getByTestId('users-list')).toBeInTheDocument();

		expect(getByTestId('user-1')).toBeInTheDocument();
		expect(getByTestId('user-2')).toBeInTheDocument();

		act(() => {
			const deleteUserBtn = getByTestId('delete-1');
			fireEvent.click(deleteUserBtn);
		});

		expect(getByTestId('confirmation-modal')).toBeInTheDocument();
		expect(getByTestId('confirmation-modal-message')).toBeInTheDocument();
		expect(getByTestId('confirmation-modal-message').textContent).toBe(
			'Are you sure you want to delete user "user1" ?'
		);

		expect(queryByTestId('no-users-error')).not.toBeInTheDocument();

		expect(document.body).toMatchSnapshot();
	});

	it('should invoke delete user service confirming user deletion', async () => {
		deleteUser.mockResolvedValue({
			id: '1',
			message: 'User deleted successfully',
		});
		const notificationSpy = jest.spyOn(actualNotification, 'default');

		let tree;
		await act(async () => {
			tree = await render(<UserList />);
		});

		const { getByTestId, queryByTestId, container, rerender } = tree;

		expect(getByTestId('users-list')).toBeInTheDocument();

		expect(getByTestId('user-1')).toBeInTheDocument();
		expect(getByTestId('user-2')).toBeInTheDocument();

		act(() => {
			const deleteUserBtn = getByTestId('delete-1');
			fireEvent.click(deleteUserBtn);
		});

		expect(getByTestId('confirmation-modal')).toBeInTheDocument();
		expect(getByTestId('confirmation-modal-message')).toBeInTheDocument();
		expect(getByTestId('confirmation-modal-message').textContent).toBe(
			'Are you sure you want to delete user "user1" ?'
		);

		act(() => {
			const confirmDeleteBtn = getByTestId('confirmation-modal-confirm-btn');
			fireEvent.click(confirmDeleteBtn);
		});

		expect(deleteUser).toHaveBeenCalledTimes(1);
		expect(deleteUser).toHaveBeenCalledWith('user1');

		getAllUsers.mockResolvedValue([
			{
				userId: 2,
				userName: 'user2',
				name: 'User 2',
			},
		]);

		await act(async () => {
			rerender(<UserList />);
		});

		expect(notificationSpy).toHaveBeenCalledTimes(1);
		expect(notificationSpy).toHaveBeenCalledWith({
			type: 'success',
			title: 'Deletion successful',
			message: `User - user1 deleted`,
			position: 'bottom-right',
			animationIn: 'animate__slideInRight',
			animationOut: 'animate__slideOutRight',
		});

		expect(queryByTestId('user-1')).not.toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should show error notification when delete service call fails', async () => {
		deleteUser.mockRejectedValue(new Error('Deletion failed!'));
		const notificationSpy = jest.spyOn(actualNotification, 'default');

		let tree;
		await act(async () => {
			tree = await render(<UserList />);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('users-list')).toBeInTheDocument();

		expect(getByTestId('user-1')).toBeInTheDocument();
		expect(getByTestId('user-2')).toBeInTheDocument();

		act(() => {
			const deleteUserBtn = getByTestId('delete-1');
			fireEvent.click(deleteUserBtn);
		});

		expect(getByTestId('confirmation-modal')).toBeInTheDocument();
		expect(getByTestId('confirmation-modal-message')).toBeInTheDocument();
		expect(getByTestId('confirmation-modal-message').textContent).toBe(
			'Are you sure you want to delete user "user1" ?'
		);

		await act(async () => {
			const confirmDeleteBtn = getByTestId('confirmation-modal-confirm-btn');
			fireEvent.click(confirmDeleteBtn);
		});

		expect(deleteUser).toHaveBeenCalledTimes(1);
		expect(deleteUser).toHaveBeenCalledWith('user1');

		expect(notificationSpy).toHaveBeenCalledTimes(1);
		expect(notificationSpy).toHaveBeenCalledWith({
			type: 'danger',
			title: 'Failed to delete user - user1',
			message: 'Please try again',
			animationIn: 'animate__bounceIn',
			animationOut: 'animate__bounceOut',
		});
		expect(container).toMatchSnapshot();
	});

	it('should close deletion modal on clicking cancel', async () => {
		let tree;
		await act(async () => {
			tree = await render(<UserList />);
		});

		const { getByTestId, queryByTestId, container } = tree;

		expect(getByTestId('users-list')).toBeInTheDocument();

		expect(getByTestId('user-1')).toBeInTheDocument();
		expect(getByTestId('user-2')).toBeInTheDocument();

		await act(async () => {
			const deleteUserBtn = getByTestId('delete-1');
			fireEvent.click(deleteUserBtn);
		});

		expect(getByTestId('confirmation-modal')).toBeInTheDocument();
		expect(getByTestId('confirmation-modal-message')).toBeInTheDocument();
		expect(getByTestId('confirmation-modal-message').textContent).toBe(
			'Are you sure you want to delete user "user1" ?'
		);

		await act(async () => {
			const cancelBtn = getByTestId('confirmation-modal-cancel-btn');
			fireEvent.click(cancelBtn);
		});

		expect(deleteUser).toHaveBeenCalledTimes(0);
		expect(queryByTestId('confirmation-modal')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
