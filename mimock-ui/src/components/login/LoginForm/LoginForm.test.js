import React from 'react';
import LoginForm from './LoginForm';
import { render, fireEvent, act } from '@testing-library/react';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
	return {
		useNavigate: () => mockNavigate,
	};
});

describe('LoginForm', () => {
	afterEach(() => {
		jest.clearAllMocks();
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

	it.skip('should enter credentials to login', async () => {
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

		expect(mockNavigate()).toHaveBeenCalledTimes(1);
		expect(mockNavigate).toHaveBeenCalledWith('/mocks');

		expect(queryByTestId('login-error-label')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
