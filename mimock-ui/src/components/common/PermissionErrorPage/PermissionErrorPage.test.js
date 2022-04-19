import React from 'react';
import PermissionErrorPage from './PermissionErrorPage.jsx';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('PermissionErrorPage', () => {
	it('should render PermissionErrorPage', async () => {
		const { getByTestId, container } = await render(
			<BrowserRouter>
				<PermissionErrorPage />
			</BrowserRouter>
		);

		expect(getByTestId('permission-error-page')).toBeInTheDocument();
		expect(getByTestId('permission-error-label')).toBeInTheDocument();
		expect(getByTestId('permission-error-home-link')).toBeInTheDocument();
		expect(getByTestId('permission-error-home-link').textContent).toBe(
			'Go back to Dashboard'
		);
		expect(getByTestId('permission-error-label').textContent).toBe(
			'User not permitted to perform the action'
		);

		expect(container).toMatchSnapshot();
	});
});
