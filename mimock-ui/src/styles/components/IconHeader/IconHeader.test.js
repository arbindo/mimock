import React from 'react';
import { render } from '@testing-library/react';
import { FaHome } from 'react-icons/fa';
import IconHeader from './IconHeader';

describe('IconHeader', () => {
	it('should render icon header component', async () => {
		const { getByTestId, container } = await render(
			<IconHeader icon={<FaHome />} title='Home' dataTestId='home-header' />
		);

		expect(getByTestId('home-header')).toBeInTheDocument();
		expect(getByTestId('home-header')).toHaveTextContent('Home');

		expect(container).toMatchSnapshot();
	});
});
