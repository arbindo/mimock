import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import { useRecoilState } from 'recoil';
import ResponseHeaders from './ResponseHeaders';

let mockedRecoilFn = jest.fn();
jest.mock('recoil');
jest.useFakeTimers();

describe('ResponseHeaders', () => {
	beforeEach(() => {
		useRecoilState.mockImplementation(() => {
			return [
				{
					name: 'Tester',
					responseHeaders: '',
				},
				mockedRecoilFn,
			];
		});
	});

	it('should render response headers when initial value is empty', async () => {
		let tree;
		await act(async () => {
			tree = await render(<ResponseHeaders />);
		});

		const { getByTestId, container, queryByTestId } = tree;

		expect(getByTestId('response-headers-form')).toBeInTheDocument();
		expect(getByTestId('view-mode')).toBeInTheDocument();

		expect(queryByTestId('no-header')).not.toBeInTheDocument();
		expect(queryByTestId('success-prompt')).not.toBeInTheDocument();

		await act(() => {
			fireEvent.click(getByTestId('add-header-button'));
		});

		await act(() => {
			fireEvent.click(getByTestId('view-mode-code'));
		});

		expect(getByTestId('response-header-text-input')).toHaveValue('');

		await act(() => {
			fireEvent.click(getByTestId('view-mode-text'));
		});

		expect(getByTestId('responseHeader_0_key')).toHaveValue('');
		expect(getByTestId('responseHeader_0_value')).toHaveValue('');

		expect(getByTestId('remove-header-tooltip-0')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should remove response headers on clicking remove button', async () => {
		let tree;
		await act(async () => {
			tree = await render(<ResponseHeaders />);
		});

		const { getByTestId, container, queryByTestId } = tree;

		expect(getByTestId('response-headers-form')).toBeInTheDocument();
		expect(getByTestId('view-mode')).toBeInTheDocument();
		expect(getByTestId('save-responseHeader-button')).toBeInTheDocument();

		expect(queryByTestId('no-header')).not.toBeInTheDocument();
		expect(queryByTestId('success-prompt')).not.toBeInTheDocument();

		await act(() => {
			fireEvent.click(getByTestId('remove-header-tooltip-0'));
		});

		expect(queryByTestId('save-responseHeader-button')).not.toBeInTheDocument();
		expect(getByTestId('no-header')).toBeInTheDocument();
		expect(queryByTestId('view-mode-code')).not.toBeInTheDocument();

		await act(() => {
			fireEvent.click(getByTestId('add-header-button'));
		});

		expect(mockedRecoilFn).toHaveBeenNthCalledWith(2, {
			name: 'Tester',
			responseHeaders: '',
		});

		expect(getByTestId('save-responseHeader-button')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should add new header using key-value inputs', async () => {
		let tree;
		await act(async () => {
			tree = await render(<ResponseHeaders />);
		});

		const { getByTestId, container, queryByTestId } = tree;

		expect(getByTestId('response-headers-form')).toBeInTheDocument();
		expect(getByTestId('view-mode')).toBeInTheDocument();
		expect(getByTestId('save-responseHeader-button')).toBeInTheDocument();

		expect(queryByTestId('no-header')).not.toBeInTheDocument();
		expect(queryByTestId('success-prompt')).not.toBeInTheDocument();

		await act(() => {
			fireEvent.change(getByTestId('responseHeader_0_key'), {
				target: { value: 'token' },
			});
			fireEvent.change(getByTestId('responseHeader_0_value'), {
				target: { value: 'AFXAS78HJH' },
			});
		});

		await act(() => {
			fireEvent.click(getByTestId('add-header-button'));
		});

		await act(() => {
			fireEvent.change(getByTestId('responseHeader_1_key'), {
				target: { value: 'sessionId' },
			});
			fireEvent.change(getByTestId('responseHeader_1_value'), {
				target: { value: '1212UDS-121HJH-HJH89' },
			});
		});

		await act(() => {
			fireEvent.click(getByTestId('view-mode-code'));
		});

		expect(getByTestId('response-header-text-input')).toHaveValue(
			JSON.stringify(
				{
					token: 'AFXAS78HJH',
					sessionId: '1212UDS-121HJH-HJH89',
				},
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
			fireEvent.change(getByTestId('responseHeader_2_key'), {
				target: { value: 'authenticated' },
			});
			fireEvent.change(getByTestId('responseHeader_2_value'), {
				target: { value: 'true' },
			});
		});

		expect(queryByTestId('parsing-error')).not.toBeInTheDocument();

		await act(() => {
			fireEvent.click(getByTestId('save-responseHeader-button'));
		});

		expect(mockedRecoilFn).toHaveBeenNthCalledWith(1, {
			name: 'Tester',
			responseHeaders: '',
		});

		expect(mockedRecoilFn).toHaveBeenNthCalledWith(2, {
			name: 'Tester',
			responseHeaders: JSON.stringify(
				{
					token: 'AFXAS78HJH',
					sessionId: '1212UDS-121HJH-HJH89',
					authenticated: 'true',
				},
				null,
				2
			),
		});

		expect(getByTestId('success-prompt')).toHaveTextContent(
			'Response headers saved for submission'
		);

		expect(container).toMatchSnapshot();
	});

	it('should add new header using text input', async () => {
		let tree;
		await act(async () => {
			tree = await render(<ResponseHeaders />);
		});

		const { getByTestId, container, queryByTestId } = tree;

		expect(getByTestId('response-headers-form')).toBeInTheDocument();
		expect(getByTestId('view-mode')).toBeInTheDocument();
		expect(getByTestId('save-responseHeader-button')).toBeInTheDocument();

		expect(queryByTestId('no-header')).not.toBeInTheDocument();
		expect(queryByTestId('success-prompt')).not.toBeInTheDocument();

		await act(() => {
			fireEvent.click(getByTestId('view-mode-code'));
		});

		await act(() => {
			fireEvent.change(getByTestId('response-header-text-input'), {
				target: {
					value: '{"Authenticated": "true", "session": "12HJHJ-23SDWX-89HJH9"',
				},
			});
		});

		expect(getByTestId('parsing-error')).toHaveTextContent(
			'Failed to parse response headers text'
		);

		await act(() => {
			fireEvent.change(getByTestId('response-header-text-input'), {
				target: {
					value: '{"Authenticated": "true", "session": "12HJHJ-23SDWX-89HJH9"}',
				},
			});
		});

		await act(async () => {
			fireEvent.click(getByTestId('view-mode-text'));
		});

		expect(getByTestId('responseHeader_0_key')).toHaveValue('Authenticated');
		expect(getByTestId('responseHeader_0_value')).toHaveValue('true');
		expect(getByTestId('responseHeader_1_key')).toHaveValue('session');
		expect(getByTestId('responseHeader_1_value')).toHaveValue(
			'12HJHJ-23SDWX-89HJH9'
		);

		await act(() => {
			fireEvent.click(getByTestId('view-mode-code'));
		});

		expect(getByTestId('response-header-text-input')).toHaveValue(
			JSON.stringify(
				{
					Authenticated: 'true',
					session: '12HJHJ-23SDWX-89HJH9',
				},
				null,
				2
			)
		);

		await act(() => {
			fireEvent.click(getByTestId('save-responseHeader-button'));
		});

		expect(mockedRecoilFn).toHaveBeenNthCalledWith(1, {
			name: 'Tester',
			responseHeaders: '',
		});
		expect(mockedRecoilFn).toHaveBeenNthCalledWith(2, {
			name: 'Tester',
			responseHeaders: JSON.stringify(
				{
					Authenticated: 'true',
					session: '12HJHJ-23SDWX-89HJH9',
				},
				null,
				2
			),
		});

		expect(getByTestId('success-prompt')).toHaveTextContent(
			'Response headers saved for submission'
		);

		expect(container).toMatchSnapshot();
	});

	it('should fill in response headers when headers are already set', async () => {
		useRecoilState.mockImplementation(() => {
			return [
				{
					name: 'Tester',
					responseHeaders:
						'{"Authorization": "Bearer token", "sessionId": "AX112AS15"}',
				},
				mockedRecoilFn,
			];
		});

		let tree;
		await act(async () => {
			tree = await render(<ResponseHeaders />);
		});

		const { getByTestId, container, queryByTestId } = tree;

		expect(getByTestId('response-headers-form')).toBeInTheDocument();
		expect(getByTestId('view-mode')).toBeInTheDocument();
		expect(queryByTestId('no-header')).not.toBeInTheDocument();
		expect(getByTestId('save-responseHeader-button')).toBeInTheDocument();
		expect(queryByTestId('success-prompt')).not.toBeInTheDocument();

		expect(getByTestId('responseHeader_0_key')).toHaveValue('Authorization');
		expect(getByTestId('responseHeader_0_value')).toHaveValue('Bearer token');
		expect(getByTestId('responseHeader_1_key')).toHaveValue('sessionId');
		expect(getByTestId('responseHeader_1_value')).toHaveValue('AX112AS15');

		await act(() => {
			fireEvent.click(getByTestId('view-mode-code'));
		});

		expect(getByTestId('response-header-text-input')).toHaveValue(
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
			fireEvent.change(getByTestId('responseHeader_2_key'), {
				target: { value: 'logger' },
			});
			fireEvent.change(getByTestId('responseHeader_2_value'), {
				target: { value: 'DEBUG' },
			});
		});

		await act(() => {
			fireEvent.change(getByTestId('responseHeader_1_key'), {
				target: { value: 'sessionId' },
			});
			fireEvent.change(getByTestId('responseHeader_1_value'), {
				target: { value: 'AX112AS16' },
			});
		});

		await act(() => {
			fireEvent.click(getByTestId('view-mode-code'));
		});

		expect(getByTestId('response-header-text-input')).toHaveValue(
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
			fireEvent.click(getByTestId('save-responseHeader-button'));
		});

		expect(mockedRecoilFn).toHaveBeenNthCalledWith(1, {
			name: 'Tester',
			responseHeaders: '',
		});
		expect(mockedRecoilFn).toHaveBeenNthCalledWith(2, {
			name: 'Tester',
			responseHeaders: JSON.stringify(
				{
					Authorization: 'Bearer token',
					sessionId: 'AX112AS16',
					logger: 'DEBUG',
				},
				null,
				2
			),
		});

		expect(getByTestId('success-prompt')).toHaveTextContent(
			'Response headers saved for submission'
		);

		expect(container).toMatchSnapshot();
	});
});
