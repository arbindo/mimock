import React from 'react';
import { render } from '@testing-library/react';
import Style from './Style.jsx';

describe('Button', () => {
	let tree;

	it('should render style for button and pill', async () => {
		tree = await render(<Style />);

		const { getByTestId, container } = tree;

		expect(getByTestId('style')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
