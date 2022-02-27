import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
	let tree;

	it('should render red Button', async () => {
		tree = await render(
			<Button color={'text-red-800'} background={'bg-red-300'} label='Cancel' />
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('button')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render dark red Button', async () => {
		tree = await render(
			<Button color={'text-white'} background={'bg-red-600'} label='Cancel' />
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('button')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render green Button', async () => {
		tree = await render(
			<Button
				color={'text-lime-700'}
				background={'bg-green-300'}
				label='Success'
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('button')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render dark green Button', async () => {
		tree = await render(
			<Button
				color={'text-white'}
				background={'bg-green-500'}
				label='Success'
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('button')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render blue Button', async () => {
		tree = await render(
			<Button color={'text-white'} background={'bg-blue-600'} label='Primary' />
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('button')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render teal Button', async () => {
		tree = await render(
			<Button color={'text-white'} background={'bg-teal-400'} label='Login' />
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('button')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render default button when variant is null', async () => {
		tree = await render(<Button label='Primary' />);

		const { getByTestId, container } = tree;

		expect(getByTestId('button')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
