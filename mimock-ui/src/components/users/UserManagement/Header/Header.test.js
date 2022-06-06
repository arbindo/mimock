import React from 'react';
import { useNavigate } from 'react-router-dom';
import { render, act, fireEvent } from '@testing-library/react';
import Header from './Header';

jest.mock('react-router-dom');

describe('Header', () => {
	it('should render user management header', async () => {
		let tree;
		await act(async () => {
			tree = await render(<Header />);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('user-management-header')).toBeInTheDocument();
		expect(getByTestId('add-user-btn')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should navigate to add user route on clicking add user button', async () => {
		const mockNavigate = jest.fn();
		useNavigate.mockImplementation(() => mockNavigate);

		let tree;
		await act(async () => {
			tree = await render(<Header />);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('user-management-header')).toBeInTheDocument();

		await act(async () => {
			fireEvent.click(getByTestId('add-user-btn'));
		});

		expect(mockNavigate).toHaveBeenCalledTimes(1);
		expect(mockNavigate).toHaveBeenCalledWith(
			'/mimock-ui/admin/users/add-user'
		);
		expect(container).toMatchSnapshot();
	});
});
