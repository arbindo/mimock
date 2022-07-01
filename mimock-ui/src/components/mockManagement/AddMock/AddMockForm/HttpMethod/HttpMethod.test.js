import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import { useRecoilState } from 'recoil';
import { getHttpMethods } from 'services/staticRecords/getHttpMethods.service';
import HttpMethod from './HttpMethod';

let mockedRecoilFn = jest.fn();
jest.mock('recoil');
jest.mock('services/staticRecords/getHttpMethods.service');

describe('HttpMethod', () => {
	beforeEach(() => {
		getHttpMethods.mockResolvedValue(['GET', 'POST', 'DELETE']);

		useRecoilState.mockImplementation(() => {
			return [
				{
					name: 'Tester',
					httpMethod: '',
				},
				mockedRecoilFn,
			];
		});
	});

	it('should render HttpMethod with methods fetched from api', async () => {
		let tree;

		await act(async () => {
			tree = await render(<HttpMethod selectedMethod='GET' />);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('http-method-selector')).toBeInTheDocument();
		expect(getByTestId('http-methods-label')).toHaveTextContent('HTTP Method');
		expect(getByTestId('http-methods')).toBeInTheDocument();

		expect(getByTestId('http-methods').value).toBe('GET');
		expect(getByTestId('http-methods').options).toHaveLength(3);

		expect(getHttpMethods).toHaveBeenCalledTimes(1);

		expect(container).toMatchSnapshot();
	});

	it('should set HTTP method on change', async () => {
		let tree;

		await act(async () => {
			tree = await render(<HttpMethod />);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('http-method-selector')).toBeInTheDocument();
		expect(getByTestId('http-methods-label')).toHaveTextContent('HTTP Method');
		expect(getByTestId('http-methods')).toBeInTheDocument();

		await act(async () => {
			fireEvent.change(getByTestId('http-methods'), {
				target: { value: 'POST' },
			});
		});

		expect(getByTestId('http-methods').value).toBe('POST');

		expect(getHttpMethods).toHaveBeenCalledTimes(1);

		expect(container).toMatchSnapshot();
	});
});
