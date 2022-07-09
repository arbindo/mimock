import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import { useRecoilState } from 'recoil';
import { getHttpMethods } from 'services/staticRecords/getHttpMethods.service';
import { createMock } from 'services/mockManagement/mockManagement.service';
import AddMockForm from './AddMockForm';

let mockedRecoilFn = jest.fn();
jest.mock('recoil');
jest.mock('services/staticRecords/getHttpMethods.service');
jest.mock('services/mockManagement/mockManagement.service');

const actualNotification = jest.requireActual('hooks/useNotification');
jest.mock('react-notifications-component', () => {
	const Store = {
		addNotification: jest.fn(),
	};
	return { Store };
});

describe('AddMockFrom', () => {
	beforeEach(() => {
		getHttpMethods.mockResolvedValue(['GET', 'POST', 'DELETE']);

		useRecoilState.mockImplementation(() => {
			return [
				{
					name: '',
					description: '',
					route: '',
					httpMethod: 'GET',
					responseContentType: 'application/json',
					responseType: 'TEXTUAL_RESPONSE',
					queryParams: '',
					shouldDoExactHeaderMatching: false,
					requestHeader: '',
					requestBody: '',
					requestBodyType: 'application/json',
					statusCode: 200,
					expectedTextResponse: '',
					responseHeaders: '',
					binaryFile: null,
				},
				mockedRecoilFn,
			];
		});
	});

	it('should render AddMockForm with all input fields', async () => {
		let tree;
		await act(async () => {
			tree = await render(<AddMockForm />);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('add-mock-form')).toBeInTheDocument();

		expect(getByTestId('form-item-name')).toBeInTheDocument();
		expect(getByTestId('form-item-description')).toBeInTheDocument();
		expect(getByTestId('form-item-statusCode')).toBeInTheDocument();
		expect(getByTestId('form-item-route')).toBeInTheDocument();
		expect(getByTestId('route-tooltip')).toBeInTheDocument();

		expect(getByTestId('http-method-selector')).toBeInTheDocument();

		expect(getByTestId('query-param-wrapper')).toBeInTheDocument();
		expect(getByTestId('request-header-wrapper')).toBeInTheDocument();
		expect(getByTestId('request-body-wrapper')).toBeInTheDocument();
		expect(getByTestId('response-wrapper')).toBeInTheDocument();
		expect(getByTestId('response-headers-wrapper')).toBeInTheDocument();

		expect(getByTestId('create-mock-button')).toBeInTheDocument();
		expect(getByTestId('reset-button')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should create new mock on clicking submit', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');

		createMock.mockImplementation(() => Promise.resolve({}));

		let tree;
		await act(async () => {
			tree = await render(<AddMockForm />);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('add-mock-form')).toBeInTheDocument();
		expect(getByTestId('reset-button')).toBeInTheDocument();

		await act(async () => {
			fireEvent.change(getByTestId('input-name'), {
				target: { value: 'User mock' },
			});
			fireEvent.change(getByTestId('input-description'), {
				target: { value: 'new mock for users endpoint' },
			});
			fireEvent.change(getByTestId('input-statusCode'), {
				target: { value: '200' },
			});
			fireEvent.change(getByTestId('input-route'), {
				target: { value: '/api/v1/users' },
			});
			fireEvent.click(getByTestId('create-mock-button'));
		});

		const createMockData = new FormData();
		createMockData.append('name', 'User mock');
		createMockData.append('description', 'new mock for users endpoint');
		createMockData.append('route', '/api/v1/users');
		createMockData.append('statusCode', 200);
		createMockData.append('httpMethod', 'GET');
		createMockData.append('responseContentType', 'application/json');
		createMockData.append('queryParams', '');
		createMockData.append('shouldDoExactHeaderMatching', false);
		createMockData.append('requestHeader', '');
		createMockData.append('requestBody', '');
		createMockData.append('requestBodyType', 'application/json');
		createMockData.append('expectedTextResponse', '{"status":"success"}');
		createMockData.append('responseHeaders', '');

		expect(createMock).toHaveBeenCalledTimes(1);
		expect(createMock).toHaveBeenCalledWith(
			expect.objectContaining(createMockData)
		);

		expect(notificationSpy).toHaveBeenCalledTimes(1);
		expect(notificationSpy).toHaveBeenCalledWith({
			type: 'success',
			title: 'New mock created successfully',
			message: 'Mock can be accessed at /api/v1/users',
			animationIn: 'animate__slideInRight',
			animationOut: 'animate__slideOutRight',
		});

		expect(mockedRecoilFn).toHaveBeenLastCalledWith({
			name: '',
			description: '',
			route: '',
			httpMethod: 'GET',
			responseContentType: 'application/json',
			responseType: 'TEXTUAL_RESPONSE',
			queryParams: '',
			shouldDoExactHeaderMatching: false,
			requestHeader: '',
			requestBody: '',
			requestBodyType: 'application/json',
			statusCode: 200,
			expectedTextResponse: '',
			responseHeaders: '',
			binaryFile: new File([], ''),
		});

		expect(container).toMatchSnapshot();
	});

	it('should show error notification when createMock call fails', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');

		createMock.mockRejectedValue({
			response: {
				data: {
					message: 'Error creating mock',
				},
			},
		});

		let tree;
		await act(async () => {
			tree = await render(<AddMockForm />);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('add-mock-form')).toBeInTheDocument();
		expect(getByTestId('reset-button')).toBeInTheDocument();

		await act(async () => {
			fireEvent.change(getByTestId('input-name'), {
				target: { value: 'User mock' },
			});
			fireEvent.change(getByTestId('input-description'), {
				target: { value: 'new mock for users endpoint' },
			});
			fireEvent.change(getByTestId('input-statusCode'), {
				target: { value: '200' },
			});
			fireEvent.change(getByTestId('input-route'), {
				target: { value: '/api/v1/users' },
			});
			fireEvent.click(getByTestId('create-mock-button'));
		});

		const createMockData = new FormData();
		createMockData.append('name', 'User mock');
		createMockData.append('description', 'new mock for users endpoint');
		createMockData.append('route', '/api/v1/users');
		createMockData.append('statusCode', 200);
		createMockData.append('httpMethod', 'GET');
		createMockData.append('responseContentType', 'application/json');
		createMockData.append('queryParams', '');
		createMockData.append('shouldDoExactHeaderMatching', false);
		createMockData.append('requestHeader', '');
		createMockData.append('requestBody', '');
		createMockData.append('requestBodyType', 'application/json');
		createMockData.append('expectedTextResponse', '{"status":"success"}');
		createMockData.append('responseHeaders', '');

		expect(createMock).toHaveBeenCalledTimes(1);
		expect(createMock).toHaveBeenCalledWith(
			expect.objectContaining(createMockData)
		);

		expect(notificationSpy).toHaveBeenCalledTimes(1);
		expect(notificationSpy).toHaveBeenCalledWith({
			type: 'danger',
			title: 'Failed to create new mock',
			message: 'Error creating mock',
			animationIn: 'animate__bounceIn',
			animationOut: 'animate__bounceOut',
		});

		expect(mockedRecoilFn).toHaveBeenCalledTimes(4);

		expect(container).toMatchSnapshot();
	});

	it('should reset form data on clicking reset button', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');

		let tree;
		await act(async () => {
			tree = await render(<AddMockForm />);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('add-mock-form')).toBeInTheDocument();
		expect(getByTestId('create-mock-button')).toBeInTheDocument();

		await act(async () => {
			fireEvent.change(getByTestId('input-name'), {
				target: { value: 'User mock' },
			});
			fireEvent.change(getByTestId('input-description'), {
				target: { value: 'new mock for users endpoint' },
			});
			fireEvent.change(getByTestId('input-statusCode'), {
				target: { value: '200' },
			});
			fireEvent.change(getByTestId('input-route'), {
				target: { value: '/api/v1/users' },
			});
		});

		expect(getByTestId('input-name')).toHaveValue('User mock');
		expect(getByTestId('input-description')).toHaveValue(
			'new mock for users endpoint'
		);
		expect(getByTestId('input-statusCode')).toHaveValue('200');
		expect(getByTestId('input-route')).toHaveValue('/api/v1/users');

		await act(async () => {
			fireEvent.click(getByTestId('reset-button'));
		});

		expect(getByTestId('input-name')).toHaveValue('');
		expect(getByTestId('input-description')).toHaveValue('');
		expect(getByTestId('input-statusCode')).toHaveValue('200');
		expect(getByTestId('input-route')).toHaveValue('');

		expect(createMock).toHaveBeenCalledTimes(0);

		expect(notificationSpy).toHaveBeenCalledTimes(0);

		expect(mockedRecoilFn).toHaveBeenLastCalledWith({
			name: '',
			description: '',
			route: '',
			httpMethod: 'GET',
			responseContentType: 'application/json',
			responseType: 'TEXTUAL_RESPONSE',
			queryParams: '',
			shouldDoExactHeaderMatching: false,
			requestHeader: '',
			requestBody: '',
			requestBodyType: 'application/json',
			statusCode: 200,
			expectedTextResponse: '',
			responseHeaders: '',
			binaryFile: new File([], ''),
		});

		expect(container).toMatchSnapshot();
	});
});
