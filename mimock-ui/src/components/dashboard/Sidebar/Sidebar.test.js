import React from 'react';
import { render } from '@testing-library/react';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
	it('should render sidebar component', async () => {
		const tree = await render(<Sidebar />);

		const { container, getByTestId } = tree;

		expect(getByTestId('sidebar-section')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
