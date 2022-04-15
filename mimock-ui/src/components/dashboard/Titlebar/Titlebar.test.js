import React from 'react';
import { render } from '@testing-library/react';
import Titlebar from './Titlebar';

describe('Titlebar', () => {
	it('should render titlebar component', async () => {
		const tree = await render(<Titlebar />);

		const { container, getByTestId } = tree;

		expect(getByTestId('titlebar-section')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
