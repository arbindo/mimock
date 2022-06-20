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
import { constants } from './constants';

function DetailHeader({ mock, badgeColor }) {
	return (
		<HeaderContainer data-testid={constants.testIds.detailHeaderContainer}>
			<TitleContainer data-testid={constants.testIds.titleContainer}>
				<Title data-testid={constants.testIds.mockTitle}>{mock.mockName}</Title>
				<Subtitle data-testid={constants.testIds.mockSubtitle}>
					{mock.description}
				</Subtitle>
				<Link data-testid={constants.testIds.mockLink}>
					<LinkDiv>
						<FaLink /> <LinkText>{mock.route}</LinkText>
					</LinkDiv>
				</Link>
			</TitleContainer>
			<MetaContainer data-testid={constants.testIds.metaContainer}>
				<MetaInner>
					<Badge
						data-testid={constants.testIds.mockBadge}
						className={badgeColor}
					>
						{mock.httpMethod.method}
					</Badge>
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
