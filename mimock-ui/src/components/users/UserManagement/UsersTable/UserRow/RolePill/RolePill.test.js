import React from 'react';
import { render, act } from '@testing-library/react';
import RolePill from './RolePill';

describe('RolePill', () => {
	it.each(['ADMIN', 'MANAGER', 'VIEWER'])(
		'should render %s role pill',
		async (role) => {
			let tree;
			await act(async () => {
				tree = await render(<RolePill role={role} />);
			});

			const { container, getByTestId } = tree;

			expect(getByTestId(`role-pill-${role}`)).toBeInTheDocument();

			expect(container).toMatchSnapshot();
		}
	);
});
