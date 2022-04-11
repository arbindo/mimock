import React, { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router';
import { Cookies } from 'react-cookie';
import { routes } from 'constants/routes';
import { getToken } from 'services/authentication/authentication.service';
import { isTokenValid } from 'services/authentication/validateToken.service';
import { FullPageLoader } from 'styles/Loaders';
import { globalConstants } from 'constants/globalConstants';
import {
	LoginFormContainer,
	Title,
	Underline,
	InputWrapper,
	Label,
	UserNameField,
	PasswordField,
	SubmitButton,
	ErrorLabel,
} from './LoginForm.style';
import { constants } from './constants';

export default function LoginForm() {
	const cookies = new Cookies();

	const authCookieRef = useRef('');
	const csrfCookieRef = useRef('');

	const [errorMessage, setErrorMessage] = useState('');
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [authCookie, setAuthCookie] = useState('');

	useEffect(() => {
		authCookieRef.current = cookies.get(globalConstants.AUTH_TOKEN_COOKIE_NAME);
		csrfCookieRef.current = cookies.get(globalConstants.XSRF_COOKIE_NAME);
	}, []);

	useEffect(() => {
		if (authCookieRef.current && csrfCookieRef.current) {
			isTokenValid()
				.then((status) => {
					if (status) {
						setAuthCookie(authCookieRef.current);
					} else {
						throw new Error('Invalid token');
					}
				})
				.catch(() => {
					clearCsrfCookie();
					clearAuthToken();
				});
		} else {
			clearCsrfCookie();
			clearAuthToken();
		}
	}, [authCookieRef.current, csrfCookieRef.current]);

	const clearCsrfCookie = () => {
		if (csrfCookieRef.current) {
			cookies.remove(globalConstants.XSRF_COOKIE_NAME, {
				path: '/',
			});
		}
	};

	const clearAuthToken = () => {
		if (authCookieRef.current) {
			cookies.remove(globalConstants.AUTH_TOKEN_COOKIE_NAME, {
				path: '/',
			});
		}
	};

	const isCredentialsValid = () => {
		if (userName === '') {
			setErrorMessage(constants.errors.userNameEmpty);
			return false;
		}

		if (password === '') {
			setErrorMessage(constants.errors.passwordEmpty);
			return false;
		}

		return true;
	};

	const resetError = () => {
		setErrorMessage('');
	};

	const authenticateUser = async () => {
		if (!isCredentialsValid()) {
			return;
		}

		await getToken(userName, password)
			.then((token) => {
				setAuthCookie(token);
			})
			.catch(() => {
				clearCsrfCookie();
				setErrorMessage(constants.errors.loginFailed);
			});
	};

	return (
		<LoginFormContainer data-testid='login-form'>
			<FullPageLoader />

			<If condition={authCookie}>
				<Navigate to={routes.mocks.path} replace={true} />
			</If>

			<Title>Login to mimock</Title>
			<Underline />

			<InputWrapper
				onSubmit={(e) => {
					e.preventDefault();
					resetError();
					authenticateUser();
				}}
			>
				<Label data-testid='login-username-label'>
					{constants.labels.userName}
				</Label>
				<UserNameField
					data-testid='login-username-input'
					placeholder={constants.placeholders.userName}
					required
					autoComplete='off'
					value={userName}
					onChange={(e) => {
						resetError();
						setUserName(e.currentTarget.value);
					}}
				/>

				<Label data-testid='login-password-label'>
					{constants.labels.password}
				</Label>
				<PasswordField
					data-testid='login-password-input'
					type='password'
					placeholder={constants.placeholders.password}
					required
					autoComplete='off'
					value={password}
					onChange={(e) => {
						resetError();
						setPassword(e.currentTarget.value);
					}}
				/>

				<SubmitButton
					dataTestid='login-submit'
					background='bg-teal-500'
					label='Login'
					color='text-white'
					width='w-full'
					additionalStyles='mt-5'
					type='submit'
				/>
			</InputWrapper>
			<If condition={errorMessage}>
				<ErrorLabel data-testid='login-error-label'>{errorMessage}</ErrorLabel>
			</If>
		</LoginFormContainer>
	);
}
