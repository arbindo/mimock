import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { getUserDetails } from 'utils/jwtUtils';
import Header from './Header';

jest.mock('utils/jwtUtils');

describe('Header', () => {
	it('should render Header with logo and menu items', async () => {
		getUserDetails.mockImplementation(() => ({
			userRole: 'ROLE_ADMIN',
		}));

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

	it('should render Header without admin menu items if user is not admin', async () => {
		getUserDetails.mockImplementation(() => ({
			userRole: 'ROLE_MANAGER',
		}));

		const { container, getByTestId, queryByTestId } = await render(
			<BrowserRouter>
				<Header />
			</BrowserRouter>
		);

		expect(getByTestId('header-logo')).toBeInTheDocument();
		expect(getByTestId('header-menu-items')).toBeInTheDocument();
		expect(getByTestId('menu-item-mocks')).toBeInTheDocument();
		expect(queryByTestId('menu-item-users')).not.toBeInTheDocument();

		expect(getByTestId('header-menu-options')).toBeInTheDocument();
		expect(getByTestId('menu-option-settings')).toBeInTheDocument();
		expect(getByTestId('menu-option-logout')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
