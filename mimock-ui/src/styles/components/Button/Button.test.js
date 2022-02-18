import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
	let tree;

	it('should render Button', async () => {
		tree = await render(
			<Button label='Button' color='text-white' bgcolor='bg-black-100' />
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('button')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render Button without style props', async () => {
		tree = await render(<Button label='Button' />);

		const { getByTestId, container } = tree;

		expect(getByTestId('button')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
