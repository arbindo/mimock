import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from './Dashboard';

let mockedRecoilFn;
jest.mock('recoil', () => {
	mockedRecoilFn = jest.fn();
	return {
		atom: jest.fn(),
		useRecoilState: jest.fn(() => [true, mockedRecoilFn]),
	};
});

let mockedUseState;
jest.mock('react', () => {
	mockedUseState = jest.fn();
	return {
		...jest.requireActual('react'),
		useState: mockedUseState.mockImplementation(() => [true, jest.fn()]),
	};
});

describe('Dashboard', () => {
	it('should render all dashboard components', async () => {
		const tree = await render(<Dashboard />);

		const { container, getByTestId } = tree;

		expect(getByTestId('titlebar-section')).toBeInTheDocument();
		expect(getByTestId('toolbar-section')).toBeInTheDocument();
		expect(getByTestId('list-section')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
