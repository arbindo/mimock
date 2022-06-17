import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import { mockedCookieGet } from 'mocks/cookieMock';
import RoleBasedNavigator from './RoleBasedNavigator';

let mockedRecoilFn;
jest.mock('recoil', () => {
	mockedRecoilFn = jest.fn();
	return {
		atom: jest.fn(),
		useRecoilState: jest.fn(() => [true, mockedRecoilFn]),
	};
});
jest.mock('react-router-dom');

describe('AdminNavigator', () => {
	const TestComponent = () => {
		return <div data-testid='child'>Child component</div>;
	};

	it('should render child when auth token is valid', async () => {
		mockedCookieGet.mockImplementation(() => {
			return 'eyJpYXQiOiJNb24gQXByIDExIDIzOjQ0OjI3IElTVCAyMDIyIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VyTmFtZSI6Im1pbW9ja19hZG1pbiIsInVzZXJSb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6Im1pbW9ja19hZG1pbiIsImV4cCI6MTY0OTcwMjY2N30.LPui9yRnbtittDutEi6F05zNi4mUe_2plNx2EROxo_k';
		});

		let tree;
		await act(async () => {
			tree = await render(
				<RoleBasedNavigator allowedRoles={['ROLE_ADMIN']}>
					<TestComponent />
				</RoleBasedNavigator>
			);
		});
		const { getByTestId, container, queryByTestId } = tree;

		await waitFor(() => {
			expect(mockedRecoilFn).toHaveBeenCalledTimes(2);
			expect(mockedRecoilFn).nthCalledWith(1, true);
			expect(mockedRecoilFn).nthCalledWith(2, false);

			expect(getByTestId('child')).toBeInTheDocument();
			expect(queryByTestId('navigator')).not.toBeInTheDocument();
			expect(container).toMatchSnapshot();
		});
	});

	it('should show permission error page when auth token is empty', async () => {
		mockedCookieGet.mockImplementation(() => {
			return '';
		});

		let tree;
		await act(async () => {
			tree = await render(
				<RoleBasedNavigator allowedRoles={['ROLE_ADMIN']}>
					<TestComponent />
				</RoleBasedNavigator>
			);
		});
		const { getByTestId, container, queryByTestId } = tree;

		await waitFor(() => {
			expect(mockedRecoilFn).toHaveBeenCalledTimes(2);
			expect(mockedRecoilFn).nthCalledWith(1, true);
			expect(mockedRecoilFn).nthCalledWith(2, false);

			expect(getByTestId('permission-error-page')).toBeInTheDocument();
			expect(queryByTestId('child')).not.toBeInTheDocument();
			expect(container).toMatchSnapshot();
		});
	});

	it('should show permission error page when auth token is invalid', async () => {
		mockedCookieGet.mockImplementation(() => {
			return 'invalid.token';
		});

		let tree;
		await act(async () => {
			tree = await render(
				<RoleBasedNavigator allowedRoles={['ROLE_ADMIN']}>
					<TestComponent />
				</RoleBasedNavigator>
			);
		});
		const { getByTestId, container, queryByTestId } = tree;

		await waitFor(() => {
			expect(mockedRecoilFn).toHaveBeenCalledTimes(2);
			expect(mockedRecoilFn).nthCalledWith(1, true);
			expect(mockedRecoilFn).nthCalledWith(2, false);

			expect(getByTestId('permission-error-page')).toBeInTheDocument();
			expect(queryByTestId('child')).not.toBeInTheDocument();
			expect(container).toMatchSnapshot();
		});
	});

	it('should show permission error page when user role is not permitted', async () => {
		mockedCookieGet.mockImplementation(() => {
			return 'eyJpYXQiOiJNb24gQXByIDExIDIzOjQ0OjI3IElTVCAyMDIyIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VyTmFtZSI6Im1pbW9ja191c2VyIiwidXNlclJvbGUiOiJST0xFX1ZJRVdFUiIsInN1YiI6Im1pbW9ja19hZG1pbiIsImV4cCI6MTY0OTcwMjY2N30.LPui9yRnbtittDutEi6F05zNi4mUe_2plNx2EROxo_k';
		});

		let tree;
		await act(async () => {
			tree = await render(
				<RoleBasedNavigator allowedRoles={['ROLE_ADMIN', 'ROLE_MANAGER']}>
					<TestComponent />
				</RoleBasedNavigator>
			);
		});
		const { getByTestId, container, queryByTestId } = tree;

		await waitFor(() => {
			expect(mockedRecoilFn).toHaveBeenCalledTimes(2);
			expect(mockedRecoilFn).nthCalledWith(1, true);
			expect(mockedRecoilFn).nthCalledWith(2, false);

			expect(getByTestId('permission-error-page')).toBeInTheDocument();
			expect(queryByTestId('child')).not.toBeInTheDocument();
			expect(container).toMatchSnapshot();
		});
	});
});
