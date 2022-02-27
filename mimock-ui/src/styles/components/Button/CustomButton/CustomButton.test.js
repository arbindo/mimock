import React from 'react';
import { render } from '@testing-library/react';
import CustomButton from './CustomButton';

describe('Button', () => {
	let tree;

	it('should render custom button with color and bgcolor', async () => {
		tree = await render(
			<CustomButton
				color='text-yellow-700'
				background='bg-yellow-300'
				label='Custom button'
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('custom-button')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render custom button without any props', async () => {
		tree = await render(<CustomButton label='Hello' />);

		const { getByTestId, container } = tree;

		expect(getByTestId('custom-button')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
