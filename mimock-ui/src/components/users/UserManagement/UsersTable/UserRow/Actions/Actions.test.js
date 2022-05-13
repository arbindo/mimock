import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { deleteUser } from 'services/users';
import Actions from './Actions';

const actualNotification = jest.requireActual('hooks/useNotification');

let mockedRecoilFn;
jest.mock('recoil', () => {
	mockedRecoilFn = jest.fn();
	return {
		atom: jest.fn(),
		useRecoilState: jest.fn(() => [true, mockedRecoilFn]),
	};
});
jest.mock('react-notifications-component', () => {
	const Store = {
		addNotification: jest.fn(),
	};
	return { Store };
});

const mockedNavigation = jest.fn(() => {});
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedNavigation,
}));
jest.mock('services/users/deleteUser.service');

describe('Actions', () => {
	it('should render user actions', async () => {
		let tree;
		await act(async () => {
			tree = await render(
				<Actions
					userName='luke1'
					userId='d749184e-b60d-4ac0-b459-e3b9cc5710d1'
				/>
			);
		});

		const { container, getByTestId } = tree;

		expect(getByTestId('user-action-luke1')).toBeInTheDocument();

		expect(getByTestId('edit-luke1')).toBeInTheDocument();
		expect(getByTestId('delete-luke1')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should show confirmation modal on clicking delete', async () => {
		let tree;
		await act(async () => {
			tree = await render(
				<Actions
					userName='luke1'
					userId='d749184e-b60d-4ac0-b459-e3b9cc5710d1'
				/>
			);
		});

		const { getByTestId } = tree;

		expect(getByTestId('user-action-luke1')).toBeInTheDocument();

		expect(getByTestId('edit-luke1')).toBeInTheDocument();

		await act(async () => {
			await fireEvent.click(getByTestId('delete-luke1'));
		});

		expect(mockedRecoilFn).toHaveBeenCalledTimes(1);
		expect(mockedRecoilFn).toHaveBeenCalledWith(true);

		expect(getByTestId('confirmation-modal')).toBeInTheDocument();

		expect(document.body).toMatchSnapshot();
	});

	it('should navigate to edit user page on clicking edit button', async () => {
		let tree;
		await act(async () => {
			tree = await render(
				<Actions
					userName='luke1'
					userId='d749184e-b60d-4ac0-b459-e3b9cc5710d1'
				/>
			);
		});

		const { getByTestId } = tree;

		expect(getByTestId('user-action-luke1')).toBeInTheDocument();

		expect(getByTestId('delete-luke1')).toBeInTheDocument();

		await act(async () => {
			await fireEvent.click(getByTestId('edit-luke1'));
		});

		expect(mockedNavigation).toHaveBeenCalledTimes(1);
		expect(mockedNavigation).toHaveBeenCalledWith(
			'/mimock-ui/admin/users/edit?userId=d749184e-b60d-4ac0-b459-e3b9cc5710d1'
		);
	});

	it('should close confirmation modal on clicking cancel', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');

		let tree;
		await act(async () => {
			tree = await render(
				<Actions
					userName='luke1'
					userId='d749184e-b60d-4ac0-b459-e3b9cc5710d1'
				/>
			);
		});

		const { getByTestId, queryByTestId } = tree;

		expect(getByTestId('edit-luke1')).toBeInTheDocument();

		act(() => {
			const deleteUserBtn = getByTestId('delete-luke1');
			fireEvent.click(deleteUserBtn);
		});

		expect(getByTestId('confirmation-modal')).toBeInTheDocument();
		expect(getByTestId('confirmation-modal-message')).toBeInTheDocument();
		expect(getByTestId('confirmation-modal-message').textContent).toBe(
			'Are you sure you want to delete user "luke1" ?'
		);

		await act(async () => {
			const confirmDeleteBtn = getByTestId('confirmation-modal-cancel-btn');
			await fireEvent.click(confirmDeleteBtn);
		});

		expect(deleteUser).not.toHaveBeenCalledTimes(1);
		expect(notificationSpy).not.toHaveBeenCalled();

		expect(queryByTestId('confirmation-modal')).not.toBeInTheDocument();

		expect(document.body).toMatchSnapshot();
	});

	it('should invoke delete user service on confirming user deletion', async () => {
		deleteUser.mockResolvedValue({
			id: 'luke1',
			message: 'User deleted successfully',
		});
		const notificationSpy = jest.spyOn(actualNotification, 'default');

		let tree;
		await act(async () => {
			tree = await render(
				<Actions
					userName='luke1'
					userId='d749184e-b60d-4ac0-b459-e3b9cc5710d1'
				/>
			);
		});

		const { getByTestId } = tree;

		expect(getByTestId('edit-luke1')).toBeInTheDocument();

		act(() => {
			const deleteUserBtn = getByTestId('delete-luke1');
			fireEvent.click(deleteUserBtn);
		});

		expect(getByTestId('confirmation-modal')).toBeInTheDocument();
		expect(getByTestId('confirmation-modal-message')).toBeInTheDocument();
		expect(getByTestId('confirmation-modal-message').textContent).toBe(
			'Are you sure you want to delete user "luke1" ?'
		);

		await act(async () => {
			const confirmDeleteBtn = getByTestId('confirmation-modal-confirm-btn');
			await fireEvent.click(confirmDeleteBtn);
		});

		expect(deleteUser).toHaveBeenCalledTimes(1);
		expect(deleteUser).toHaveBeenCalledWith('luke1');

		expect(notificationSpy).toHaveBeenCalledTimes(1);
		expect(notificationSpy).toHaveBeenCalledWith({
			type: 'success',
			title: 'Deletion successful',
			message: 'User - luke1 has been deleted',
			position: 'bottom-right',
			animationIn: 'animate__slideInRight',
			animationOut: 'animate__slideOutRight',
		});

		expect(document.body).toMatchSnapshot();
	});

	it('should show error notification when user deletion fails', async () => {
		deleteUser.mockRejectedValue(new Error('Deletion failed!'));
		const notificationSpy = jest.spyOn(actualNotification, 'default');

		let tree;
		await act(async () => {
			tree = await render(
				<Actions
					userName='luke1'
					userId='d749184e-b60d-4ac0-b459-e3b9cc5710d1'
				/>
			);
		});

		const { getByTestId } = tree;

		expect(getByTestId('edit-luke1')).toBeInTheDocument();

		act(() => {
			const deleteUserBtn = getByTestId('delete-luke1');
			fireEvent.click(deleteUserBtn);
		});

		expect(getByTestId('confirmation-modal')).toBeInTheDocument();
		expect(getByTestId('confirmation-modal-message')).toBeInTheDocument();
		expect(getByTestId('confirmation-modal-message').textContent).toBe(
			'Are you sure you want to delete user "luke1" ?'
		);

		await act(async () => {
			const confirmDeleteBtn = getByTestId('confirmation-modal-confirm-btn');
			await fireEvent.click(confirmDeleteBtn);
		});

		expect(deleteUser).toHaveBeenCalledTimes(1);
		expect(deleteUser).toHaveBeenCalledWith('luke1');

		expect(notificationSpy).toHaveBeenCalledTimes(1);
		expect(notificationSpy).toHaveBeenCalledWith({
			type: 'danger',
			title: 'Failed to delete user - luke1',
			message: 'Please try again',
			animationIn: 'animate__bounceIn',
			animationOut: 'animate__bounceOut',
		});

		expect(document.body).toMatchSnapshot();
	});
});
