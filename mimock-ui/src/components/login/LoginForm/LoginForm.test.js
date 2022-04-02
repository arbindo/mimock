import React from 'react';
import LoginForm from './LoginForm';
import * as Api from 'services/authentication/authentication.service';
import { render, fireEvent, act } from '@testing-library/react';

const mockedNavigation = jest.fn(() => {});
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedNavigation,
}));

const mockedCookieSet = jest.fn();
jest.mock('react-cookie', () => ({
	Cookies: jest.fn().mockImplementation(() => ({
		set: mockedCookieSet,
		get: () => jest.fn(),
	})),
}));

jest.mock('recoil', () => ({
	atom: jest.fn(),
	useRecoilState: jest.fn(() => []),
}));

describe('LoginForm', () => {
	let mockedGetToken;

	beforeEach(() => {
		mockedGetToken = jest
			.spyOn(Api, 'getToken')
			.mockResolvedValue({ data: { token: 'token' } });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.resetAllMocks();
	});

	it('should render login form', async () => {
		const tree = await render(<LoginForm />);

		const { container, getByTestId, queryByTestId } = tree;

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

	it('should enter credentials to login', async () => {
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

		const loginBtn = getByTestId('login-submit');
		await fireEvent.click(loginBtn);

		await act(() => {
			expect(mockedGetToken).toHaveBeenCalledTimes(1);
			expect(mockedGetToken).toHaveBeenCalledWith('mimock_user', 'test@123');

			expect(mockedCookieSet).toHaveBeenCalledTimes(1);
			expect(mockedCookieSet).toHaveBeenCalledWith('__authToken', 'token');

			expect(mockedNavigation).toBeCalledTimes(1);
			expect(mockedNavigation).toHaveBeenCalledWith('/mocks', {
				replace: true,
			});
		});

		expect(queryByTestId('login-error-label')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should show error message when user name is empty', async () => {
		const tree = await render(<LoginForm />);

		const { container, getByTestId } = tree;

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
			expect(mockedNavigation).toBeCalledTimes(0);
		});

		expect(getByTestId('login-error-label')).toBeInTheDocument();
		expect(getByTestId('login-error-label').textContent).toStrictEqual(
			'Username cannot be empty'
		);

		expect(container).toMatchSnapshot();
	});

	it('should show error message when password is empty', async () => {
		const tree = await render(<LoginForm />);

		const { container, getByTestId } = tree;

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
			expect(mockedNavigation).toBeCalledTimes(0);
		});

		expect(getByTestId('login-error-label')).toBeInTheDocument();
		expect(getByTestId('login-error-label').textContent).toStrictEqual(
			'Password cannot be empty'
		);

		expect(container).toMatchSnapshot();
	});

	it('should show error message credentials are empty', async () => {
		const tree = await render(<LoginForm />);

		const { container, getByTestId } = tree;

		const loginBtn = getByTestId('login-submit');
		await fireEvent.click(loginBtn);

		await act(() => {
			expect(mockedGetToken).toHaveBeenCalledTimes(0);
			expect(mockedCookieSet).toHaveBeenCalledTimes(0);
			expect(mockedNavigation).toBeCalledTimes(0);
		});

		expect(getByTestId('login-error-label')).toBeInTheDocument();
		expect(getByTestId('login-error-label').textContent).toStrictEqual(
			'Username cannot be empty'
		);

		expect(container).toMatchSnapshot();
	});

	it('should show error message when getToken api call fails', async () => {
		const tree = await render(<LoginForm />);

		const { container, getByTestId } = tree;

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
			.spyOn(Api, 'getToken')
			.mockRejectedValue(new Error('Api call failed'));

		const loginBtn = getByTestId('login-submit');
		await fireEvent.click(loginBtn);

		await act(() => {
			expect(mockedGetToken).toHaveBeenCalledTimes(1);
			expect(mockedGetToken).toHaveBeenCalledWith('mimock_user', 'test@123');

			expect(mockedCookieSet).toHaveBeenCalledTimes(0);
			expect(mockedNavigation).toBeCalledTimes(0);
		});

		expect(getByTestId('login-error-label')).toBeInTheDocument();
		expect(getByTestId('login-error-label').textContent).toStrictEqual(
			'User login failed. Please try again.'
		);

		expect(container).toMatchSnapshot();
	});
});
