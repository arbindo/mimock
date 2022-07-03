import React from 'react';
import { act, render } from '@testing-library/react';
import TextInput from './TextInput';

describe('TextInput', () => {
	it('should render text input', async () => {
		let tree;
		await act(async () => {
			tree = await render(
				<TextInput
					name='text'
					dataTestId='text-input'
					placeHolder='Enter text'
				/>
			);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('text-input')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should accept input with value', async () => {
		let tree;
		await act(async () => {
			tree = await render(
				<TextInput
					name='text'
					dataTestId='text-input'
					placeHolder='Enter text'
					value='test'
				/>
			);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('text-input')).toHaveValue('test');

		expect(container).toMatchSnapshot();
	});
});
