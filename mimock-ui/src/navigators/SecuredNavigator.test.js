import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import { isTokenValid } from 'services/authentication/validateToken.service';
import { Navigate } from 'react-router-dom';
import SecuredNavigator from './SecuredNavigator';

let mockedRecoilFn;
jest.mock('recoil', () => {
	mockedRecoilFn = jest.fn();
	return {
		atom: jest.fn(),
		useRecoilState: jest.fn(() => [true, mockedRecoilFn]),
	};
});
jest.mock('services/authentication/validateToken.service');
jest.mock('react-router-dom');

describe('SecuredNavigator', () => {
	const TestComponent = () => {
		return <div data-testid='child'>Child component</div>;
	};

	beforeAll(() => {
		Navigate.mockImplementation(() => {
			return <div data-testid='navigator'>Navigator</div>;
		});
	});

	it('should render child when token validation is successful', async () => {
		isTokenValid.mockResolvedValue(true);

		let tree;
		await act(async () => {
			tree = await render(
				<SecuredNavigator>
					<TestComponent />
				</SecuredNavigator>
			);
		});
		const { getByTestId, container, queryByTestId } = tree;

		await waitFor(() => {
			expect(mockedRecoilFn).toHaveBeenCalledTimes(2);
			expect(mockedRecoilFn).toHaveBeenNthCalledWith(1, true);
			expect(mockedRecoilFn).toHaveBeenNthCalledWith(2, false);

			expect(getByTestId('child')).toBeInTheDocument();
			expect(queryByTestId('fullpage-loader')).not.toBeInTheDocument();
			expect(queryByTestId('navigator')).not.toBeInTheDocument();
			expect(container).toMatchSnapshot();
		});
	});

	it('should navigate to home page when auth token validation fails', async () => {
		isTokenValid.mockRejectedValue(new Error('Validation failed'));

		let tree;
		await act(async () => {
			tree = await render(
				<SecuredNavigator>
					<TestComponent />
				</SecuredNavigator>
			);
		});
		const { getByTestId, container, queryByTestId } = tree;

		await waitFor(() => {
			expect(mockedRecoilFn).toHaveBeenCalledTimes(2);
			expect(mockedRecoilFn).toHaveBeenNthCalledWith(1, true);
			expect(mockedRecoilFn).toHaveBeenNthCalledWith(2, false);

			expect(getByTestId('navigator')).toBeInTheDocument();
			expect(queryByTestId('child')).not.toBeInTheDocument();
			expect(queryByTestId('fullpage-loader')).not.toBeInTheDocument();
			expect(container).toMatchSnapshot();
		});
	});
});
