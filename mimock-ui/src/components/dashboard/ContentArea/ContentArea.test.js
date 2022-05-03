import React from 'react';
import { render } from '@testing-library/react';
import ContentArea from './ContentArea';

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

describe('ContentArea', () => {
	it('should render content area component', async () => {
		const tree = await render(<ContentArea />);

		const { container, getByTestId } = tree;

		expect(getByTestId('list-section')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
