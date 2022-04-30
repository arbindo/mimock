import React from 'react';
import { render } from '@testing-library/react';
import TableHeader from './TableHeader';

describe('TableHeader', () => {
	it('should render user list table header', async () => {
		const { container, getByTestId } = await render(<TableHeader />);

		expect(getByTestId('user-mgmt-table-header')).toBeInTheDocument();

		expect(getByTestId('header-item-name')).toBeInTheDocument();
		expect(getByTestId('header-item-userName')).toBeInTheDocument();
		expect(getByTestId('header-item-role')).toBeInTheDocument();
		expect(getByTestId('header-item-activationStatus')).toBeInTheDocument();
		expect(getByTestId('header-item-createdOn')).toBeInTheDocument();
		expect(getByTestId('header-item-actions')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
