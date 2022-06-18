import React from 'react';
import { render, act } from '@testing-library/react';
import EditUser from './EditUser';

jest.mock('react-router-dom');
jest.mock('./UserDetails', () => {
	const UserDetailsMock = (
		<div data-testid='edit-user-details'>User Details</div>
	);

	return () => UserDetailsMock;
});

describe('EditUser', () => {
	it('should render EditUser', async () => {
		let tree;
		await act(async () => {
			tree = await render(<EditUser />);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('edit-user')).toBeInTheDocument();
		expect(getByTestId('edit-user-header')).toBeInTheDocument();
		expect(getByTestId('edit-user-details')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
