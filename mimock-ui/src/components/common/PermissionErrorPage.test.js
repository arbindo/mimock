import React from 'react';
import PermissionErrorPage from './PermissionErrorPage.jsx';
import { render } from '@testing-library/react';

describe('PermissionErrorPage', () => {
	it('should render PermissionErrorPage', async () => {
		const { getByTestId, container } = await render(<PermissionErrorPage />);

		expect(getByTestId('permission-error-page')).toBeInTheDocument();
		expect(getByTestId('permission-error-label')).toBeInTheDocument();
		expect(getByTestId('permission-error-label').textContent).toBe(
			'User not permitted to perform the action'
		);

		expect(container).toMatchSnapshot();
	});
});
