import React from 'react';
import { render } from '@testing-library/react';
import ContentArea from './ContentArea';

describe('ContentArea', () => {
	it('should render content area component', async () => {
		const tree = await render(<ContentArea />);

		const { container, getByTestId } = tree;

		expect(getByTestId('list-section')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
