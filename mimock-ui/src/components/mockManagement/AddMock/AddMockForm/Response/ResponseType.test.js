import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getResponseTypes } from 'services/staticRecords/getResponseContentTypes.service';
import ResponseType from './ResponseType';

jest.mock('services/staticRecords/getResponseContentTypes.service');

describe('ResponseType', () => {
	it('should render response types', async () => {
		getResponseTypes.mockResolvedValue({
			TEXTUAL_RESPONSE: ['text/plain', 'text/html'],
			BINARY_RESPONSE: ['application/octet-stream', 'application/pdf'],
		});

		let tree;

		await act(async () => {
			tree = render(
				<ResponseType
					type='TEXTUAL_RESPONSE'
					responseContentType='text/plain'
					setResponseContentType={jest.fn()}
				/>
			);
		});

		const { getByTestId, container, getByRole } = tree;

		expect(getByTestId('response-type-wrapper')).toBeInTheDocument();
		expect(getByTestId('response-type-label')).toHaveTextContent(
			'Response Type'
		);
		expect(getByRole('textbox')).toHaveValue('text/plain');

		expect(container).toMatchSnapshot();
	});

	it('should change response type', async () => {
		getResponseTypes.mockResolvedValue({
			TEXTUAL_RESPONSE: ['text/plain', 'text/html'],
			BINARY_RESPONSE: ['application/octet-stream', 'application/pdf'],
		});

		let tree;

		await act(async () => {
			tree = render(
				<ResponseType
					type='BINARY_RESPONSE'
					responseContentType='text/plain'
					setResponseContentType={jest.fn()}
				/>
			);
		});

		const { getByTestId, container, getByRole } = tree;

		expect(getByTestId('response-type-wrapper')).toBeInTheDocument();
		expect(getByTestId('response-type-label')).toHaveTextContent(
			'Response Type'
		);
		expect(getByTestId('response-type-autocomplete')).toBeInTheDocument();
		const autoComplete = getByRole('textbox');
		expect(autoComplete).toHaveValue('application/octet-stream');

		await act(async () => {
			fireEvent.click(autoComplete);
			userEvent.type(autoComplete, 'application/pdf');
			fireEvent.change(autoComplete, {
				target: {
					value: 'application/pdf',
				},
			});
		});

		expect(autoComplete).toHaveValue('application/pdf');

		expect(container).toMatchSnapshot();
	});
});
