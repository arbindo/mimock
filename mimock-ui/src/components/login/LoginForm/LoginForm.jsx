import React, { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router';
import { Cookies } from 'react-cookie';
import { routes } from 'constants/routes';
import { getToken } from 'services/authentication/authentication.service';
import { isTokenValid } from 'services/authentication/validateToken.service';
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

function LoginForm() {
	// #region Defaults
	const cookies = new Cookies();
	const { labels, placeholders, errors, testIds } = constants;
	// #endregion

	// #region States
	const [errorMessage, setErrorMessage] = useState('');
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [authCookie, setAuthCookie] = useState('');
	// #endregion

	// #region Common Hooks
	const authCookieRef = useRef('');
	const csrfCookieRef = useRef('');
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
	// #endregion

	// #region Handler functions
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
			setErrorMessage(errors.userNameEmpty);
			return false;
		}

		if (password === '') {
			setErrorMessage(errors.passwordEmpty);
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
				setErrorMessage(errors.loginFailed);
			});
	};
	// #endregion

	return (
		<LoginFormContainer data-testid={testIds.loginForm}>
			<If condition={authCookie}>
				<Navigate to={routes.mocks.path} replace={true} />
			</If>

			<Title>{labels.loginFormTitle}</Title>
			<Underline />

			<InputWrapper
				onSubmit={(e) => {
					e.preventDefault();
					resetError();
					authenticateUser();
				}}
			>
				<Label data-testid={testIds.userNameLabel}>{labels.userName}</Label>
				<UserNameField
					data-testid={testIds.userNameInput}
					placeholder={placeholders.userName}
					required
					autoComplete='off'
					value={userName}
					onChange={(e) => {
						resetError();
						setUserName(e.currentTarget.value);
					}}
				/>

				<Label data-testid={testIds.passwordLabel}>{labels.password}</Label>
				<PasswordField
					data-testid={testIds.passwordInput}
					type='password'
					placeholder={placeholders.password}
					required
					autoComplete='off'
					value={password}
					onChange={(e) => {
						resetError();
						setPassword(e.currentTarget.value);
					}}
				/>

				<SubmitButton
					dataTestid={testIds.loginBtn}
					background='bg-teal-500'
					label={labels.loginBtn}
					color='text-white'
					width='w-full'
					additionalStyles='mt-5'
					type='submit'
				/>
			</InputWrapper>
			<If condition={errorMessage}>
				<ErrorLabel data-testid={testIds.loginFailedLabel}>
					{errorMessage}
				</ErrorLabel>
			</If>
		</LoginFormContainer>
	);
}

export default LoginForm;
