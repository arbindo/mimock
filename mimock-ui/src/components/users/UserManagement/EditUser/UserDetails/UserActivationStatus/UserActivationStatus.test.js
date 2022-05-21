import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import UserActivationStatus from './UserActivationStatus';

describe('UserActivationStatus', () => {
	it('should render UserActivationStatus when user status is active', async () => {
		let tree;
		await act(async () => {
			tree = render(<UserActivationStatus isUserActive={true} />);
		});

		const { getByTestId, container, getByRole } = tree;

		expect(getByTestId('edit-user-activation-status')).toBeInTheDocument();
		expect(getByTestId('activation-switch')).toBeInTheDocument();
		expect(getByRole('checkbox').checked).toBe(true);
		expect(getByTestId('activation-status-label')).toHaveTextContent('Active');

		expect(container).toMatchSnapshot();
	});

	it('should render UserActivationStatus when user status is inactive', async () => {
		let tree;
		await act(async () => {
			tree = render(<UserActivationStatus isUserActive={false} />);
		});

		const { getByTestId, container, getByRole } = tree;

		expect(getByTestId('edit-user-activation-status')).toBeInTheDocument();
		expect(getByTestId('activation-switch')).toBeInTheDocument();
		expect(getByRole('checkbox').checked).toBe(false);
		expect(getByTestId('activation-status-label')).toHaveTextContent(
			'Inactive'
		);

		expect(container).toMatchSnapshot();
	});

	it('should update status on clicking switch', async () => {
		let tree;
		await act(async () => {
			tree = render(<UserActivationStatus isUserActive={false} />);
		});

		const { getByTestId, container, getByRole } = tree;

		expect(getByTestId('edit-user-activation-status')).toBeInTheDocument();
		expect(getByRole('checkbox').checked).toBe(false);
		expect(getByTestId('activation-status-label')).toHaveTextContent(
			'Inactive'
		);

		await act(async () => {
			fireEvent.click(getByRole('checkbox'));
		});
		expect(getByRole('checkbox').checked).toBe(true);
		expect(getByTestId('activation-status-label')).toHaveTextContent('Active');

		expect(container).toMatchSnapshot();
	});
});
