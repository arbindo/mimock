import React from 'react';
import { render } from '@testing-library/react';
import Pill from './Pill';

describe('Button', () => {
	let tree;

	it('should render red pill', async () => {
		tree = await render(
			<Pill
				color={'text-red-500'}
				background={'bg-red-100'}
				border={'border-red-500'}
				label='Cancel'
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('pill')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render green pill', async () => {
		tree = await render(
			<Pill
				color={'text-green-500'}
				background={'bg-green-100'}
				border={'border-green-500'}
				label='Success'
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('pill')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render yellow pill', async () => {
		tree = await render(
			<Pill
				color={'text-yellow-500'}
				background={'bg-yellow-100'}
				border={'border-yellow-500'}
				label='Warning'
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('pill')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render default pill without variant', async () => {
		tree = await render(<Pill label='Default' />);

		const { getByTestId, container } = tree;

		expect(getByTestId('pill')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
