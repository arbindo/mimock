import React from 'react';
import {
	HeaderContainer,
	CardTopBadge,
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
	// #region Defaults
	const { testIds } = constants;
	const crossBadgeText = mock.deleted
		? 'DELETED'
		: mock.archived
		? 'ARCHIVED'
		: '';
	// #endregion

	return (
		<HeaderContainer data-testid={testIds.detailHeaderContainer}>
			<If condition={crossBadgeText !== ''}>
				<CardTopBadge $isDeleted={mock.deleted} $isArchived={mock.archived}>
					{crossBadgeText}
				</CardTopBadge>
			</If>
			<TitleContainer data-testid={testIds.titleContainer}>
				<Title data-testid={testIds.mockTitle}>{mock.mockName}</Title>
				<Subtitle data-testid={testIds.mockSubtitle}>
					{mock.description}
				</Subtitle>
				<Link data-testid={testIds.mockLink}>
					<LinkDiv>
						<FaLink /> <LinkText>{mock.route}</LinkText>
					</LinkDiv>
				</Link>
			</TitleContainer>
			<MetaContainer data-testid={testIds.metaContainer}>
				<MetaInner>
					<Badge data-testid={testIds.mockBadge} className={badgeColor}>
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
