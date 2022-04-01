import React, { useState } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { getToken } from 'api/MimockApi';
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
	const navigate = useNavigate();

	const [errorMessage, setErrorMessage] = useState('');
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

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
			.then((res) => {
				const { token } = res.data;
				cookies.set('__authToken', token);
				navigate('/mocks');
			})
			.catch(() => {
				setErrorMessage(constants.errors.loginFailed);
			});
	};

	return (
		<LoginFormContainer data-testid='login-form'>
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
