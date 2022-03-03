import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import TextField from './TextField';

describe('Text Field', () => {
	let tree;

	it('should render basic text field', async () => {
		tree = await render(
			<TextField label='username' errorLabel='error' isError={false} />
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('text-field')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should enter text', async () => {
		tree = await render(
			<TextField label='username' errorLabel='error' isError={false} />
		);

		const { getByTestId } = tree;
		const basicTextFieldInput = getByTestId('change-text-field');
		expect(basicTextFieldInput).toBeInTheDocument();

		act(() => {
			fireEvent.change(document.getElementById('component-outlined'), {
				target: { value: 'username' },
			});
		});

		expect(basicTextFieldInput.children[0].value).toStrictEqual('username');
		expect(basicTextFieldInput).toMatchSnapshot();
	});
});
