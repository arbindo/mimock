import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import UserPasswordUpdate from './UserPasswordUpdate';

describe('UserPasswordUpdate', () => {
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

	it('should click update password button', async () => {
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
			fireEvent.click(getByTestId('update-password-btn'));
		});

		expect(container).toMatchSnapshot();
	});
});
