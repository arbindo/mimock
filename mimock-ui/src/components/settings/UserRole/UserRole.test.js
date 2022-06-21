import React from 'react';
import { render, act } from '@testing-library/react';
import UserRole from './UserRole';

jest.mock('react-router-dom');

describe('UserRole', () => {
	it('should render user role', async () => {
		let tree;
		await act(async () => {
			tree = await render(<UserRole />);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('user-role-container')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
