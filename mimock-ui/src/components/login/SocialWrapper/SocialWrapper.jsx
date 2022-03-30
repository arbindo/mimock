import React from 'react';
import {
	SocialWrapperContainer,
	LogoWrapper,
	SocialIconsWrapper,
	Title,
	Description,
	LicenseFooter,
	TopWrapper,
} from './SocialWrapper.style';
import { FaSlack, FaGithub } from 'react-icons/fa';

export default function SocialWrapper() {
	return (
		<SocialWrapperContainer>
			<TopWrapper>
				<LogoWrapper />
				<Title>MIMOCK</Title>
				<Description>PLATFORM TO MOCK REST ENDPOINTS</Description>
				<SocialIconsWrapper>
					<FaSlack />
					<FaGithub />
				</SocialIconsWrapper>
			</TopWrapper>
			<LicenseFooter>Apache-2.0 Licensed</LicenseFooter>
		</SocialWrapperContainer>
	);
}
