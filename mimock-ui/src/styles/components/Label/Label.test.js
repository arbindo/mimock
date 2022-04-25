import React from 'react';
import { render } from '@testing-library/react';
import Label from './Label';

describe('Label', () => {
	let tree;

	it('should render label', async () => {
		tree = await render(
			<Label dataTestid='label-test' label='Username'></Label>
		);

		const { getByTestId, container } = tree;

		expect(getByTestId('label-test')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
