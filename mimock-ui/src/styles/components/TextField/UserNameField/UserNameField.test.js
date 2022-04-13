import React from 'react';
import { render } from '@testing-library/react';
import UserNameField from './UserNameField';

describe('Text Field', () => {
	let tree;

	it('should render basic text field', async () => {
		tree = await render(
			<UserNameField
				dataTestid='login-username-input'
				placeholder='username'
				required
				autoComplete='off'
				value='username'
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

		expect(getByTestId('login-username-input')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
