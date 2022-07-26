import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import { useRecoilState } from 'recoil';
import RequestBody from './RequestBody';

let mockedRecoilFn = jest.fn();
jest.mock('recoil');
jest.useFakeTimers();

describe('RequestHeaders', () => {
	beforeEach(() => {
		useRecoilState.mockImplementation(() => {
			return [
				{
					name: 'Tester',
					requestBody: '',
					requestBodyType: 'application/json',
				},
				mockedRecoilFn,
			];
		});
	});

	it('should render request body when initial value is empty', async () => {
		let tree;
		await act(async () => {
			tree = await render(<RequestBody />);
		});

		const { getByTestId, container, queryByTestId } = tree;

		expect(getByTestId('request-body-wrapper')).toBeInTheDocument();
		expect(getByTestId('view-mode')).toBeInTheDocument();
		expect(getByTestId('request-body-type-wrapper')).toBeInTheDocument();
		expect(getByTestId('request-body-type-label')).toHaveTextContent(
			'Request body type'
		);
		expect(getByTestId('request-body-type').options).toHaveLength(3);

		expect(queryByTestId('no-request-body')).not.toBeInTheDocument();
		expect(queryByTestId('success-prompt')).not.toBeInTheDocument();

		await act(() => {
			fireEvent.click(getByTestId('add-request-body-button'));
		});

		await act(() => {
			fireEvent.click(getByTestId('view-mode-code'));
		});

		expect(getByTestId('request-body-text-input')).toHaveValue('');

		await act(() => {
			fireEvent.click(getByTestId('view-mode-text'));
		});

		expect(getByTestId('requestBody_0_key')).toHaveValue('');
		expect(getByTestId('requestBody_0_value')).toHaveValue('');

		expect(getByTestId('remove-request-body-tooltip-0')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should remove request body on clicking remove button', async () => {
		let tree;
		await act(async () => {
			tree = await render(<RequestBody />);
		});

		const { getByTestId, container, queryByTestId } = tree;

		expect(getByTestId('request-body-wrapper')).toBeInTheDocument();
		expect(getByTestId('view-mode')).toBeInTheDocument();
		expect(getByTestId('request-body-type-wrapper')).toBeInTheDocument();
		expect(getByTestId('request-body-type-label')).toHaveTextContent(
			'Request body type'
		);
		expect(getByTestId('request-body-type').options).toHaveLength(3);

		expect(queryByTestId('no-request-body')).not.toBeInTheDocument();
		expect(queryByTestId('success-prompt')).not.toBeInTheDocument();

		await act(() => {
			fireEvent.change(getByTestId('request-body-type'), {
				target: { value: 'application/x-www-form-urlencoded' },
			});
		});

		expect(mockedRecoilFn).toHaveBeenCalledWith({
			name: 'Tester',
			requestBody: '',
			requestBodyType: 'application/x-www-form-urlencoded',
		});

		await act(() => {
			fireEvent.click(getByTestId('remove-request-body-tooltip-0'));
		});

		expect(queryByTestId('save-requestBody-button')).not.toBeInTheDocument();
		expect(getByTestId('no-request-body')).toBeInTheDocument();
		expect(queryByTestId('view-mode-code')).not.toBeInTheDocument();

		await act(() => {
			fireEvent.click(getByTestId('add-request-body-button'));
		});

		expect(getByTestId('save-requestBody-button')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should add new header using key-value inputs', async () => {
		let tree;
		await act(async () => {
			tree = await render(<RequestBody />);
		});

		const { getByTestId, container, queryByTestId } = tree;

		expect(getByTestId('request-body-wrapper')).toBeInTheDocument();
		expect(getByTestId('view-mode')).toBeInTheDocument();
		expect(getByTestId('request-body-type-wrapper')).toBeInTheDocument();
		expect(getByTestId('save-requestBody-button')).toBeInTheDocument();

		expect(queryByTestId('no-request-body')).not.toBeInTheDocument();
		expect(queryByTestId('success-prompt')).not.toBeInTheDocument();

		await act(() => {
			fireEvent.change(getByTestId('requestBody_0_key'), {
				target: { value: 'userId' },
			});
			fireEvent.change(getByTestId('requestBody_0_value'), {
				target: { value: '1' },
			});
		});

		await act(() => {
			fireEvent.click(getByTestId('add-request-body-button'));
		});

		await act(() => {
			fireEvent.change(getByTestId('requestBody_1_key'), {
				target: { value: 'pageFilter' },
			});
			fireEvent.change(getByTestId('requestBody_1_value'), {
				target: { value: 'type' },
			});
		});

		await act(() => {
			fireEvent.click(getByTestId('view-mode-code'));
		});

		expect(getByTestId('request-body-text-input')).toHaveValue(
			JSON.stringify(
				{
					userId: '1',
					pageFilter: 'type',
				},
				null,
				2
			)
		);

		await act(() => {
			fireEvent.click(getByTestId('view-mode-text'));
		});

		await act(() => {
			fireEvent.click(getByTestId('add-request-body-button'));
		});

		await act(async () => {
			fireEvent.change(getByTestId('requestBody_2_key'), {
				target: { value: 'title' },
			});
			fireEvent.change(getByTestId('requestBody_2_value'), {
				target: { value: 'Coder' },
			});
		});

		expect(queryByTestId('parsing-error')).not.toBeInTheDocument();

		await act(() => {
			fireEvent.click(getByTestId('save-requestBody-button'));
		});

		expect(mockedRecoilFn).toHaveBeenNthCalledWith(2, {
			name: 'Tester',
			requestBody: JSON.stringify(
				{
					userId: '1',
					pageFilter: 'type',
					title: 'Coder',
				},
				null,
				2
			),
			requestBodyType: 'application/json',
		});

		expect(getByTestId('success-prompt')).toHaveTextContent(
			'Request body fields saved for submission'
		);

		expect(container).toMatchSnapshot();
	});

	it('should show empty key error when key is empty', async () => {
		let tree;
		await act(async () => {
			tree = await render(<RequestBody />);
		});

		const { getByTestId, container, queryByTestId } = tree;

		expect(getByTestId('request-body-wrapper')).toBeInTheDocument();
		expect(getByTestId('view-mode')).toBeInTheDocument();
		expect(getByTestId('request-body-type-wrapper')).toBeInTheDocument();
		expect(getByTestId('save-requestBody-button')).toBeInTheDocument();

		expect(queryByTestId('no-request-body')).not.toBeInTheDocument();
		expect(queryByTestId('success-prompt')).not.toBeInTheDocument();
		expect(queryByTestId('empty-error')).not.toBeInTheDocument();

		await act(() => {
			fireEvent.click(getByTestId('save-requestBody-button'));
		});

		expect(getByTestId('empty-error')).toBeInTheDocument();
		expect(getByTestId('empty-error')).toHaveTextContent(
			'Empty keys encountered'
		);

		await act(() => {
			fireEvent.change(getByTestId('requestBody_0_key'), {
				target: { value: '' },
			});
			fireEvent.change(getByTestId('requestBody_0_value'), {
				target: { value: '1' },
			});
		});

		await act(() => {
			fireEvent.click(getByTestId('save-requestBody-button'));
		});

		expect(getByTestId('empty-error')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should add new header using text input', async () => {
		let tree;
		await act(async () => {
			tree = await render(<RequestBody />);
		});

		const { getByTestId, container, queryByTestId } = tree;

		expect(getByTestId('request-body-wrapper')).toBeInTheDocument();
		expect(getByTestId('view-mode')).toBeInTheDocument();
		expect(getByTestId('save-requestBody-button')).toBeInTheDocument();

		expect(queryByTestId('no-request-body')).not.toBeInTheDocument();
		expect(queryByTestId('success-prompt')).not.toBeInTheDocument();

		await act(() => {
			fireEvent.click(getByTestId('view-mode-code'));
		});

		await act(() => {
			fireEvent.change(getByTestId('request-body-text-input'), {
				target: {
					value: '{"userId": "1", "pageFilter": "type"',
				},
			});
		});

		expect(getByTestId('parsing-error')).toHaveTextContent(
			'Failed to parse request body text'
		);

		await act(() => {
			fireEvent.change(getByTestId('request-body-text-input'), {
				target: {
					value: '{"userId": "1", "pageFilter": "type"}',
				},
			});
		});

		await act(async () => {
			fireEvent.click(getByTestId('view-mode-text'));
		});

		expect(getByTestId('requestBody_0_key')).toHaveValue('userId');
		expect(getByTestId('requestBody_0_value')).toHaveValue('1');
		expect(getByTestId('requestBody_1_key')).toHaveValue('pageFilter');
		expect(getByTestId('requestBody_1_value')).toHaveValue('type');

		await act(() => {
			fireEvent.click(getByTestId('view-mode-code'));
		});

		expect(getByTestId('request-body-text-input')).toHaveValue(
			JSON.stringify(
				{
					userId: '1',
					pageFilter: 'type',
				},
				null,
				2
			)
		);

		await act(() => {
			fireEvent.click(getByTestId('save-requestBody-button'));
		});

		expect(mockedRecoilFn).toHaveBeenCalledWith({
			name: 'Tester',
			requestBody: JSON.stringify(
				{
					userId: '1',
					pageFilter: 'type',
				},
				null,
				2
			),
			requestBodyType: 'application/json',
		});

		expect(getByTestId('success-prompt')).toHaveTextContent(
			'Request body fields saved for submission'
		);

		expect(container).toMatchSnapshot();
	});

	it('should fill in request headers when headers are already set', async () => {
		useRecoilState.mockImplementation(() => {
			return [
				{
					name: 'Tester',
					requestBody: JSON.stringify(
						{
							userId: '1',
							pageFilter: 'type',
						},
						null,
						2
					),
				},
				mockedRecoilFn,
			];
		});

		let tree;
		await act(async () => {
			tree = await render(<RequestBody />);
		});

		const { getByTestId, container, queryByTestId } = tree;

		expect(getByTestId('request-body-wrapper')).toBeInTheDocument();
		expect(getByTestId('view-mode')).toBeInTheDocument();
		expect(queryByTestId('no-request-body')).not.toBeInTheDocument();
		expect(getByTestId('save-requestBody-button')).toBeInTheDocument();
		expect(queryByTestId('success-prompt')).not.toBeInTheDocument();

		expect(getByTestId('requestBody_0_key')).toHaveValue('userId');
		expect(getByTestId('requestBody_0_value')).toHaveValue('1');
		expect(getByTestId('requestBody_1_key')).toHaveValue('pageFilter');
		expect(getByTestId('requestBody_1_value')).toHaveValue('type');

		await act(() => {
			fireEvent.click(getByTestId('view-mode-code'));
		});

		expect(getByTestId('request-body-text-input')).toHaveValue(
			JSON.stringify(
				{
					userId: '1',
					pageFilter: 'type',
				},
				null,
				2
			)
		);

		await act(() => {
			fireEvent.click(getByTestId('view-mode-text'));
		});

		await act(() => {
			fireEvent.click(getByTestId('add-request-body-button'));
		});

		await act(() => {
			fireEvent.change(getByTestId('requestBody_2_key'), {
				target: { value: 'page' },
			});
			fireEvent.change(getByTestId('requestBody_2_value'), {
				target: { value: '2' },
			});
		});

		await act(() => {
			fireEvent.change(getByTestId('requestBody_1_key'), {
				target: { value: 'pageFilter' },
			});
			fireEvent.change(getByTestId('requestBody_1_value'), {
				target: { value: 'date' },
			});
		});

		await act(() => {
			fireEvent.click(getByTestId('view-mode-code'));
		});

		expect(getByTestId('request-body-text-input')).toHaveValue(
			JSON.stringify(
				{
					userId: '1',
					pageFilter: 'date',
					page: '2',
				},
				null,
				2
			)
		);

		await act(() => {
			fireEvent.click(getByTestId('save-requestBody-button'));
		});

		expect(mockedRecoilFn).toHaveBeenNthCalledWith(1, {
			name: 'Tester',
			requestBody: '',
		});
		expect(mockedRecoilFn).toHaveBeenNthCalledWith(2, {
			name: 'Tester',
			requestBody: JSON.stringify(
				{
					userId: '1',
					pageFilter: 'date',
					page: '2',
				},
				null,
				2
			),
		});

		expect(getByTestId('success-prompt')).toHaveTextContent(
			'Request body fields saved for submission'
		);

		expect(container).toMatchSnapshot();
	});
});
