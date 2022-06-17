import React from 'react';
import { render } from '@testing-library/react';
import DetailToolbar from './DetailToolbar';
import { BrowserRouter } from 'react-router-dom';

describe('DetailToolbar', () => {
	it('should render detail toolbar component', async () => {
		const tree = await render(<DetailToolbar />, { wrapper: BrowserRouter });

		const { container, getByTestId } = tree;

		expect(getByTestId('detail-toolbar-section')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
