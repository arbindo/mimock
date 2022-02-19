import React from 'react';
import { render } from '@testing-library/react';
import Pill from './Pill';
import { PillVariants } from './index';

describe('Button', () => {
	let tree;

	it('should render red pill', async () => {
		tree = await render(<Pill variant={PillVariants.RedPill} label='Cancel' />);

		const { getByTestId, container } = tree;

		expect(getByTestId('pill')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render green pill', async () => {
		tree = await render(
			<Pill variant={PillVariants.GreenPill} label='Success' />
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('pill')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render yellow pill', async () => {
		tree = await render(
			<Pill variant={PillVariants.YellowPill} label='Warning' />
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
