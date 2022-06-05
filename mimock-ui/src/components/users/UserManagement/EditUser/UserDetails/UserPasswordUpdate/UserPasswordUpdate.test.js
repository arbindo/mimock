import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import { useRecoilState } from 'recoil';
import UserPasswordUpdate from './UserPasswordUpdate';

let mockedRecoilFn = jest.fn();
jest.mock('recoil');

describe('UserPasswordUpdate', () => {
	beforeEach(() => {
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

	it('should render UserPasswordUpdate', async () => {
		let tree;
		await act(async () => {
			tree = await render(
				<UserPasswordUpdate passwordUpdatedOn='2022-04-28 19:42:21' />
			);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('edit-user-update-password')).toBeInTheDocument();
		expect(getByTestId('password-updated-date')).toBeInTheDocument();
		expect(getByTestId('password-updated-date')).toHaveTextContent(
			'28 Apr 2022'
		);
		expect(getByTestId('update-password-btn')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should not display password updated date when updated date is empty', async () => {
		let tree;
		await act(async () => {
			tree = await render(<UserPasswordUpdate />);
		});

		const { getByTestId, queryByTestId, container } = tree;

		expect(getByTestId('edit-user-update-password')).toBeInTheDocument();
		expect(queryByTestId('password-updated-date')).not.toBeInTheDocument();
		expect(getByTestId('update-password-btn')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should update recoil state to show password update modal on clicking update password button', async () => {
		let tree;
		await act(async () => {
			tree = await render(
				<UserPasswordUpdate passwordUpdatedOn='2022-04-28 19:42:21' />
			);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('edit-user-update-password')).toBeInTheDocument();
		expect(getByTestId('password-updated-date')).toBeInTheDocument();
		expect(getByTestId('password-updated-date')).toHaveTextContent(
			'28 Apr 2022'
		);

		await act(async () => {
			await fireEvent.click(getByTestId('update-password-btn'));
		});

		expect(mockedRecoilFn).toHaveBeenCalledTimes(1);
		expect(mockedRecoilFn).toHaveBeenCalledWith({
			userName: 'test1',
			name: 'Tester',
			isUserActive: false,
			userRole: 'MANAGER',
			passwordUpdatedAt: '2022-04-28 20:35:35',
			showPasswordUpdateModal: true,
		});
		expect(container).toMatchSnapshot();
	});
});
