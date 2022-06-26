import React from 'react';
import { render, act } from '@testing-library/react';
import UserRole from './UserRole';

jest.mock('react-router-dom');

describe('UserRole', () => {
	it('should render user role pill for ADMIN', async () => {
		let tree;
		await act(async () => {
			tree = await render(<UserRole role='ADMIN' />);
		});

		const { getByTestId, queryByTestId, container } = tree;

		expect(getByTestId('user-role-container')).toBeInTheDocument();
		expect(getByTestId('user-role-header')).toHaveTextContent('Current Role');
		expect(getByTestId('role-pill-ADMIN')).toBeInTheDocument();
		expect(queryByTestId('role-info-message')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should render user role pill for non-admin', async () => {
		let tree;
		await act(async () => {
			tree = await render(<UserRole role='MANAGER' />);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('user-role-container')).toBeInTheDocument();
		expect(getByTestId('user-role-header')).toHaveTextContent('Current Role');
		expect(getByTestId('role-pill-MANAGER')).toBeInTheDocument();
		expect(getByTestId('role-info-message')).toHaveTextContent(
			'Reach out to your ADMIN to update your role'
		);

		expect(container).toMatchSnapshot();
	});
});
