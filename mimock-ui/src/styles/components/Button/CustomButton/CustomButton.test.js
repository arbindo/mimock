import React from 'react';
import { render } from '@testing-library/react';
import CustomButton from './CustomButton';

describe('Custom Button', () => {
	let tree;

	it('should render custom button with color and bgcolor', async () => {
		tree = await render(
			<CustomButton
				dataTestid='custom-button-test-1'
				$color='text-yellow-700'
				$background='bg-yellow-300'
				$width='w-5/6'
				label='Custom button'
				onclickHandler={() => {
					console.log('Clicked custom button');
				}}
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('custom-button-test-1')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render custom button without any props', async () => {
		tree = await render(
			<CustomButton
				dataTestid='custom-button-test-2'
				label='Hello'
				onclickHandler={() => {
					console.log('Clicked custom button');
				}}
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('custom-button-test-2')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
