import React from 'react';
import { render } from '@testing-library/react';
import TextField from './TextField';

describe('Text Field', () => {
	let tree;

	it('should render basic text field', async () => {
		tree = await render(
			<TextField
				label='username'
				dataTestid='text-field'
				errorLabel='Username is required'
				isError={false}
				inputValue='Username'
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

		expect(getByTestId('text-field')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
