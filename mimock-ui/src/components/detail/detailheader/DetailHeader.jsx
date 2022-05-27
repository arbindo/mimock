import React from 'react';
import {
	HeaderContainer,
	TitleContainer,
	Title,
	Subtitle,
	MetaContainer,
	Badge,
	MetaInner,
	Link,
	LinkDiv,
	LinkText,
} from './DetailHeader.style';
import { FaLink } from 'react-icons/fa';
import PropTypes from 'prop-types';

function DetailHeader({ mock, badgeColor }) {
	return (
		<HeaderContainer data-testid='detail-header-section'>
			<TitleContainer>
				<Title>{mock.mockName}</Title>
				<Subtitle>{mock.description}</Subtitle>
				<Link>
					<LinkDiv>
						<FaLink /> <LinkText>{mock.route}</LinkText>
					</LinkDiv>
				</Link>
			</TitleContainer>
			<MetaContainer>
				<MetaInner>
					<Badge className={badgeColor}>{mock.httpMethod.method}</Badge>
				</MetaInner>
			</MetaContainer>
		</HeaderContainer>
	);
}

DetailHeader.propTypes = {
	mock: PropTypes.object.isRequired,
	badgeColor: PropTypes.string.isRequired,
};

export default DetailHeader;
