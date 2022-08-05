import React from 'react';
import { render } from '@testing-library/react';
import ErrorAlert from './ErrorAlert';

describe('ErrorAlert', () => {
	it('renders alert without error message', () => {
		const { container, getByTestId, getByText } = render(
			<ErrorAlert
				title='Error'
				subTitle='Error occurred'
				dataTestId='error-1'
			/>
		);

		expect(getByTestId('error-1')).toBeInTheDocument();
		expect(getByText('Error')).toBeInTheDocument();
		expect(getByText('Error occurred')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('renders alert with error message', () => {
		const { container, getByTestId, getByText } = render(
			<ErrorAlert
				title='Error'
				subTitle='Error occurred'
				dataTestId='error-1'
				message='Server is down'
			/>
		);

		expect(getByTestId('error-1')).toBeInTheDocument();
		expect(getByText('Error')).toBeInTheDocument();
		expect(getByText('Error occurred')).toBeInTheDocument();
		expect(getByText(/Server is down/)).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
