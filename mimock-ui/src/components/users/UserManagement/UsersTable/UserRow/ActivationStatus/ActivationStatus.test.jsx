import React from 'react';
import { render, act } from '@testing-library/react';
import ActivationStatus from './ActivationStatus';

describe('ActivationStatus', () => {
	it('should render ActivationStatus when status is true', async () => {
		let tree;
		await act(async () => {
			tree = await render(<ActivationStatus status={true} />);
		});

		const { container, getByTestId } = tree;

		expect(getByTestId('user-activation-status')).toBeInTheDocument();

		expect(getByTestId('status-indicator-true')).toBeInTheDocument();
		expect(getByTestId('status-label-true')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should render ActivationStatus when status is false', async () => {
		let tree;
		await act(async () => {
			tree = await render(<ActivationStatus status={false} />);
		});

		const { container, getByTestId } = tree;

		expect(getByTestId('user-activation-status')).toBeInTheDocument();

		expect(getByTestId('status-indicator-false')).toBeInTheDocument();
		expect(getByTestId('status-label-false')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
