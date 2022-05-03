import React from 'react';
import { render } from '@testing-library/react';
import List from './List';

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

describe('List', () => {
	it('should render list component', async () => {
		const tree = await render(<List />);

		const { container, getByTestId } = tree;

		expect(getByTestId('list-section')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
