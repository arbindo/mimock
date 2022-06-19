import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import Toolbar from './Toolbar';

const mockedNavigation = jest.fn(() => {});
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedNavigation,
}));

describe('Toolbar', () => {
	it('should render toolbar component', async () => {
		const tree = await render(<Toolbar />);

		const { container, getByTestId } = tree;

		expect(getByTestId('toolbar-container')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should navigate to add mock page on clicking add CTA', async () => {
		const tree = await render(<Toolbar />);

		const { container, getByTestId } = tree;

		expect(getByTestId('toolbar-container')).toBeInTheDocument();

		await act(async () => {
			fireEvent.click(getByTestId('add-mock-btn'));
		});

		expect(mockedNavigation).toHaveBeenCalledTimes(1);
		expect(mockedNavigation).toHaveBeenCalledWith(
			'/mimock-ui/manage/mocks/add-mock'
		);

		expect(container).toMatchSnapshot();
	});
});
