import React from 'react';
import { act, render } from '@testing-library/react';
import AddUser from './AddUser';

jest.mock('react-router-dom');

describe('AddUser', () => {
	it('should render add user component', async () => {
		let tree;
		await act(async () => {
			tree = await render(<AddUser />);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('add-new-user')).toBeInTheDocument();
		expect(getByTestId('add-user-header')).toBeInTheDocument();
		expect(getByTestId('add-user-form')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
