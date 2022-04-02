import React from 'react';
import { render } from '@testing-library/react';
import Pill from './Pill';

describe('Pill', () => {
	let tree;

	it('should render red pill', async () => {
		tree = await render(
			<Pill
				dataTestid='pill-test-1'
				$color={'text-red-500'}
				$background={'bg-red-100'}
				$border={'border-red-500'}
				label='Cancel'
				onclickHandler={() => {
					console.log('Clicked cancel pill');
				}}
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('pill-test-1')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render green pill', async () => {
		tree = await render(
			<Pill
				dataTestid='pill-test-2'
				$color={'text-green-500'}
				$background={'bg-green-100'}
				$border={'border-green-500'}
				label='Success'
				onclickHandler={() => {
					console.log('Clicked success pill');
				}}
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('pill-test-2')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render yellow pill', async () => {
		tree = await render(
			<Pill
				dataTestid='pill-test-3'
				$color={'text-yellow-500'}
				$background={'bg-yellow-100'}
				$border={'border-yellow-500'}
				label='Warning'
				onclickHandler={() => {
					console.log('Clicked warning pill');
				}}
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('pill-test-3')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render default pill without variant', async () => {
		tree = await render(
			<Pill
				dataTestid='pill-test-4'
				label='Default'
				onclickHandler={() => {
					console.log('Clicked default pill');
				}}
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('pill-test-4')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
