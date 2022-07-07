import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import { useRecoilState } from 'recoil';
import { getResponseTypes } from 'services/staticRecords/getResponseContentTypes.service';
import Response from './Response';

let mockedRecoilFn = jest.fn();
jest.mock('recoil');
jest.mock('services/staticRecords/getResponseContentTypes.service');

describe('Response', () => {
	beforeEach(() => {
		getResponseTypes.mockResolvedValue({
			TEXTUAL_RESPONSE: ['text/plain', 'text/html'],
			BINARY_RESPONSE: ['application/octet-stream', 'application/pdf'],
		});

		useRecoilState.mockImplementation(() => {
			return [
				{
					name: 'Tester',
					responseType: 'TEXTUAL_RESPONSE',
					responseContentType: 'application/json',
					expectedTextResponse: '',
					binaryFile: null,
				},
				mockedRecoilFn,
			];
		});
	});

	it('should render response when text response is selected', async () => {
		let tree;
		await act(async () => {
			tree = render(<Response />);
		});

		const { getByTestId, container, queryByTestId } = tree;

		expect(getByTestId('response-wrapper')).toBeInTheDocument();
		expect(getByTestId('response-type-radio')).toBeInTheDocument();
		expect(getByTestId('response-type-wrapper')).toBeInTheDocument();
		expect(getByTestId('text-response')).toBeInTheDocument();
		expect(queryByTestId('file-upload')).not.toBeInTheDocument();
		expect(queryByTestId('success-prompt')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should render response when binary response is selected', async () => {
		useRecoilState.mockImplementation(() => {
			return [
				{
					name: 'Tester',
					responseType: 'BINARY_RESPONSE',
					responseContentType: 'application/pdf',
					expectedTextResponse: '',
					binaryFile: null,
				},
				mockedRecoilFn,
			];
		});

		let tree;
		await act(async () => {
			tree = render(<Response />);
		});

		const { getByTestId, container, queryByTestId } = tree;

		expect(getByTestId('response-wrapper')).toBeInTheDocument();
		expect(getByTestId('response-type-radio')).toBeInTheDocument();
		expect(getByTestId('response-type-wrapper')).toBeInTheDocument();
		expect(getByTestId('file-upload')).toBeInTheDocument();
		expect(queryByTestId('text-response')).not.toBeInTheDocument();
		expect(queryByTestId('success-prompt')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should switch response type', async () => {
		let tree;
		await act(async () => {
			tree = render(<Response />);
		});

		const { getByTestId, container, queryByTestId, getByRole } = tree;

		expect(getByTestId('response-wrapper')).toBeInTheDocument();
		expect(getByTestId('response-type-wrapper')).toBeInTheDocument();
		expect(getByTestId('text-response')).toBeInTheDocument();
		expect(queryByTestId('file-upload')).not.toBeInTheDocument();
		expect(queryByTestId('success-prompt')).not.toBeInTheDocument();

		expect(getByTestId('response-type-radio')).toBeInTheDocument();

		let radioButton;
		radioButton = getByRole('radio', { name: 'Binary Response' });
		await act(async () => {
			fireEvent.click(radioButton);
		});
		expect(radioButton.value).toBe('BINARY_RESPONSE');
		expect(queryByTestId('text-response')).not.toBeInTheDocument();

		radioButton = getByRole('radio', { name: 'Text Response' });
		await act(async () => {
			fireEvent.click(radioButton);
		});
		expect(radioButton.value).toBe('TEXTUAL_RESPONSE');
		expect(queryByTestId('file-upload')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should enter text response and save response', async () => {
		let tree;
		await act(async () => {
			tree = render(<Response />);
		});

		const { getByTestId, container, queryByTestId } = tree;

		expect(getByTestId('response-wrapper')).toBeInTheDocument();
		expect(getByTestId('response-type-wrapper')).toBeInTheDocument();

		expect(queryByTestId('file-upload')).not.toBeInTheDocument();
		expect(queryByTestId('success-prompt')).not.toBeInTheDocument();

		expect(getByTestId('response-type-radio')).toBeInTheDocument();

		await act(async () => {
			fireEvent.change(getByTestId('text-response'), {
				target: { value: 'This is a test response' },
			});
		});

		expect(getByTestId('text-response').value).toBe('This is a test response');

		await act(async () => {
			fireEvent.click(getByTestId('save-response-button'));
		});

		expect(mockedRecoilFn).toHaveBeenCalledWith({
			name: 'Tester',
			responseType: 'TEXTUAL_RESPONSE',
			responseContentType: 'text/plain',
			expectedTextResponse: 'This is a test response',
			binaryFile: '',
		});

		expect(container).toMatchSnapshot();
	});

	it('should upload file and save response', async () => {
		const file = new File(['file'], 'ping.png', {
			type: 'image/png',
		});
		useRecoilState.mockImplementation(() => {
			return [
				{
					name: 'Tester',
					responseType: 'BINARY_RESPONSE',
					responseContentType: 'image/png',
					expectedTextResponse: '',
					binaryFile: null,
				},
				mockedRecoilFn,
			];
		});

		let tree;
		await act(async () => {
			tree = render(<Response />);
		});

		const { getByTestId, container, queryByTestId, getByRole } = tree;

		expect(getByTestId('response-wrapper')).toBeInTheDocument();
		expect(getByTestId('response-type-wrapper')).toBeInTheDocument();

		expect(getByTestId('file-upload')).toBeInTheDocument();
		expect(queryByTestId('success-prompt')).not.toBeInTheDocument();

		expect(getByTestId('response-type-radio')).toBeInTheDocument();

		const radioButton = getByRole('radio', { name: 'Binary Response' });
		await act(async () => {
			fireEvent.click(radioButton);
		});

		const fileInput = getByTestId('upload-input');
		await act(async () => {
			fireEvent.change(fileInput, { target: { files: [file] } });
		});

		await act(async () => {
			fireEvent.click(getByTestId('save-response-button'));
		});

		expect(mockedRecoilFn).toHaveBeenNthCalledWith(1, {
			binaryFile: file,
			expectedTextResponse: '',
			name: 'Tester',
			responseContentType: 'application/octet-stream',
			responseType: 'BINARY_RESPONSE',
		});

		expect(container).toMatchSnapshot();
	});
});
