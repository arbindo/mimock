import React from 'react';
import { render } from '@testing-library/react';
import RequestPane from './RequestPane';
import { BrowserRouter } from 'react-router-dom';

describe('RequestPane', () => {
	it('should render request pane component', async () => {
		const tree = await render(<RequestPane />, { wrapper: BrowserRouter });

		const { container, getByTestId } = tree;

		expect(getByTestId('request-pane-section')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
