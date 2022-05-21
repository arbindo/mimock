import React from 'react';
import { act, render } from '@testing-library/react';
import { getUserInfo } from 'services/users/getUserInfo.service';
import UserDetails from './UserDetails';

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
jest.mock('services/users/getUserInfo.service');
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
	});

	it('should render user details', async () => {
		let tree;
		await act(async () => {
			tree = await render(<UserDetails />);
		});

		const { getByTestId, queryByTestId, container } = tree;

		expect(getByTestId('edit-user-details')).toBeInTheDocument();

		expect(getByTestId('edit-user-name')).toBeInTheDocument();
		expect(getByTestId('edit-user-username')).toBeInTheDocument();
		expect(getByTestId('edit-user-role')).toBeInTheDocument();
		expect(getByTestId('edit-user-role')).toBeInTheDocument();
		expect(getByTestId('edit-user-activation-status')).toBeInTheDocument();

		expect(getUserInfo).toHaveBeenCalledTimes(1);
		expect(getUserInfo).toHaveBeenCalledWith(
			'd749184e-b60d-4ac0-b459-e3b9cc5710d1'
		);

		expect(queryByTestId('edit-user-details-error')).not.toBeInTheDocument();

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
