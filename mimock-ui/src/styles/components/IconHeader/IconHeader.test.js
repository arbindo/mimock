import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { FaHome } from 'react-icons/fa';
import IconHeader from './IconHeader';

let mockUseNavigation = jest.fn();
jest.mock('react-router-dom', () => ({
	useNavigate: () => mockUseNavigation,
}));

describe('IconHeader', () => {
	it('should render icon header component without back button', async () => {
		const { getByTestId, container, queryByTestId } = await render(
			<IconHeader icon={<FaHome />} title='Home' dataTestId='home-header' />
		);

		expect(getByTestId('home-header')).toBeInTheDocument();
		expect(getByTestId('home-header')).toHaveTextContent('Home');
		expect(queryByTestId('go-back-btn')).toBeNull();

		expect(container).toMatchSnapshot();
	});

	it('should render icon header component with back button', async () => {
		const { getByTestId, container } = await render(
			<IconHeader
				icon={<FaHome />}
				title='Home'
				dataTestId='home-header'
				enableBackNavigation={true}
			/>
		);

		expect(getByTestId('home-header')).toBeInTheDocument();
		expect(getByTestId('home-header')).toHaveTextContent('Home');

		await act(async () => {
			fireEvent.click(getByTestId('go-back-btn'));
		});

		expect(mockUseNavigation).toHaveBeenCalledTimes(1);
		expect(mockUseNavigation).toHaveBeenCalledWith(-1);

		expect(container).toMatchSnapshot();
	});
});
