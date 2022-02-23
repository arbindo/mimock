import React from 'react';
import { render } from '@testing-library/react';
import IconButtonWithLabel from './IconButtonWithLabel';
import { IconButtonWithLabelVariants } from '../../index';

describe('Button', () => {
	let tree;

	it('should render add Button', async () => {
		tree = await render(
			<IconButtonWithLabel
				variant={IconButtonWithLabelVariants.AddButton}
				label='Add'
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('icon-button-with-label')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render clear Button', async () => {
		tree = await render(
			<IconButtonWithLabel
				variant={IconButtonWithLabelVariants.ClearButton}
				label='Clear'
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('icon-button-with-label')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render delete Button', async () => {
		tree = await render(
			<IconButtonWithLabel
				variant={IconButtonWithLabelVariants.DeleteButton}
				label='Delete'
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('icon-button-with-label')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render copy Button', async () => {
		tree = await render(
			<IconButtonWithLabel
				variant={IconButtonWithLabelVariants.CopyButton}
				label='Copy'
			/>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('icon-button-with-label')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render default Button when variant is null', async () => {
		tree = await render(<IconButtonWithLabel label='Default' />);

		const { getByTestId, container } = tree;

		expect(getByTestId('icon-button-with-label')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
