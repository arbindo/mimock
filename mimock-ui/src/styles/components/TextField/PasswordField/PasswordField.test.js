import React from 'react';
import { render } from '@testing-library/react';
import PasswordField from './PasswordField';

describe('Password', () => {
	let tree;

	it('should render password text field', async () => {
		tree = await render(
			<PasswordField
				dataTestid='login-password-input'
				placeholder='password'
				required
				autoComplete='off'
				value='password'
				onChangeHandler={() => {
					console.log('Change handler');
				}}
				onBlurHandler={() => {
					console.log('Blur handler');
				}}
				onFocusHandler={() => {
					console.log('Focus handler');
				}}
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('login-password-input')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	// it('should show password', async () => {
	// 	tree = await render(
	// 		<PasswordField
	// 			dataTestid='password-textfield'
	// 			errorLabel='Password is required'
	// 			isError={false}
	// 			value='password'
	// 			onChangeHandler={() => {
	// 				console.log('Change handler');
	// 			}}
	// 			onBlurHandler={() => {
	// 				console.log('Blur handler');
	// 			}}
	// 			onFocusHandler={() => {
	// 				console.log('Focus handler');
	// 			}}
	// 		/>
	// 	);

	// 	const { getByTestId, container } = tree;
	// 	const passwordInput = getByTestId('outlined-password-input');
	// 	const showPasswordButton = getByTestId('show-password-icon');
	// 	expect(passwordInput).toBeInTheDocument();
	// 	expect(showPasswordButton).toBeInTheDocument();

	// 	act(() => {
	// 		fireEvent.click(showPasswordButton);
	// 	});

	// 	expect(getByTestId('password-textfield')).toBeInTheDocument();
	// 	expect(passwordInput.children[0].type).toStrictEqual('text');
	// 	expect(container).toMatchSnapshot();
	// });
});
