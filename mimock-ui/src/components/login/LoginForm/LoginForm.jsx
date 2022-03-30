import React from 'react';
import {
	LoginFormContainer,
	Title,
	Underline,
	InputWrapper,
	Label,
	UserNameField,
	PasswordField,
	SubmitButton,
} from './LoginForm.style';

export default function LoginForm() {
	return (
		<LoginFormContainer>
			<Title>Login to mimock</Title>
			<Underline />

			<InputWrapper>
				<Label>USER NAME</Label>
				<UserNameField placeholder='Enter username' />

				<Label>PASSWORD</Label>
				<PasswordField type='password' placeholder='Enter password' />

				<SubmitButton
					background='bg-teal-500'
					label='Login'
					color='text-white'
					width='w-full'
					additionalStyles='mt-5'
					type='submit'
				/>
			</InputWrapper>
		</LoginFormContainer>
	);
}
