import React from 'react';
import * as AuthApi from 'services/authentication/authentication.service';
import * as ValidationApi from 'services/authentication/validateToken.service';
import {
	mockedCookieGet,
	mockedCookieSet,
	mockedCookieRemove,
	mockGetImplementation,
} from 'mocks/cookieMock';
import LoginForm from './LoginForm';
import { render, fireEvent, act, waitFor } from '@testing-library/react';

jest.mock('react-router', () => ({
	...jest.requireActual('react-router'),
	// eslint-disable-next-line react/prop-types
	Navigate: ({ to, replace }) => {
		return (
			<div data-testid='react-router-navigator'>
				<div data-testid='navigate-to'>{to}</div>
				{replace && <div data-testid='navigate-replace'>true</div>}
			</div>
		);
	},
}));
jest.mock('styles/Loaders');

describe('LoginForm', () => {
	let mockedGetToken;
	let mockedTokenValidation;

	beforeEach(() => {
		mockedGetToken = jest
			.spyOn(AuthApi, 'getToken')
			.mockResolvedValue({ token: 'token' });

		mockedTokenValidation = jest
			.spyOn(ValidationApi, 'isTokenValid')
			.mockResolvedValue(true);

		mockedCookieGet.mockImplementation(() => null);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.resetAllMocks();
	});

	it('should render login form when user is not already logged in', async () => {
		mockedCookieGet.mockImplementation((key) => {
			if (key === 'XSRF-TOKEN') return 'token';

			return null;
		});

		const tree = await render(<LoginForm />);

		const { container, getByTestId, queryByTestId } = tree;

		await act(async () => {
			expect(mockedCookieGet).toHaveBeenCalledTimes(2);
			expect(mockedCookieGet).toHaveBeenNthCalledWith(1, '__authToken');
			expect(mockedCookieGet).toHaveBeenNthCalledWith(2, 'XSRF-TOKEN');

			expect(mockedCookieRemove).toHaveBeenCalledTimes(1);
			expect(mockedCookieRemove).toHaveBeenNthCalledWith(1, 'XSRF-TOKEN', {
				path: '/',
			});
		});

		expect(getByTestId('login-username-label')).toBeInTheDocument();
		expect(getByTestId('login-username-label').textContent).toStrictEqual(
			'USER NAME'
		);

		expect(getByTestId('login-password-label')).toBeInTheDocument();
		expect(getByTestId('login-password-label').textContent).toStrictEqual(
			'PASSWORD'
		);

		expect(getByTestId('login-username-input')).toBeInTheDocument();
		expect(getByTestId('login-password-input')).toBeInTheDocument();

		expect(getByTestId('login-submit')).toBeInTheDocument();

		expect(queryByTestId('login-error-label')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should navigate to mocks page when user is already authenticated', async () => {
		mockGetImplementation();

		const tree = await render(<LoginForm />);

		const { container, getByTestId, queryByTestId } = tree;

		await act(async () => {
			expect(mockedCookieGet).toHaveBeenCalledTimes(2);
			expect(mockedCookieGet).toHaveBeenNthCalledWith(1, '__authToken');
			expect(mockedCookieGet).toHaveBeenNthCalledWith(2, 'XSRF-TOKEN');

			expect(mockedCookieRemove).toHaveBeenCalledTimes(0);

			expect(mockedTokenValidation).toHaveBeenCalledTimes(1);
		});

		expect(getByTestId('login-username-label')).toBeInTheDocument();
		expect(getByTestId('login-username-label').textContent).toStrictEqual(
			'USER NAME'
		);

		expect(getByTestId('login-password-label')).toBeInTheDocument();
		expect(getByTestId('login-password-label').textContent).toStrictEqual(
			'PASSWORD'
		);

		expect(getByTestId('login-username-input')).toBeInTheDocument();
		expect(getByTestId('login-password-input')).toBeInTheDocument();

		expect(getByTestId('login-submit')).toBeInTheDocument();

		expect(queryByTestId('login-error-label')).not.toBeInTheDocument();

		await act(async () => {
			expect(mockedGetToken).toHaveBeenCalledTimes(0);

			await waitFor(() => {
				expect(getByTestId('react-router-navigator')).toBeInTheDocument();

				expect(getByTestId('navigate-to')).toBeInTheDocument();
				expect(getByTestId('navigate-to').textContent).toBe('/mimock-ui/mocks');

				expect(getByTestId('navigate-replace')).toBeInTheDocument();
				expect(getByTestId('navigate-replace').textContent).toBe('true');
			});
		});

		expect(container).toMatchSnapshot();
	});

	it('should clear auth cookies when auth token is invalid', async () => {
		mockGetImplementation();
		mockedTokenValidation = jest
			.spyOn(ValidationApi, 'isTokenValid')
			.mockResolvedValue(false);

		const tree = await render(<LoginForm />);

		const { container, getByTestId, queryByTestId } = tree;

		await waitFor(async () => {
			expect(mockedCookieGet).toHaveBeenCalledTimes(2);
			expect(mockedCookieGet).toHaveBeenNthCalledWith(1, '__authToken');
			expect(mockedCookieGet).toHaveBeenNthCalledWith(2, 'XSRF-TOKEN');

			expect(mockedCookieRemove).toHaveBeenCalledTimes(2);
			expect(mockedCookieRemove).toHaveBeenNthCalledWith(1, 'XSRF-TOKEN', {
				path: '/',
			});
			expect(mockedCookieRemove).toHaveBeenNthCalledWith(2, '__authToken', {
				path: '/',
			});

			expect(mockedTokenValidation).toHaveBeenCalledTimes(1);
		});

		expect(getByTestId('login-username-label')).toBeInTheDocument();
		expect(getByTestId('login-username-label').textContent).toStrictEqual(
			'USER NAME'
		);

		expect(getByTestId('login-password-label')).toBeInTheDocument();
		expect(getByTestId('login-password-label').textContent).toStrictEqual(
			'PASSWORD'
		);

		expect(getByTestId('login-username-input')).toBeInTheDocument();
		expect(getByTestId('login-password-input')).toBeInTheDocument();

		expect(getByTestId('login-submit')).toBeInTheDocument();

		expect(queryByTestId('login-error-label')).not.toBeInTheDocument();

		await act(async () => {
			expect(mockedGetToken).toHaveBeenCalledTimes(0);

			await waitFor(() => {
				expect(queryByTestId('react-router-navigator')).not.toBeInTheDocument();
			});
		});

		expect(container).toMatchSnapshot();
	});

	it('should enter credentials to login', async () => {
		mockedCookieGet.mockImplementation((key) => {
			if (key === '__authToken') return 'token';

			return null;
		});

		const { container, getByTestId, queryByTestId } = await render(
			<LoginForm />
		);

		await act(async () => {
			expect(mockedCookieGet).toHaveBeenCalledTimes(2);
			expect(mockedCookieGet).toHaveBeenNthCalledWith(1, '__authToken');
			expect(mockedCookieGet).toHaveBeenNthCalledWith(2, 'XSRF-TOKEN');

			expect(mockedCookieRemove).toHaveBeenCalledTimes(1);
			expect(mockedCookieRemove).toHaveBeenCalledWith('__authToken', {
				path: '/',
			});

			const userName = getByTestId('login-username-input');
			await fireEvent.change(userName, {
				target: {
					value: 'mimock_user',
				},
			});
			expect(userName.value).toBe('mimock_user');

			const password = getByTestId('login-password-input');
			await fireEvent.change(password, {
				target: {
					value: 'test@123',
				},
			});
			expect(password.value).toBe('test@123');
		});

		await act(async () => {
			const loginBtn = getByTestId('login-submit');
			await fireEvent.click(loginBtn);
		});

		await act(async () => {
			expect(mockedGetToken).toHaveBeenCalledTimes(1);
			expect(mockedGetToken).toHaveBeenCalledWith('mimock_user', 'test@123');

			await waitFor(() => {
				expect(getByTestId('react-router-navigator')).toBeInTheDocument();

				expect(getByTestId('navigate-to')).toBeInTheDocument();
				expect(getByTestId('navigate-to').textContent).toBe('/mimock-ui/mocks');

				expect(getByTestId('navigate-replace')).toBeInTheDocument();
				expect(getByTestId('navigate-replace').textContent).toBe('true');
			});
		});

		expect(queryByTestId('login-error-label')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should show error message when user name is empty', async () => {
		const tree = await render(<LoginForm />);

		const { container, getByTestId, queryByTestId } = tree;

		await act(async () => {
			const password = getByTestId('login-password-input');
			await fireEvent.change(password, {
				target: {
					value: 'test@123',
				},
			});
			expect(password.value).toBe('test@123');
		});

		const loginBtn = getByTestId('login-submit');
		await fireEvent.click(loginBtn);

		await act(() => {
			expect(mockedGetToken).toHaveBeenCalledTimes(0);
			expect(mockedCookieSet).toHaveBeenCalledTimes(0);
			expect(queryByTestId('react-router-navigator')).not.toBeInTheDocument();
		});

		expect(getByTestId('login-error-label')).toBeInTheDocument();
		expect(getByTestId('login-error-label').textContent).toStrictEqual(
			'Username cannot be empty'
		);

		expect(container).toMatchSnapshot();
	});

	it('should show error message when password is empty', async () => {
		const tree = await render(<LoginForm />);

		const { container, getByTestId, queryByTestId } = tree;

		await act(async () => {
			const userName = getByTestId('login-username-input');
			await fireEvent.change(userName, {
				target: {
					value: 'mimock_user',
				},
			});
			expect(userName.value).toBe('mimock_user');
		});

		const loginBtn = getByTestId('login-submit');
		await fireEvent.click(loginBtn);

		await act(() => {
			expect(mockedGetToken).toHaveBeenCalledTimes(0);
			expect(mockedCookieSet).toHaveBeenCalledTimes(0);
			expect(queryByTestId('react-router-navigator')).not.toBeInTheDocument();
		});

		expect(getByTestId('login-error-label')).toBeInTheDocument();
		expect(getByTestId('login-error-label').textContent).toStrictEqual(
			'Password cannot be empty'
		);

		expect(container).toMatchSnapshot();
	});

	it('should show error message credentials are empty', async () => {
		const tree = await render(<LoginForm />);

		const { container, getByTestId, queryByTestId } = tree;

		const loginBtn = getByTestId('login-submit');
		await fireEvent.click(loginBtn);

		await act(async () => {
			expect(mockedGetToken).toHaveBeenCalledTimes(0);
			expect(mockedCookieSet).toHaveBeenCalledTimes(0);
			expect(queryByTestId('react-router-navigator')).not.toBeInTheDocument();
		});

		expect(getByTestId('login-error-label')).toBeInTheDocument();
		expect(getByTestId('login-error-label').textContent).toStrictEqual(
			'Username cannot be empty'
		);

		expect(container).toMatchSnapshot();
	});

	it('should show error message when getToken api call fails', async () => {
		const tree = await render(<LoginForm />);

		const { container, getByTestId, queryByTestId } = tree;

		await act(async () => {
			const userName = getByTestId('login-username-input');
			await fireEvent.change(userName, {
				target: {
					value: 'mimock_user',
				},
			});
			expect(userName.value).toBe('mimock_user');

			const password = getByTestId('login-password-input');
			await fireEvent.change(password, {
				target: {
					value: 'test@123',
				},
			});
			expect(password.value).toBe('test@123');
		});

		mockedGetToken = jest
			.spyOn(AuthApi, 'getToken')
			.mockRejectedValue(new Error('Api call failed'));

		const loginBtn = getByTestId('login-submit');
		await fireEvent.click(loginBtn);

		await act(async () => {
			expect(mockedGetToken).toHaveBeenCalledTimes(1);
			expect(mockedGetToken).toHaveBeenCalledWith('mimock_user', 'test@123');

			expect(mockedCookieSet).toHaveBeenCalledTimes(0);
			expect(queryByTestId('react-router-navigator')).not.toBeInTheDocument();
		});

		expect(getByTestId('login-error-label')).toBeInTheDocument();
		expect(getByTestId('login-error-label').textContent).toStrictEqual(
			'User login failed. Please try again.'
		);

		expect(container).toMatchSnapshot();
	});
});
