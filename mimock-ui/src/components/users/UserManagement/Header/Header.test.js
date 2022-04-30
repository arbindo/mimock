import React from 'react';
import { render, act } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
	it('should render user management header', async () => {
		let tree;
		await act(async () => {
			tree = await render(<Header />);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('user-management-header')).toBeInTheDocument();
		expect(getByTestId('add-user-btn')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
