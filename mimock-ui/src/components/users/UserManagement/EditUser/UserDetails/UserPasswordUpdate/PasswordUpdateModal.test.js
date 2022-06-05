import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import { useRecoilState } from 'recoil';
import { updatePassword } from 'services/users';
import PasswordUpdateModal from './PasswordUpdateModal';

jest.setTimeout(8000);

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

describe('PasswordUpdateModal', () => {
	beforeEach(() => {
		useRecoilState.mockImplementation(() => {
			return [
				{
					userName: 'test1',
					name: 'Tester',
					isUserActive: false,
					userRole: 'MANAGER',
					passwordUpdatedAt: '2022-04-28 20:35:35',
					showPasswordUpdateModal: true,
				},
				mockedRecoilFn,
			];
		});
	});

	it('should render the PasswordUpdateModal', async () => {
		let tree;
		await act(async () => {
			tree = await render(<PasswordUpdateModal userName='test1' />);
		});

		const { getByTestId, queryByTestId, container } = tree;

		expect(getByTestId('password-update-modal')).toBeInTheDocument();
		expect(getByTestId('password-update-header')).toBeInTheDocument();
		expect(getByTestId('password-update-header')).toHaveTextContent(
			'Updating password for test1'
		);
		expect(getByTestId('new-password-container')).toBeInTheDocument();
		expect(getByTestId('confirm-password-container')).toBeInTheDocument();
		expect(getByTestId('password-update-cancel-button')).toBeInTheDocument();
		expect(getByTestId('password-update-confirm-button')).toBeInTheDocument();

		expect(
			queryByTestId('password-update-loading-header')
		).not.toBeInTheDocument();
		expect(queryByTestId('updating-password-loader')).not.toBeInTheDocument();
		expect(queryByTestId('password-update-error')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should show loader when updating password', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');
		updatePassword.mockImplementation(async () => {
			return await new Promise((resolve) => setTimeout(resolve, 3000));
		});

		let tree;
		await act(async () => {
			tree = await render(<PasswordUpdateModal userName='test1' />);
		});

		const { getByTestId, container } = tree;

		await act(async () => {
			await fireEvent.change(getByTestId('new-password-input'), {
				target: { value: 'password123' },
			});
			await fireEvent.change(getByTestId('confirm-password-input'), {
				target: { value: 'password123' },
			});
			await fireEvent.click(getByTestId('password-update-confirm-button'));
		});

		expect(getByTestId('password-update-loading-header')).toBeInTheDocument();
		expect(getByTestId('password-update-loading-header')).toHaveTextContent(
			'Please wait...'
		);
		expect(updatePassword).toHaveBeenCalledTimes(1);
		expect(updatePassword).toHaveBeenCalledWith('test1', 'password123');
		expect(notificationSpy).toHaveBeenCalledTimes(0);

		expect(container).toMatchSnapshot();
	});

	it('should show password length error when password is less than 8 characters long', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');
		updatePassword.mockResolvedValue({});

		let tree;
		await act(async () => {
			tree = await render(<PasswordUpdateModal userName='test1' />);
		});

		const { getByTestId, queryByTestId, container } = tree;

		await act(async () => {
			await fireEvent.change(getByTestId('new-password-input'), {
				target: { value: 'pass123' },
			});
			await fireEvent.change(getByTestId('confirm-password-input'), {
				target: { value: 'pass123' },
			});
			await fireEvent.click(getByTestId('password-update-confirm-button'));
		});

		expect(
			queryByTestId('password-update-loading-header')
		).not.toBeInTheDocument();

		expect(updatePassword).toHaveBeenCalledTimes(0);
		expect(notificationSpy).toHaveBeenCalledTimes(0);
		expect(getByTestId('password-update-error')).toBeInTheDocument();
		expect(getByTestId('password-update-error')).toHaveTextContent(
			'Password must be at least 8 characters long'
		);

		expect(container).toMatchSnapshot();
	});

	it('should show password length error when password is greater than 128 characters long', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');
		updatePassword.mockResolvedValue({});

		let tree;
		await act(async () => {
			tree = await render(<PasswordUpdateModal userName='test1' />);
		});

		const { getByTestId, queryByTestId, container } = tree;

		await act(async () => {
			await fireEvent.change(getByTestId('new-password-input'), {
				target: {
					value:
						'SzTlcfBHyuAeEfNCmcKaTzEZR0ZROkG4ttlQGNhUNRiUGH2K4tZ7iPowCDzWQOHVn9Tk0XVCLUZuxeSr21MTbWArSPLzsnFgUOCPChETEU4FMiQf0jOiKB7GRzh7GGQik',
				},
			});
			await fireEvent.change(getByTestId('confirm-password-input'), {
				target: {
					value:
						'SzTlcfBHyuAeEfNCmcKaTzEZR0ZROkG4ttlQGNhUNRiUGH2K4tZ7iPowCDzWQOHVn9Tk0XVCLUZuxeSr21MTbWArSPLzsnFgUOCPChETEU4FMiQf0jOiKB7GRzh7GGQik',
				},
			});
			await fireEvent.click(getByTestId('password-update-confirm-button'));
		});

		expect(
			queryByTestId('password-update-loading-header')
		).not.toBeInTheDocument();

		expect(updatePassword).toHaveBeenCalledTimes(0);
		expect(notificationSpy).toHaveBeenCalledTimes(0);
		expect(getByTestId('password-update-error')).toBeInTheDocument();
		expect(getByTestId('password-update-error')).toHaveTextContent(
			'Password cannot be more than 128 characters'
		);

		expect(container).toMatchSnapshot();
	});

	it('should show password validation error when new and confirmed passwords do not match', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');
		updatePassword.mockResolvedValue({});

		let tree;
		await act(async () => {
			tree = await render(<PasswordUpdateModal userName='test1' />);
		});

		const { getByTestId, queryByTestId, container } = tree;

		await act(async () => {
			await fireEvent.change(getByTestId('new-password-input'), {
				target: { value: 'password123' },
			});
			await fireEvent.change(getByTestId('confirm-password-input'), {
				target: { value: 'password12' },
			});
			await fireEvent.click(getByTestId('password-update-confirm-button'));
		});

		expect(
			queryByTestId('password-update-loading-header')
		).not.toBeInTheDocument();

		expect(updatePassword).toHaveBeenCalledTimes(0);
		expect(notificationSpy).toHaveBeenCalledTimes(0);
		expect(getByTestId('password-update-error')).toBeInTheDocument();
		expect(getByTestId('password-update-error')).toHaveTextContent(
			'Passwords do not match'
		);

		expect(container).toMatchSnapshot();
	});

	it('should close modal on clicking cancel button', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');
		updatePassword.mockResolvedValue({});

		let tree;
		await act(async () => {
			tree = await render(<PasswordUpdateModal userName='test1' />);
		});

		const { getByTestId, queryByTestId } = tree;

		await act(async () => {
			await fireEvent.change(getByTestId('new-password-input'), {
				target: { value: 'password123' },
			});
			await fireEvent.change(getByTestId('confirm-password-input'), {
				target: { value: 'password123' },
			});
			await fireEvent.click(getByTestId('password-update-cancel-button'));
		});

		expect(
			queryByTestId('password-update-loading-header')
		).not.toBeInTheDocument();

		expect(updatePassword).toHaveBeenCalledTimes(0);
		expect(notificationSpy).toHaveBeenCalledTimes(0);

		expect(mockedRecoilFn).toHaveBeenCalledTimes(1);
		expect(mockedRecoilFn).toHaveBeenCalledWith({
			userName: 'test1',
			name: 'Tester',
			isUserActive: false,
			userRole: 'MANAGER',
			passwordUpdatedAt: '2022-04-28 20:35:35',
			showPasswordUpdateModal: false,
		});
	});

	it('should update password and close modal on clicking update button', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');
		updatePassword.mockResolvedValue({});

		let tree;
		await act(async () => {
			tree = await render(<PasswordUpdateModal userName='test1' />);
		});

		const { getByTestId, queryByTestId, container } = tree;

		await act(async () => {
			await fireEvent.change(getByTestId('new-password-input'), {
				target: { value: 'password123' },
			});
			await fireEvent.change(getByTestId('confirm-password-input'), {
				target: { value: 'password123' },
			});
			await fireEvent.click(getByTestId('password-update-confirm-button'));
		});

		expect(
			queryByTestId('password-update-loading-header')
		).not.toBeInTheDocument();

		expect(updatePassword).toHaveBeenCalledTimes(1);
		expect(updatePassword).toHaveBeenCalledWith('test1', 'password123');
		expect(notificationSpy).toHaveBeenCalledTimes(1);
		expect(notificationSpy).toHaveBeenCalledWith({
			type: 'success',
			title: 'Success',
			message: 'Password updated successfully',
			animationIn: 'animate__slideInRight',
			animationOut: 'animate__slideOutRight',
		});
		expect(mockedRecoilFn).toHaveBeenCalledTimes(1);
		expect(mockedRecoilFn).toHaveBeenCalledWith({
			userName: 'test1',
			name: 'Tester',
			isUserActive: false,
			userRole: 'MANAGER',
			passwordUpdatedAt: '2022-04-28 20:35:35',
			showPasswordUpdateModal: false,
		});

		expect(container).toMatchSnapshot();
	});

	it('should show error notification when password update api call fails', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');
		updatePassword.mockRejectedValue({});

		let tree;
		await act(async () => {
			tree = await render(<PasswordUpdateModal userName='test1' />);
		});

		const { getByTestId, queryByTestId, container } = tree;

		await act(async () => {
			await fireEvent.change(getByTestId('new-password-input'), {
				target: { value: 'password123' },
			});
			await fireEvent.change(getByTestId('confirm-password-input'), {
				target: { value: 'password123' },
			});
			await fireEvent.click(getByTestId('password-update-confirm-button'));
		});

		expect(
			queryByTestId('password-update-loading-header')
		).not.toBeInTheDocument();

		expect(updatePassword).toHaveBeenCalledTimes(1);
		expect(updatePassword).toHaveBeenCalledWith('test1', 'password123');
		expect(notificationSpy).toHaveBeenCalledTimes(1);
		expect(notificationSpy).toHaveBeenCalledWith({
			type: 'danger',
			title: 'Please try again',
			message: 'Failed to update password',
			animationIn: 'animate__slideInRight',
			animationOut: 'animate__slideOutRight',
		});
		expect(mockedRecoilFn).toHaveBeenCalledTimes(0);

		expect(container).toMatchSnapshot();
	});
});
