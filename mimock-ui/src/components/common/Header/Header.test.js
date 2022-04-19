import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
	it('should render Header with logo and menu items', async () => {
		const { container, getByTestId } = await render(
			<BrowserRouter>
				<Header />
			</BrowserRouter>
		);

		expect(getByTestId('header-logo')).toBeInTheDocument();
		expect(getByTestId('header-menu-items')).toBeInTheDocument();
		expect(getByTestId('menu-item-mocks')).toBeInTheDocument();
		expect(getByTestId('menu-item-users')).toBeInTheDocument();

		expect(getByTestId('header-menu-options')).toBeInTheDocument();
		expect(getByTestId('menu-option-settings')).toBeInTheDocument();
		expect(getByTestId('menu-option-logout')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
