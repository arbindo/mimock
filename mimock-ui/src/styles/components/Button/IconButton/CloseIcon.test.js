import React from 'react';
import { render } from '@testing-library/react';
import CloseIcon from './CloseIcon';
describe('Close Icon Button', () => {
	let tree;

	it('should render close icon button', async () => {
		tree = await render(<CloseIcon />);

		const { getByTestId, container } = tree;

		expect(getByTestId('close-icon-button')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
