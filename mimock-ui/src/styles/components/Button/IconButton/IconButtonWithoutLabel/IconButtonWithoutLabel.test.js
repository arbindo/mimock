import React from 'react';
import { render } from '@testing-library/react';
import IconButtonWithoutLabel from './IconButtonWithoutLabel';

describe('Button', () => {
	let tree;

	it('should render add Button', async () => {
		tree = await render(
			<IconButtonWithoutLabel
				background={'bg-green-300'}
				color={'text-lime-700'}
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('icon-button-without-label')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render clear Button', async () => {
		tree = await render(
			<IconButtonWithoutLabel
				background={'bg-red-300'}
				color={'text-red-800'}
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('icon-button-without-label')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render delete Button', async () => {
		tree = await render(
			<IconButtonWithoutLabel background={'bg-red-600'} color={'text-white'} />
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('icon-button-without-label')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render copy Button', async () => {
		tree = await render(
			<IconButtonWithoutLabel background={'bg-blue-600'} color={'text-white'} />
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('icon-button-without-label')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render default Button when variant is null', async () => {
		tree = await render(<IconButtonWithoutLabel />);

		const { getByTestId, container } = tree;

		expect(getByTestId('icon-button-without-label')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
