import React from 'react';
import { act, render } from '@testing-library/react';
import { useRecoilState } from 'recoil';
import { getHttpMethods } from 'services/staticRecords/getHttpMethods.service';
import AddMockForm from './AddMockForm';

let mockedRecoilFn = jest.fn();
jest.mock('recoil');
jest.mock('services/staticRecords/getHttpMethods.service');

describe('AddMockFrom', () => {
	beforeEach(() => {
		getHttpMethods.mockResolvedValue(['GET', 'POST', 'DELETE']);

		useRecoilState.mockImplementation(() => {
			return [
				{
					name: 'Tester',
					httpMethod: '',
					route: '',
					requestHeader: '',
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

		expect(getByTestId('query-param-form')).toBeInTheDocument();
		expect(getByTestId('request-header-form')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
