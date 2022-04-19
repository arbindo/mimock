import React from 'react';
import { render } from '@testing-library/react';
import Logout from './Logout';

jest.mock('recoil', () => ({
	atom: jest.fn(),
	useRecoilState: jest.fn(() => [null, jest.fn()]),
}));

jest.mock('styles/Loaders', () => ({
	FullPageLoader: () => {
		return <div data-testid='fullpage-loader'>Loading...</div>;
	},
}));

let mockedUseState;
jest.mock('react', () => {
	mockedUseState = jest.fn();
	return {
		...jest.requireActual('react'),
		useState: mockedUseState.mockImplementation(() => [true, jest.fn()]),
	};
});

jest.mock('react-router', () => ({
	...jest.requireActual('react-router'),
	// eslint-disable-next-line react/prop-types
	Navigate: ({ to, replace }) => {
		return (
			<div data-testid='react-router-navigator'>
				<div data-testid='navigate-to'>{to}</div>
				{replace && <div data-testid='navigate-replace'>true</div>}
			</div>
		);
	},
}));

describe('Logout', () => {
	it('should show full page loader when session cleanup is in progress', async () => {
		const { getByTestId } = await render(<Logout />);

		expect(getByTestId('fullpage-loader')).toBeInTheDocument();
		expect(document.body).toMatchSnapshot();
	});

	it('should navigate to login page after clearing session', async () => {
		mockedUseState.mockImplementation(() => [false, jest.fn()]);

		const { container, getByTestId } = await render(<Logout />);

		expect(getByTestId('react-router-navigator')).toBeInTheDocument();
		expect(getByTestId('navigate-to')).toBeInTheDocument();
		expect(getByTestId('navigate-to').textContent).toBe('/mimock-ui');
		expect(getByTestId('navigate-replace')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
