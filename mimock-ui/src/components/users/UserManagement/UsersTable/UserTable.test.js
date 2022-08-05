import React from 'react';
import { render, act } from '@testing-library/react';
import { getAllUsers } from 'services/users';
import UserTable from './UserTable';

let mockedRecoilFn;
jest.mock('recoil', () => {
	mockedRecoilFn = jest.fn();
	return {
		atom: jest.fn(),
		useRecoilState: mockedRecoilFn.mockImplementation(() => [false, jest.fn()]),
	};
});

jest.mock('services/users');
jest.mock('react-router-dom');

describe('UserTable', () => {
	beforeEach(() => {
		getAllUsers.mockResolvedValue([
			{
				userId: 1,
				userName: 'user1',
				name: 'User 1',
				userRole: 'ADMIN',
				isUserActive: true,
				userCreatedAt: '2022-04-28 19:42:21',
			},
			{
				userId: 2,
				userName: 'user2',
				name: 'User 2',
				userRole: 'MANAGER',
				isUserActive: true,
				userCreatedAt: '2022-04-28 19:42:21',
			},
			{
				userId: 3,
				userName: 'user3',
				name: 'User 3',
				userRole: 'VIEWER',
				isUserActive: true,
				userCreatedAt: '2022-04-28 19:42:21',
			},
		]);
	});

	it('should render user table with all the users', async () => {
		let tree;
		await act(async () => {
			tree = await render(<UserTable />);
		});

		const { container, getByTestId, queryByTestId } = tree;

		expect(getAllUsers).toHaveBeenCalled();

		expect(getByTestId('user-mgmt-table-header')).toBeInTheDocument();

		expect(getByTestId('user-record-user1')).toBeInTheDocument();
		expect(getByTestId('user-record-user2')).toBeInTheDocument();
		expect(getByTestId('user-record-user3')).toBeInTheDocument();

		expect(queryByTestId('fetch-user-error')).not.toBeInTheDocument();
		expect(queryByTestId('no-users-error')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should show warning message when user list is empty', async () => {
		getAllUsers.mockResolvedValue([]);

		let tree;
		await act(async () => {
			tree = await render(<UserTable />);
		});

		const { container, getByTestId, queryByTestId } = tree;

		expect(getAllUsers).toHaveBeenCalled();

		expect(queryByTestId('user-mgmt-table-header')).not.toBeInTheDocument();
		expect(queryByTestId('fetch-user-error')).not.toBeInTheDocument();

		expect(getByTestId('no-users-error')).toBeInTheDocument();
		expect(getByTestId('no-users-error')).toHaveTextContent(
			'No users found. Click on "ADD USER" to create a new user'
		);

		expect(container).toMatchSnapshot();
	});

	it('should show error message when get user service call fails', async () => {
		getAllUsers.mockRejectedValue(new Error("Can't fetch users"));

		let tree;
		await act(async () => {
			tree = await render(<UserTable />);
		});

		const { container, getByTestId, queryByTestId } = tree;

		expect(getAllUsers).toHaveBeenCalled();

		expect(queryByTestId('user-mgmt-table-header')).not.toBeInTheDocument();
		expect(queryByTestId('no-users-error')).not.toBeInTheDocument();

		expect(getByTestId('fetch-user-error')).toBeInTheDocument();
		expect(getByTestId('fetch-user-error')).toHaveTextContent(
			/Failed to fetch users/
		);

		expect(container).toMatchSnapshot();
	});

	it('should not repeat get user call when refresh is not required', async () => {
		let tree;
		await act(async () => {
			tree = await render(<UserTable />);
		});

		const { container, getByTestId, queryByTestId, rerender } = tree;

		expect(getByTestId('user-mgmt-table-header')).toBeInTheDocument();

		expect(getByTestId('user-record-user1')).toBeInTheDocument();
		expect(getByTestId('user-record-user2')).toBeInTheDocument();
		expect(getByTestId('user-record-user3')).toBeInTheDocument();

		expect(queryByTestId('fetch-user-error')).not.toBeInTheDocument();
		expect(queryByTestId('no-users-error')).not.toBeInTheDocument();

		mockedRecoilFn.mockImplementation(() => [true, jest.fn()]);

		await act(async () => {
			await rerender(<UserTable />);
		});

		expect(getAllUsers).toHaveBeenCalledTimes(2);

		expect(container).toMatchSnapshot();
	});
});
