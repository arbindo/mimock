import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import PasswordField from './Password';

describe('Button', () => {
	let tree;

	it('should render password text field', async () => {
		tree = await render(<PasswordField />);

		const { getByTestId, container } = tree;

		expect(getByTestId('password-textfield')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should enter password', async () => {
		tree = await render(<PasswordField />);

		const { getByTestId } = tree;
		const passwordInput = getByTestId('outlined-password-input');
		expect(passwordInput).toBeInTheDocument();

		act(() => {
			fireEvent.change(document.getElementById('outlined-adornment-password'), {
				target: { value: 'mimock' },
			});
		});

		expect(passwordInput.children[0].value).toStrictEqual('mimock');
		expect(passwordInput).toMatchSnapshot();
	});

	it('should show password', async () => {
		tree = await render(<PasswordField />);

		const { getByTestId } = tree;
		const passwordInput = getByTestId('outlined-password-input');
		const showPasswordButton = getByTestId('show-password-icon');
		expect(passwordInput).toBeInTheDocument();
		expect(showPasswordButton).toBeInTheDocument();

		act(() => {
			fireEvent.change(document.getElementById('outlined-adornment-password'), {
				target: { value: 'mimock' },
			});
		});

		act(() => {
			fireEvent.click(showPasswordButton);
		});

		expect(passwordInput.children[0].value).toStrictEqual('mimock');
		expect(passwordInput.children[0].type).toStrictEqual('text');
		expect(passwordInput).toMatchSnapshot();
	});
});
