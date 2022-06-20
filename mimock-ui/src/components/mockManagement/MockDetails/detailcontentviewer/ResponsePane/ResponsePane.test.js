import React from 'react';
import { render } from '@testing-library/react';
import ResponsePane from './ResponsePane';
import { BrowserRouter } from 'react-router-dom';

describe('ResponsePane', () => {
	it('should render response pane component', async () => {
		const tree = await render(<ResponsePane />, { wrapper: BrowserRouter });

		const { container, getByTestId } = tree;

		expect(getByTestId('response-nav-tab-pane')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
