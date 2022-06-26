import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { useRecoilState } from 'recoil';
import { getUserInfo } from 'services/users';
import UpdatePassword from './UpdatePassword';

let mockedRecoilFn = jest.fn();
jest.mock('recoil');
jest.mock('services/users');

describe('UpdatePassword', () => {
	beforeEach(() => {
		getUserInfo.mockResolvedValue({
			passwordUpdatedAt: '2022-06-25 19:06:25',
		});

		useRecoilState.mockImplementation(() => {
			return [
				{
					userName: 'test1',
					name: 'Tester',
					isUserActive: false,
					userRole: 'MANAGER',
					passwordUpdatedAt: '2022-04-28 20:35:35',
					showPasswordUpdateModal: false,
				},
				mockedRecoilFn,
			];
		});
	});

	it('should render password update component for ADMIN user', async () => {
		let tree;
		await act(async () => {
			tree = await render(<UpdatePassword userName='admin' userRole='ADMIN' />);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('update-password-container')).toBeInTheDocument();
		expect(getByTestId('update-password-label')).toHaveTextContent(
			'Password updated on'
		);
		expect(getByTestId('password-updated-date')).toBeInTheDocument();
		expect(getByTestId('update-password-btn')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should render password update component for non-admin user', async () => {
		let tree;
		await act(async () => {
			tree = await render(
				<UpdatePassword userName='manager' userRole='MANAGER' />
			);
		});

		const { getByTestId, queryByTestId, container } = tree;

		expect(getByTestId('update-password-container')).toBeInTheDocument();
		expect(getByTestId('update-password-label')).toHaveTextContent(
			'Update Password'
		);
		expect(getByTestId('update-password-btn')).toBeInTheDocument();

		expect(queryByTestId('password-updated-date')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should show password update modal on clicking edit icon', async () => {
		let tree;
		await act(async () => {
			tree = await render(<UpdatePassword userName='admin' userRole='ADMIN' />);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('update-password-container')).toBeInTheDocument();
		expect(getByTestId('update-password-label')).toHaveTextContent(
			'Password updated on'
		);
		expect(getByTestId('password-updated-date')).toBeInTheDocument();
		expect(getByTestId('update-password-btn')).toBeInTheDocument();

		await act(async () => {
			fireEvent.click(getByTestId('update-password-btn'));
		});

		expect(mockedRecoilFn).toHaveBeenCalledTimes(1);
		expect(mockedRecoilFn).toHaveBeenCalledWith({
			isUserActive: false,
			name: 'Tester',
			passwordUpdatedAt: '2022-04-28 20:35:35',
			showPasswordUpdateModal: true,
			userName: 'test1',
			userRole: 'MANAGER',
		});

		expect(container).toMatchSnapshot();
	});
});
