import React from 'react';
import ConfirmationModal from './ConfirmationModal';
import { render, act, fireEvent } from '@testing-library/react';

describe('ConfirmationModal', () => {
	const mockCancel = jest.fn();
	const mockConfirm = jest.fn();
	const title = 'Are you sure you want to do this?';

	it('Should render confirmation modal with default props', async () => {
		let tree;
		await act(async () => {
			tree = await render(
				<ConfirmationModal onConfirm={mockConfirm} onCancel={mockCancel} />
			);
		});

		const { getByTestId } = tree;

		expect(getByTestId('confirmation-modal')).toBeInTheDocument();

		expect(getByTestId('confirmation-modal-message')).toBeInTheDocument();
		expect(getByTestId('confirmation-modal-message').textContent).toBe(
			'Are you sure you want proceed with this action?'
		);

		expect(getByTestId('confirmation-modal-cancel-btn')).toBeInTheDocument();
		expect(getByTestId('confirmation-modal-cancel-btn').textContent).toBe(
			'Cancel'
		);

		expect(getByTestId('confirmation-modal-confirm-btn')).toBeInTheDocument();
		expect(getByTestId('confirmation-modal-confirm-btn').textContent).toBe(
			'Confirm'
		);

		expect(document.body).toMatchSnapshot();
	});

	it('Should render confirmation modal with passed props', async () => {
		let tree;
		await act(async () => {
			tree = await render(
				<ConfirmationModal
					message={title}
					onConfirm={mockConfirm}
					onCancel={mockCancel}
					cancelButtonLabel={'No'}
					confirmButtonLabel={'Yes'}
				/>
			);
		});

		const { getByTestId } = tree;

		expect(getByTestId('confirmation-modal')).toBeInTheDocument();

		expect(getByTestId('confirmation-modal-message')).toBeInTheDocument();
		expect(getByTestId('confirmation-modal-message').textContent).toBe(title);

		expect(getByTestId('confirmation-modal-cancel-btn')).toBeInTheDocument();
		expect(getByTestId('confirmation-modal-cancel-btn').textContent).toBe('No');

		expect(getByTestId('confirmation-modal-confirm-btn')).toBeInTheDocument();
		expect(getByTestId('confirmation-modal-confirm-btn').textContent).toBe(
			'Yes'
		);

		expect(document.body).toMatchSnapshot();
	});

	it('Should trigger cancel event on clicking cancel button', async () => {
		let tree;
		await act(async () => {
			tree = await render(
				<ConfirmationModal
					message={title}
					onConfirm={mockConfirm}
					onCancel={mockCancel}
					cancelButtonLabel={'No'}
					confirmButtonLabel={'Yes'}
				/>
			);
		});

		const { getByTestId } = tree;

		expect(getByTestId('confirmation-modal')).toBeInTheDocument();

		expect(getByTestId('confirmation-modal-message')).toBeInTheDocument();
		expect(getByTestId('confirmation-modal-message').textContent).toBe(title);

		const cancelButton = getByTestId('confirmation-modal-cancel-btn');
		expect(cancelButton).toBeInTheDocument();
		expect(cancelButton.textContent).toBe('No');
		await fireEvent.click(cancelButton);
		expect(mockCancel).toHaveBeenCalledTimes(1);

		expect(document.body).toMatchSnapshot();
	});

	it('Should trigger confirm event on clicking confirm button', async () => {
		let tree;
		await act(async () => {
			tree = await render(
				<ConfirmationModal
					message={title}
					onConfirm={mockConfirm}
					onCancel={mockCancel}
					cancelButtonLabel={'No'}
					confirmButtonLabel={'Yes'}
				/>
			);
		});

		const { getByTestId } = tree;

		expect(getByTestId('confirmation-modal')).toBeInTheDocument();

		expect(getByTestId('confirmation-modal-message')).toBeInTheDocument();
		expect(getByTestId('confirmation-modal-message').textContent).toBe(title);

		const confirmButton = getByTestId('confirmation-modal-confirm-btn');
		expect(confirmButton).toBeInTheDocument();
		expect(confirmButton.textContent).toBe('Yes');
		await fireEvent.click(confirmButton);
		expect(mockConfirm).toHaveBeenCalledTimes(1);

		expect(document.body).toMatchSnapshot();
	});
});
