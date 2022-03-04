import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';

describe('Default Button', () => {
	let tree;

	it('should render red Button', async () => {
		tree = await render(
			<Button
				dataTestid='default-button-test-1'
				color={'text-red-800'}
				width='w-5/6'
				background={'bg-red-300'}
				label='Cancel'
				onclickHandler={() => {
					console.log('Clicked cancel button');
				}}
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('default-button-test-1')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render dark red Button', async () => {
		tree = await render(
			<Button
				dataTestid='default-button-test-2'
				color={'text-white'}
				background={'bg-red-600'}
				label='Cancel'
				onclickHandler={() => {
					console.log('Clicked cancel button');
				}}
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('default-button-test-2')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render green Button', async () => {
		tree = await render(
			<Button
				dataTestid='default-button-test-3'
				color={'text-lime-700'}
				background={'bg-green-300'}
				width='w-5/6'
				label='Success'
				onclickHandler={() => {
					console.log('Clicked success button');
				}}
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('default-button-test-3')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render dark green Button', async () => {
		tree = await render(
			<Button
				dataTestid='default-button-test-4'
				color={'text-white'}
				background={'bg-green-500'}
				label='Success'
				onclickHandler={() => {
					console.log('Clicked success button');
				}}
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('default-button-test-4')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render blue Button', async () => {
		tree = await render(
			<Button
				dataTestid='default-button-test-5'
				color={'text-white'}
				background={'bg-blue-600'}
				width='w-5/6'
				label='Primary'
				onclickHandler={() => {
					console.log('Clicked primary button');
				}}
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('default-button-test-5')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render teal Button', async () => {
		tree = await render(
			<Button
				dataTestid='default-button-test-6'
				color={'text-white'}
				background={'bg-teal-400'}
				width='w-5/6'
				label='Login'
				onclickHandler={() => {
					console.log('Clicked login button');
				}}
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('default-button-test-6')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render default button when variant is null', async () => {
		tree = await render(
			<Button
				dataTestid='default-button-test-7'
				label='Primary'
				onclickHandler={() => {
					console.log('Clicked default button');
				}}
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('default-button-test-7')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
