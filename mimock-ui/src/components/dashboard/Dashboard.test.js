import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from './Dashboard';

describe('Dashboard', () => {
	it('should render all dashboard components', async () => {
		const tree = await render(<Dashboard />);

		const { container, getByTestId } = tree;

		expect(getByTestId('titlebar-section')).toBeInTheDocument();
		expect(getByTestId('toolbar-section')).toBeInTheDocument();
		expect(getByTestId('sidebar-section')).toBeInTheDocument();
		expect(getByTestId('list-section')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
