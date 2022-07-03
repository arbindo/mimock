import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import { useRecoilState } from 'recoil';
import QueryParam from './QueryParam';

let mockedRecoilFn = jest.fn();
jest.mock('recoil');

describe('QueryParam', () => {
	beforeEach(() => {
		useRecoilState.mockImplementation(() => {
			return [
				{
					name: 'Tester',
					queryParams: '',
				},
				mockedRecoilFn,
			];
		});
	});

	it('should render query params when initial value is empty', async () => {
		let tree;
		await act(async () => {
			tree = await render(<QueryParam />);
		});

		const { getByTestId, container, queryByTestId } = tree;

		expect(getByTestId('query-param-form')).toBeInTheDocument();
		expect(getByTestId('view-mode')).toBeInTheDocument();
		expect(getByTestId('add-param-button')).toBeInTheDocument();
		expect(getByTestId('save-queryParam-button')).toBeInTheDocument();

		await act(() => {
			fireEvent.click(getByTestId('view-mode-code'));
		});

		expect(getByTestId('query-param-text-input')).toHaveValue('');

		await act(() => {
			fireEvent.click(getByTestId('view-mode-text'));
		});

		expect(queryByTestId('no-query-param')).not.toBeInTheDocument();

		expect(getByTestId('queryParam_0_key')).toHaveValue('');
		expect(getByTestId('queryParam_0_value')).toHaveValue('');

		expect(getByTestId('remove-param-tooltip-0')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should remove query param on clicking remove button', async () => {
		let tree;
		await act(async () => {
			tree = await render(<QueryParam />);
		});

		const { getByTestId, container, queryByTestId } = tree;

		expect(getByTestId('query-param-form')).toBeInTheDocument();
		expect(getByTestId('view-mode')).toBeInTheDocument();
		expect(getByTestId('add-param-button')).toBeInTheDocument();
		expect(getByTestId('save-queryParam-button')).toBeInTheDocument();
		expect(queryByTestId('no-query-param')).not.toBeInTheDocument();

		expect(getByTestId('queryParam_0_key')).toBeInTheDocument();
		expect(getByTestId('queryParam_0_value')).toBeInTheDocument();

		await act(() => {
			fireEvent.click(getByTestId('remove-param-tooltip-0'));
			fireEvent.click(getByTestId('view-mode-text'));
		});

		expect(queryByTestId('view-mode-code')).not.toBeInTheDocument();

		expect(getByTestId('no-query-param')).toHaveTextContent(
			'No query params added yet'
		);

		expect(container).toMatchSnapshot();
	});

	it('should add new query params using key-value inputs', async () => {
		let tree;
		await act(async () => {
			tree = await render(<QueryParam />);
		});

		const { getByTestId, container, queryByTestId } = tree;

		expect(getByTestId('query-param-form')).toBeInTheDocument();
		expect(getByTestId('view-mode')).toBeInTheDocument();
		expect(getByTestId('save-queryParam-button')).toBeInTheDocument();
		expect(queryByTestId('no-query-param')).not.toBeInTheDocument();

		await act(() => {
			fireEvent.change(getByTestId('queryParam_0_key'), {
				target: { value: 'version' },
			});
			fireEvent.change(getByTestId('queryParam_0_value'), {
				target: { value: '1.0.0' },
			});
		});

		await act(() => {
			fireEvent.click(getByTestId('add-param-button'));
		});

		await act(() => {
			fireEvent.change(getByTestId('queryParam_1_key'), {
				target: { value: 'page' },
			});
			fireEvent.change(getByTestId('queryParam_1_value'), {
				target: { value: '1' },
			});
		});

		await act(() => {
			fireEvent.click(getByTestId('view-mode-code'));
		});

		expect(getByTestId('query-param-text-input')).toHaveValue(
			'page=1&version=1.0.0'
		);

		await act(() => {
			fireEvent.click(getByTestId('view-mode-text'));
		});

		await act(() => {
			fireEvent.click(getByTestId('save-queryParam-button'));
		});

		expect(mockedRecoilFn).toHaveBeenCalledWith({
			name: 'Tester',
			queryParams: 'page=1&version=1.0.0',
		});

		expect(container).toMatchSnapshot();
	});

	it('should add new query params using text input', async () => {
		let tree;
		await act(async () => {
			tree = await render(<QueryParam />);
		});

		const { getByTestId, container, queryByTestId } = tree;

		expect(getByTestId('query-param-form')).toBeInTheDocument();
		expect(getByTestId('view-mode')).toBeInTheDocument();
		expect(getByTestId('save-queryParam-button')).toBeInTheDocument();
		expect(queryByTestId('no-query-param')).not.toBeInTheDocument();

		await act(() => {
			fireEvent.click(getByTestId('view-mode-code'));
		});

		await act(() => {
			fireEvent.change(getByTestId('query-param-text-input'), {
				target: { value: 'serviceName=Student&version=1.0&active=true' },
			});
		});

		await act(() => {
			fireEvent.click(getByTestId('view-mode-text'));
		});

		expect(getByTestId('queryParam_0_key')).toHaveValue('active');
		expect(getByTestId('queryParam_0_value')).toHaveValue('true');

		expect(getByTestId('queryParam_1_key')).toHaveValue('serviceName');
		expect(getByTestId('queryParam_1_value')).toHaveValue('Student');

		expect(getByTestId('queryParam_2_key')).toHaveValue('version');
		expect(getByTestId('queryParam_2_value')).toHaveValue('1.0');

		await act(() => {
			fireEvent.click(getByTestId('save-queryParam-button'));
		});

		expect(mockedRecoilFn).toHaveBeenCalledWith({
			name: 'Tester',
			queryParams: 'active=true&serviceName=Student&version=1.0',
		});

		expect(container).toMatchSnapshot();
	});

	it('should build query param inputs when query params are already set', async () => {
		useRecoilState.mockImplementation(() => {
			return [
				{
					name: 'Tester',
					queryParams: 'serviceName=Student&version=1.0&active=true',
				},
				mockedRecoilFn,
			];
		});

		let tree;
		await act(async () => {
			tree = await render(<QueryParam />);
		});

		const { getByTestId, container, queryByTestId } = tree;

		expect(getByTestId('query-param-form')).toBeInTheDocument();
		expect(getByTestId('view-mode')).toBeInTheDocument();
		expect(getByTestId('save-queryParam-button')).toBeInTheDocument();
		expect(queryByTestId('no-query-param')).not.toBeInTheDocument();

		await act(() => {
			fireEvent.click(getByTestId('view-mode-code'));
		});

		expect(getByTestId('query-param-text-input')).toHaveValue(
			'active=true&serviceName=Student&version=1.0'
		);

		await act(() => {
			fireEvent.click(getByTestId('view-mode-text'));
		});

		expect(getByTestId('queryParam_0_key')).toHaveValue('active');
		expect(getByTestId('queryParam_0_value')).toHaveValue('true');

		expect(getByTestId('queryParam_1_key')).toHaveValue('serviceName');
		expect(getByTestId('queryParam_1_value')).toHaveValue('Student');

		expect(getByTestId('queryParam_2_key')).toHaveValue('version');
		expect(getByTestId('queryParam_2_value')).toHaveValue('1.0');

		await act(() => {
			fireEvent.click(getByTestId('save-queryParam-button'));
		});

		expect(mockedRecoilFn).toHaveBeenCalledWith({
			name: 'Tester',
			queryParams: 'active=true&serviceName=Student&version=1.0',
		});

		expect(container).toMatchSnapshot();
	});
});
