import React from 'react';
import { render, act } from '@testing-library/react';
import Header from './Header';

jest.mock('react-router-dom');

describe('Header', () => {
	it('should render settings header', async () => {
		let tree;
		await act(async () => {
			tree = await render(<Header />);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('settings-header-container')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
