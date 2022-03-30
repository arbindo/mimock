import React from 'react';
import { LoginWrapper, InnerFlex, FormContainer } from './Login.style';
import SocialWrapper from './SocialWrapper';
import LoginForm from './LoginForm';

export default function Login() {
	return (
		<LoginWrapper>
			<InnerFlex>
				<SocialWrapper />
				<FormContainer>
					<LoginForm />
				</FormContainer>
			</InnerFlex>
		</LoginWrapper>
	);
}
