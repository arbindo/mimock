import React from 'react';
import { render } from '@testing-library/react';
import IconButtonWithoutLabel from './IconButtonWithoutLabel';

describe('Icon Button Without Label', () => {
	let tree;

	it('should render add Button', async () => {
		tree = await render(
			<IconButtonWithoutLabel
				dataTestid='icon-without-label-button-test-1'
				$background={'bg-green-300'}
				$color={'text-lime-700'}
				onclickHandler={() => {
					console.log('Clicked add icon button');
				}}
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('icon-without-label-button-test-1')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render clear Button', async () => {
		tree = await render(
			<IconButtonWithoutLabel
				dataTestid='icon-without-label-button-test-2'
				$background={'bg-red-300'}
				$color={'text-red-800'}
				onclickHandler={() => {
					console.log('Clicked clear icon button');
				}}
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('icon-without-label-button-test-2')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render delete Button', async () => {
		tree = await render(
			<IconButtonWithoutLabel
				dataTestid='icon-without-label-button-test-3'
				$background={'bg-red-600'}
				$color={'text-white'}
				onclickHandler={() => {
					console.log('Clicked delete icon button');
				}}
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('icon-without-label-button-test-3')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render copy Button', async () => {
		tree = await render(
			<IconButtonWithoutLabel
				dataTestid='icon-without-label-button-test-4'
				$background={'bg-blue-600'}
				$color={'text-white'}
				onclickHandler={() => {
					console.log('Clicked copy icon button');
				}}
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('icon-without-label-button-test-4')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render default Button when variant is null', async () => {
		tree = await render(
			<IconButtonWithoutLabel
				dataTestid='icon-without-label-button-test-5'
				onclickHandler={() => {
					console.log('Clicked default icon button');
				}}
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('icon-without-label-button-test-5')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
