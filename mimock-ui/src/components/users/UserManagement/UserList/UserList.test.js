import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { getAllUsers } from 'services/users/getUsers.service';
import UserList from './UserList';

jest.mock('services/users/getUsers.service');

describe('UserList', () => {
	beforeEach(() => {
		jest.spyOn(global.Math, 'random').mockReturnValue(0);
	});

	it('should render Users list', async () => {
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

		let tree;
		await act(async () => {
			tree = await render(<UserList />);
		});

		const { getByTestId, queryByTestId } = tree;

		expect(getByTestId('users-list')).toBeInTheDocument();

		expect(getByTestId('user-1')).toBeInTheDocument();
		expect(getByTestId('user-2')).toBeInTheDocument();

		const deleteUserBtn = getByTestId('delete-1');
		fireEvent.click(deleteUserBtn);

		expect(getByTestId('confirmation-modal')).toBeInTheDocument();
		expect(getByTestId('confirmation-modal-message')).toBeInTheDocument();
		expect(getByTestId('confirmation-modal-message').textContent).toBe(
			'Are you sure you want to delete user "user1" ?'
		);

		expect(queryByTestId('no-users-error')).not.toBeInTheDocument();

		expect(document.body).toMatchSnapshot();
	});
});
