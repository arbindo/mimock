import React from 'react';
import { render } from '@testing-library/react';
import Detail from './Detail';
import { BrowserRouter } from 'react-router-dom';

let mockedUsedLocation;
jest.mock('react-router-dom', () => {
	mockedUsedLocation = jest.fn();
	return {
		...jest.requireActual('react-router-dom'),
		useLocation: () => mockedUsedLocation,
	};
});

describe('Detail', () => {
	it('should render detail component', async () => {
		const tree = await render(<Detail />, { wrapper: BrowserRouter });

		const { container, getByTestId } = tree;

		expect(getByTestId('detail-section')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
