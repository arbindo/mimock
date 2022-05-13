import React from 'react';
import { render, act } from '@testing-library/react';
import EditUser from './EditUser';

describe('EditUser', () => {
	it('should render EditUser', async () => {
		let tree;
		await act(async () => {
			tree = await render(<EditUser />);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('edit-user')).toBeInTheDocument();
		expect(getByTestId('edit-user-header')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
