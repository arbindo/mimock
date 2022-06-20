import React from 'react';
import { render } from '@testing-library/react';
import GeneralPane from './GeneralPane';
import { BrowserRouter } from 'react-router-dom';

describe('GeneralPane', () => {
	it('should render general pane component', async () => {
		const tree = await render(<GeneralPane />, { wrapper: BrowserRouter });

		const { container, getByTestId } = tree;

		expect(getByTestId('general-nav-tab-pane')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
