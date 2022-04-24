import React from 'react';
import { render } from '@testing-library/react';
import MockCard from './MockCard';

describe('MockCard', () => {
	it('should render mock card component', async () => {
		const tree = await render(<MockCard />);

		const { container, getByTestId } = tree;

		expect(getByTestId('card')).toBeInTheDocument();
		expect(getByTestId('card-title')).toBeInTheDocument();
		expect(getByTestId('card-subtitle')).toBeInTheDocument();
		expect(getByTestId('card-badge')).toBeInTheDocument();
		expect(getByTestId('card-link')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
