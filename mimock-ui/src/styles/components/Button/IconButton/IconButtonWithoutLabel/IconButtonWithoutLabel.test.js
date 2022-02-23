import React from 'react';
import { render } from '@testing-library/react';
import IconButtonWithoutLabel from './IconButtonWithoutLabel';
import { IconButtonVariants } from '../../index';

describe('Button', () => {
	let tree;

	it('should render add Button', async () => {
		tree = await render(
			<IconButtonWithoutLabel variant={IconButtonVariants.AddButton} />
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('icon-button-without-label')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render clear Button', async () => {
		tree = await render(
			<IconButtonWithoutLabel variant={IconButtonVariants.ClearButton} />
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('icon-button-without-label')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render delete Button', async () => {
		tree = await render(
			<IconButtonWithoutLabel variant={IconButtonVariants.DeleteButton} />
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('icon-button-without-label')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render copy Button', async () => {
		tree = await render(
			<IconButtonWithoutLabel variant={IconButtonVariants.CopyButton} />
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
