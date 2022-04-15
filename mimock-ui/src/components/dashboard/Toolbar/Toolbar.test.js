import React from 'react';
import { render } from '@testing-library/react';
import Toolbar from './Toolbar';

describe('Toolbar', () => {
	it('should render toolbar component', async () => {
		const tree = await render(<Toolbar />);

		const { container, getByTestId } = tree;

		expect(getByTestId('toolbar-section')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
