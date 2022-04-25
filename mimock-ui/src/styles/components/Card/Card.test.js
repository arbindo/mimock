import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
	let tree;

	it('should render card', async () => {
		tree = await render(
			<Card
				dataTestid='card-test'
				$background={'bg-red-100'}
				$border={'border-2 border-red-500'}
			>
				Hello
			</Card>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('card-test')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
