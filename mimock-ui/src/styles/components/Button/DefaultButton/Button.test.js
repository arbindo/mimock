import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';
import { ButtonVariants } from '../index';

describe('Button', () => {
	let tree;

	it('should render red Button', async () => {
		tree = await render(
			<Button variant={ButtonVariants.RedButton} label='Cancel' />
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('button')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render dark red Button', async () => {
		tree = await render(
			<Button variant={ButtonVariants.DarkRedButton} label='Cancel' />
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('button')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render green Button', async () => {
		tree = await render(
			<Button variant={ButtonVariants.GreenButton} label='Success' />
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('button')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render dark green Button', async () => {
		tree = await render(
			<Button variant={ButtonVariants.DarkGreenButton} label='Success' />
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('button')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render blue Button', async () => {
		tree = await render(
			<Button variant={ButtonVariants.BlueButton} label='Primary' />
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('button')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render teal Button', async () => {
		tree = await render(
			<Button variant={ButtonVariants.TealButton} label='Login' />
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
