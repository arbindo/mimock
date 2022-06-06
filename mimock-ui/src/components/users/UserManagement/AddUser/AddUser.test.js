import React from 'react';
import { act, render } from '@testing-library/react';
import AddUser from './AddUser';

describe('AddUser', () => {
	it('should render add user component', async () => {
		let tree;
		await act(async () => {
			tree = await render(<AddUser />);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('add-new-user')).toBeInTheDocument();
		expect(getByTestId('add-user-header')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
