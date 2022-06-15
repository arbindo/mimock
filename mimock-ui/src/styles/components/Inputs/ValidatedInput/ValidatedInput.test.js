import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import ValidatedInput from './ValidatedInput';

describe('ValidatedInput', () => {
	it('should render text input without error', async () => {
		let tree;
		await act(async () => {
			tree = await render(
				<ValidatedInput
					name='text'
					dataTestId='text-input'
					placeHolder='Enter text'
					register={{}}
				/>
			);
		});

		const { getByTestId, queryByTestId, container } = tree;

		expect(getByTestId('text-input')).toBeInTheDocument();
		expect(queryByTestId('input-error-text')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should render password input without error', async () => {
		let tree;
		await act(async () => {
			tree = await render(
				<ValidatedInput
					type='password'
					name='password'
					dataTestId='password-input'
					placeHolder='Enter password'
					register={{}}
				/>
			);
		});

		const { getByTestId, queryByTestId, container } = tree;

		expect(getByTestId('password-input')).toBeInTheDocument();
		expect(queryByTestId('input-error-password')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should render text input with error', async () => {
		let tree;
		await act(async () => {
			tree = await render(
				<ValidatedInput
					name='text'
					dataTestId='text-input'
					placeHolder='Enter text'
					register={{}}
					error={true}
					errorMessage='Text is invalid'
				/>
			);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('text-input')).toBeInTheDocument();
		expect(getByTestId('input-error-text')).toHaveTextContent(
			'Text is invalid'
		);

		expect(container).toMatchSnapshot();
	});

	it('should accept input on triggering change event', async () => {
		let tree;
		await act(async () => {
			tree = await render(
				<ValidatedInput
					name='text'
					dataTestId='text-input'
					placeHolder='Enter text'
					register={{}}
				/>
			);
		});

		const { getByTestId, queryByTestId, container } = tree;

		await act(async () => {
			fireEvent.change(getByTestId('text-input'), {
				target: { value: 'test' },
			});
		});

		expect(getByTestId('text-input')).toHaveValue('test');
		expect(queryByTestId('input-error-text')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
