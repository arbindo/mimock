import React from 'react';
import { act, render } from '@testing-library/react';
import { useRecoilState } from 'recoil';
import { getUserInfo } from 'services/users';
import UserDetails from './UserDetails';

let mockedRecoilFn = jest.fn();
jest.mock('recoil');
jest.mock('./UserRole', () => {
	const UserRoleMock = (
		<div data-testid='edit-user-role'>
			<select>
				<option>ADMIN</option>
				<option>MANAGER</option>
				<option>VIEWER</option>
			</select>
		</div>
	);

	return () => UserRoleMock;
});
jest.mock('./UserActivationStatus', () => {
	const UserActivationStatusMock = (
		<div data-testid='edit-user-activation-status'>
			<input type='checkbox' />
			<span>Active</span>
		</div>
	);

	return () => UserActivationStatusMock;
});
jest.mock('./UserPasswordUpdate', () => {
	const UserPasswordUpdateMock = (
		<div data-testid='edit-user-update-password'>
			<button>Update Password</button>
			<span>Last updated:</span>
		</div>
	);

	return () => UserPasswordUpdateMock;
});
jest.mock('./UserPasswordUpdate/PasswordUpdateModal', () => {
	const UserPasswordUpdateMock = (
		<div data-testid='password-update-modal'>
			<button>Update Password</button>
		</div>
	);

	return () => UserPasswordUpdateMock;
});
jest.mock('services/users');
jest.mock('react-router-dom', () => ({
	useSearchParams: () => [
		{
			get: () => 'd749184e-b60d-4ac0-b459-e3b9cc5710d1',
		},
	],
}));

describe('UserDetails', () => {
	beforeEach(() => {
		getUserInfo.mockResolvedValue({
			userName: 'test1',
			name: 'Tester',
			userRole: 'ADMIN',
			isUserActive: true,
			userCreatedAt: '2022-04-28 19:42:21',
			passwordUpdatedAt: null,
		});
		useRecoilState.mockImplementation(() => {
			return [
				{
					userName: 'test1',
					name: 'Tester',
					isUserActive: false,
					userRole: 'MANAGER',
					passwordUpdatedAt: '2022-04-28 20:35:35',
				},
				mockedRecoilFn,
			];
		});
	});

	it('should render user details', async () => {
		let tree;
		await act(async () => {
			tree = await render(<UserDetails />);
		});

		const { getByTestId, queryByTestId, container, rerender } = tree;

		expect(getByTestId('edit-user-details')).toBeInTheDocument();

		expect(getByTestId('edit-user-name')).toBeInTheDocument();
		expect(getByTestId('edit-user-username')).toBeInTheDocument();
		expect(getByTestId('edit-user-role')).toBeInTheDocument();
		expect(getByTestId('edit-user-role')).toBeInTheDocument();
		expect(getByTestId('edit-user-activation-status')).toBeInTheDocument();
		expect(getByTestId('edit-user-created-at')).toBeInTheDocument();
		expect(getByTestId('edit-user-update-password')).toBeInTheDocument();

		expect(mockedRecoilFn).toHaveBeenCalledWith({
			isUserActive: true,
			name: 'Tester',
			passwordUpdatedAt: null,
			userCreatedAt: '2022-04-28 19:42:21',
			userName: 'test1',
			userRole: 'ADMIN',
		});

		expect(getUserInfo).toHaveBeenCalledTimes(1);
		expect(getUserInfo).toHaveBeenCalledWith(
			'd749184e-b60d-4ac0-b459-e3b9cc5710d1'
		);

		expect(queryByTestId('edit-user-details-error')).not.toBeInTheDocument();
		expect(queryByTestId('password-update-modal')).not.toBeInTheDocument();

		useRecoilState.mockImplementation(() => {
			return [
				{
					userName: 'test1',
					name: 'Tester',
					isUserActive: false,
					userRole: 'MANAGER',
					userCreatedAt: '2022-04-28 19:42:21',
					passwordUpdatedAt: '2022-04-28 20:35:35',
				},
				mockedRecoilFn,
			];
		});

		await act(async () => {
			rerender(<UserDetails />);
		});

		expect(container).toMatchSnapshot();
	});

	it('should render password update modal', async () => {
		let tree;
		await act(async () => {
			tree = await render(<UserDetails />);
		});

		const { getByTestId, queryByTestId, container, rerender } = tree;

		expect(getByTestId('edit-user-details')).toBeInTheDocument();

		expect(getByTestId('edit-user-name')).toBeInTheDocument();
		expect(getByTestId('edit-user-username')).toBeInTheDocument();
		expect(getByTestId('edit-user-role')).toBeInTheDocument();
		expect(getByTestId('edit-user-role')).toBeInTheDocument();
		expect(getByTestId('edit-user-activation-status')).toBeInTheDocument();
		expect(getByTestId('edit-user-created-at')).toBeInTheDocument();
		expect(getByTestId('edit-user-update-password')).toBeInTheDocument();

		expect(mockedRecoilFn).toHaveBeenCalledWith({
			isUserActive: true,
			name: 'Tester',
			passwordUpdatedAt: null,
			userCreatedAt: '2022-04-28 19:42:21',
			userName: 'test1',
			userRole: 'ADMIN',
		});

		expect(getUserInfo).toHaveBeenCalledTimes(1);
		expect(getUserInfo).toHaveBeenCalledWith(
			'd749184e-b60d-4ac0-b459-e3b9cc5710d1'
		);

		expect(queryByTestId('edit-user-details-error')).not.toBeInTheDocument();
		expect(queryByTestId('password-update-modal')).not.toBeInTheDocument();

		useRecoilState.mockImplementation(() => {
			return [
				{
					userName: 'test1',
					name: 'Tester',
					isUserActive: false,
					userRole: 'MANAGER',
					userCreatedAt: '2022-04-28 19:42:21',
					passwordUpdatedAt: '2022-04-28 20:35:35',
					showPasswordUpdateModal: true,
				},
				mockedRecoilFn,
			];
		});

		await act(async () => {
			rerender(<UserDetails />);
		});

		expect(getByTestId('password-update-modal')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should show error when getUserInfo call fails', async () => {
		getUserInfo.mockRejectedValue(new Error('Error'));

		let tree;
		await act(async () => {
			tree = await render(<UserDetails />);
		});

		const { getByTestId, queryByTestId, container } = tree;

		expect(getByTestId('edit-user-details-error')).toBeInTheDocument();
		expect(getByTestId('edit-user-details-error')).toHaveTextContent(
			'Failed to fetch user details. Please try again later.'
		);

		expect(queryByTestId('edit-user-details')).not.toBeInTheDocument();

		expect(getUserInfo).toHaveBeenCalledTimes(1);
		expect(getUserInfo).toHaveBeenCalledWith(
			'd749184e-b60d-4ac0-b459-e3b9cc5710d1'
		);

		expect(container).toMatchSnapshot();
	});
});
