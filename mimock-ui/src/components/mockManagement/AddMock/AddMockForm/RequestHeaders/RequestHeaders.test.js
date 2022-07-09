import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import { useRecoilState } from 'recoil';
import RequestHeaders from './RequestHeaders';

let mockedRecoilFn = jest.fn();
jest.mock('recoil');
jest.useFakeTimers();

describe('RequestHeaders', () => {
	beforeEach(() => {
		useRecoilState.mockImplementation(() => {
			return [
				{
					name: 'Tester',
					requestHeader: '',
					shouldDoExactHeaderMatching: false,
				},
				mockedRecoilFn,
			];
		});
	});

	it('should render request headers when initial value is empty', async () => {
		let tree;
		await act(async () => {
			tree = await render(<RequestHeaders />);
		});

		const { getByTestId, container, queryByTestId } = tree;

		expect(getByTestId('request-header-wrapper')).toBeInTheDocument();
		expect(getByTestId('view-mode')).toBeInTheDocument();
		expect(getByTestId('header-matching-toggle')).toBeInTheDocument();
		expect(getByTestId('header-match-hint')).toHaveTextContent(
			'Performs a loose comparison and validates only the custom headers configured below while sending a request to the mocked endpoint. Other headers sent in the request will be ignored'
		);

		expect(queryByTestId('no-header')).not.toBeInTheDocument();
		expect(queryByTestId('success-prompt')).not.toBeInTheDocument();

		await act(() => {
			fireEvent.click(getByTestId('add-header-button'));
		});

		await act(() => {
			fireEvent.click(getByTestId('view-mode-code'));
		});

		expect(getByTestId('request-header-text-input')).toHaveValue('');

		await act(() => {
			fireEvent.click(getByTestId('view-mode-text'));
		});

		expect(getByTestId('requestHeader_0_key')).toHaveValue('');
		expect(getByTestId('requestHeader_0_value')).toHaveValue('');

		expect(getByTestId('remove-header-tooltip-0')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should enable exact header matching', async () => {
		let tree;
		await act(async () => {
			tree = await render(<RequestHeaders />);
		});

		const { getByTestId, getByRole, container, rerender } = tree;

		expect(getByTestId('request-header-wrapper')).toBeInTheDocument();
		expect(getByTestId('header-matching-toggle')).toBeInTheDocument();
		expect(getByTestId('header-match-hint')).toHaveTextContent(
			'Performs a loose comparison and validates only the custom headers configured below while sending a request to the mocked endpoint. Other headers sent in the request will be ignored'
		);

		await act(async () => {
			useRecoilState.mockImplementation(() => {
				return [
					{
						name: 'Tester',
						requestHeader: '',
						shouldDoExactHeaderMatching: true,
					},
					mockedRecoilFn,
				];
			});
			await fireEvent.click(getByRole('checkbox'));
			await rerender(<RequestHeaders />);
		});

		expect(mockedRecoilFn).toHaveBeenCalledWith({
			name: 'Tester',
			requestHeader: '',
			shouldDoExactHeaderMatching: true,
		});
		expect(getByRole('checkbox').checked).toBe(true);
		expect(getByTestId('header-match-hint')).toHaveTextContent(
			'Expects all headers to match exactly when sending a request to the mocked endpoint. Do not use this if your client could send additional request headers'
		);

		expect(container).toMatchSnapshot();
	});

	it('should remove request headers on clicking remove button', async () => {
		let tree;
		await act(async () => {
			tree = await render(<RequestHeaders />);
		});

		const { getByTestId, container, queryByTestId } = tree;

		expect(getByTestId('request-header-wrapper')).toBeInTheDocument();
		expect(getByTestId('view-mode')).toBeInTheDocument();
		expect(getByTestId('save-requestHeader-button')).toBeInTheDocument();

		expect(queryByTestId('no-header')).not.toBeInTheDocument();
		expect(queryByTestId('success-prompt')).not.toBeInTheDocument();

		await act(() => {
			fireEvent.click(getByTestId('remove-header-tooltip-0'));
		});

		expect(queryByTestId('save-requestHeader-button')).not.toBeInTheDocument();
		expect(getByTestId('no-header')).toBeInTheDocument();
		expect(queryByTestId('view-mode-code')).not.toBeInTheDocument();

		await act(() => {
			fireEvent.click(getByTestId('add-header-button'));
		});

		expect(mockedRecoilFn).toHaveBeenCalledWith({
			name: 'Tester',
			requestHeader: '',
			shouldDoExactHeaderMatching: false,
		});

		expect(getByTestId('save-requestHeader-button')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should add new header using key-value inputs', async () => {
		let tree;
		await act(async () => {
			tree = await render(<RequestHeaders />);
		});

		const { getByTestId, container, queryByTestId } = tree;

		expect(getByTestId('request-header-wrapper')).toBeInTheDocument();
		expect(getByTestId('view-mode')).toBeInTheDocument();
		expect(getByTestId('header-matching-toggle')).toBeInTheDocument();
		expect(getByTestId('save-requestHeader-button')).toBeInTheDocument();

		expect(queryByTestId('no-header')).not.toBeInTheDocument();
		expect(queryByTestId('success-prompt')).not.toBeInTheDocument();

		await act(() => {
			fireEvent.change(getByTestId('requestHeader_0_key'), {
				target: { value: 'Authorization' },
			});
			fireEvent.change(getByTestId('requestHeader_0_value'), {
				target: { value: 'Bearer token' },
			});
		});

		await act(() => {
			fireEvent.click(getByTestId('add-header-button'));
		});

		await act(() => {
			fireEvent.change(getByTestId('requestHeader_1_key'), {
				target: { value: 'sessionId' },
			});
			fireEvent.change(getByTestId('requestHeader_1_value'), {
				target: { value: 'AX112AS15' },
			});
		});

		await act(() => {
			fireEvent.click(getByTestId('view-mode-code'));
		});

		expect(getByTestId('request-header-text-input')).toHaveValue(
			JSON.stringify(
				{ Authorization: 'Bearer token', sessionId: 'AX112AS15' },
				null,
				2
			)
		);

		await act(() => {
			fireEvent.click(getByTestId('view-mode-text'));
		});

		await act(() => {
			fireEvent.click(getByTestId('add-header-button'));
		});

		await act(async () => {
			fireEvent.change(getByTestId('requestHeader_2_key'), {
				target: { value: 'logging' },
			});
			fireEvent.change(getByTestId('requestHeader_2_value'), {
				target: { value: 'DEBUG' },
			});
		});

		expect(queryByTestId('parsing-error')).not.toBeInTheDocument();

		await act(() => {
			fireEvent.click(getByTestId('save-requestHeader-button'));
		});

		expect(mockedRecoilFn).toHaveBeenCalledWith({
			name: 'Tester',
			requestHeader:
				'{"Authorization":"Bearer token","sessionId":"AX112AS15","logging":"DEBUG"}',
			shouldDoExactHeaderMatching: false,
		});

		expect(getByTestId('success-prompt')).toHaveTextContent(
			'Request headers saved for submission'
		);

		expect(container).toMatchSnapshot();
	});

	it('should add new header using text input', async () => {
		let tree;
		await act(async () => {
			tree = await render(<RequestHeaders />);
		});

		const { getByTestId, container, queryByTestId } = tree;

		expect(getByTestId('request-header-wrapper')).toBeInTheDocument();
		expect(getByTestId('view-mode')).toBeInTheDocument();
		expect(getByTestId('header-matching-toggle')).toBeInTheDocument();
		expect(getByTestId('save-requestHeader-button')).toBeInTheDocument();

		expect(queryByTestId('no-header')).not.toBeInTheDocument();
		expect(queryByTestId('success-prompt')).not.toBeInTheDocument();

		await act(() => {
			fireEvent.click(getByTestId('view-mode-code'));
		});

		await act(() => {
			fireEvent.change(getByTestId('request-header-text-input'), {
				target: {
					value: '{"Authorization": "Bearer token", "sessionId": "AX112AS15"',
				},
			});
		});

		expect(getByTestId('parsing-error')).toHaveTextContent(
			'Failed to parse request headers text'
		);

		await act(() => {
			fireEvent.change(getByTestId('request-header-text-input'), {
				target: {
					value: '{"Authorization": "Bearer token", "sessionId": "AX112AS15"}',
				},
			});
		});

		await act(async () => {
			fireEvent.click(getByTestId('view-mode-text'));
		});

		expect(getByTestId('requestHeader_0_key')).toHaveValue('Authorization');
		expect(getByTestId('requestHeader_0_value')).toHaveValue('Bearer token');
		expect(getByTestId('requestHeader_1_key')).toHaveValue('sessionId');
		expect(getByTestId('requestHeader_1_value')).toHaveValue('AX112AS15');

		await act(() => {
			fireEvent.click(getByTestId('view-mode-code'));
		});

		expect(getByTestId('request-header-text-input')).toHaveValue(
			JSON.stringify(
				{ Authorization: 'Bearer token', sessionId: 'AX112AS15' },
				null,
				2
			)
		);

		await act(() => {
			fireEvent.click(getByTestId('save-requestHeader-button'));
		});

		expect(mockedRecoilFn).toHaveBeenCalledWith({
			name: 'Tester',
			requestHeader: '{"Authorization":"Bearer token","sessionId":"AX112AS15"}',
			shouldDoExactHeaderMatching: false,
		});

		expect(getByTestId('success-prompt')).toHaveTextContent(
			'Request headers saved for submission'
		);

		expect(container).toMatchSnapshot();
	});

	it('should fill in request headers when headers are already set', async () => {
		useRecoilState.mockImplementation(() => {
			return [
				{
					name: 'Tester',
					requestHeader:
						'{"Authorization": "Bearer token", "sessionId": "AX112AS15"}',
					shouldDoExactHeaderMatching: false,
				},
				mockedRecoilFn,
			];
		});

		let tree;
		await act(async () => {
			tree = await render(<RequestHeaders />);
		});

		const { getByTestId, container, queryByTestId } = tree;

		expect(getByTestId('request-header-wrapper')).toBeInTheDocument();
		expect(getByTestId('view-mode')).toBeInTheDocument();
		expect(queryByTestId('no-header')).not.toBeInTheDocument();
		expect(getByTestId('header-matching-toggle')).toBeInTheDocument();
		expect(getByTestId('save-requestHeader-button')).toBeInTheDocument();
		expect(queryByTestId('success-prompt')).not.toBeInTheDocument();

		expect(getByTestId('requestHeader_0_key')).toHaveValue('Authorization');
		expect(getByTestId('requestHeader_0_value')).toHaveValue('Bearer token');
		expect(getByTestId('requestHeader_1_key')).toHaveValue('sessionId');
		expect(getByTestId('requestHeader_1_value')).toHaveValue('AX112AS15');

		await act(() => {
			fireEvent.click(getByTestId('view-mode-code'));
		});

		expect(getByTestId('request-header-text-input')).toHaveValue(
			JSON.stringify(
				{ Authorization: 'Bearer token', sessionId: 'AX112AS15' },
				null,
				2
			)
		);

		await act(() => {
			fireEvent.click(getByTestId('view-mode-text'));
		});

		await act(() => {
			fireEvent.click(getByTestId('add-header-button'));
		});

		await act(() => {
			fireEvent.change(getByTestId('requestHeader_2_key'), {
				target: { value: 'logger' },
			});
			fireEvent.change(getByTestId('requestHeader_2_value'), {
				target: { value: 'DEBUG' },
			});
		});

		await act(() => {
			fireEvent.change(getByTestId('requestHeader_1_key'), {
				target: { value: 'sessionId' },
			});
			fireEvent.change(getByTestId('requestHeader_1_value'), {
				target: { value: 'AX112AS16' },
			});
		});

		await act(() => {
			fireEvent.click(getByTestId('view-mode-code'));
		});

		expect(getByTestId('request-header-text-input')).toHaveValue(
			JSON.stringify(
				{
					Authorization: 'Bearer token',
					sessionId: 'AX112AS16',
					logger: 'DEBUG',
				},
				null,
				2
			)
		);

		await act(() => {
			fireEvent.click(getByTestId('save-requestHeader-button'));
		});

		expect(mockedRecoilFn).toHaveBeenNthCalledWith(1, {
			name: 'Tester',
			requestHeader: '',
			shouldDoExactHeaderMatching: false,
		});
		expect(mockedRecoilFn).toHaveBeenNthCalledWith(2, {
			name: 'Tester',
			requestHeader:
				'{"Authorization":"Bearer token","sessionId":"AX112AS16","logger":"DEBUG"}',
			shouldDoExactHeaderMatching: false,
		});

		expect(getByTestId('success-prompt')).toHaveTextContent(
			'Request headers saved for submission'
		);

		expect(container).toMatchSnapshot();
	});
});
