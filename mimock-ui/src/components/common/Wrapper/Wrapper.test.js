import React from 'react';
import { render } from '@testing-library/react';
import Wrapper from './Wrapper';

jest.mock('react-router-dom');

describe('Wrapper', () => {
	it('should render wrapper', async () => {
		const { getByTestId, container } = await render(
			<Wrapper>
				<div data-testid='wrapped-component'>Wrapped child</div>
			</Wrapper>
		);

		expect(getByTestId('wrapped-component')).toBeInTheDocument();
		expect(getByTestId('header')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
