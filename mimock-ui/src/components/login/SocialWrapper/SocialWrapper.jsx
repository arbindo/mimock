import React from 'react';
import { FaSlack, FaGithub } from 'react-icons/fa';
import {
	SocialWrapperContainer,
	LogoWrapper,
	SocialIconsWrapper,
	Title,
	Description,
	LicenseFooter,
	TopWrapper,
	Link,
} from './SocialWrapper.style';
import { constants } from '../constants.js';

export default function SocialWrapper() {
	return (
		<SocialWrapperContainer data-testid='login-social-wrapper'>
			<TopWrapper>
				<LogoWrapper data-testid='login-social-logo' />
				<Title data-testid='login-social-title'>{constants.title}</Title>
				<Description data-testid='login-social-description'>
					{constants.description}
				</Description>
				<SocialIconsWrapper data-testid='login-social-icons'>
					<Link
						data-testid='slack-logo'
						href={constants.link.slack}
						target='_blank'
					>
						<FaSlack />
					</Link>
					<Link
						data-testid='gh-logo'
						href={constants.link.github}
						target='_blank'
					>
						<FaGithub />
					</Link>
				</SocialIconsWrapper>
			</TopWrapper>
			<LicenseFooter data-testid='login-social-license-label'>
				{constants.license}
			</LicenseFooter>
		</SocialWrapperContainer>
	);
}
