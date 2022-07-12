import React, { useState, useEffect } from 'react';
import {
	CardContainer,
	CardTopBadge,
	CardTitleContainer,
	CardTitle,
	CardSubtitle,
	CardMetaContainer,
	CardBadge,
	CardMetaInner,
	CardLink,
	CardLinkSpan,
} from './MockCard.style.js';
import { FaLink } from 'react-icons/fa';
import { constants } from './constants';
import PropTypes from 'prop-types';
import { decideBadgeColor } from 'utils/badgeColor.js';

function MockCard({
	innerRef,
	id,
	dataTestId,
	mockName,
	description,
	httpMethod,
	route,
	isDeleted,
	isArchived,
}) {
	// #region States
	const [badgeColor, setBadgeColor] = useState('');
	const { testIds, additionalStyles } = constants;
	const crossBadgeText = isDeleted ? 'DELETED' : isArchived ? 'ARCHIVED' : '';
	// #endregion

	// #region Common Hooks
	useEffect(() => {
		const color = decideBadgeColor(httpMethod);
		setBadgeColor(color);
	}, [badgeColor]);
	// #endregion

	return (
		<CardContainer
			data-testid={dataTestId}
			ref={innerRef}
			to={`/mimock-ui/mocks/detail/${id}`}
		>
			<If condition={crossBadgeText !== ''}>
				<CardTopBadge $isDeleted={isDeleted} $isArchived={isArchived}>
					{crossBadgeText}
				</CardTopBadge>
			</If>
			<CardTitleContainer>
				<CardTitle data-testid={testIds.cardTitle}>{mockName}</CardTitle>
				<CardSubtitle data-testid={testIds.cardSubtitle}>
					{description}
				</CardSubtitle>
			</CardTitleContainer>
			<CardMetaContainer>
				<CardMetaInner>
					<CardBadge data-testid={testIds.cardBadge} className={badgeColor}>
						{httpMethod}
					</CardBadge>
					<CardLinkSpan>
						<FaLink className={additionalStyles.cardLink} />{' '}
						<CardLink data-testid={testIds.cardLink}>{route}</CardLink>
					</CardLinkSpan>
				</CardMetaInner>
			</CardMetaContainer>
		</CardContainer>
	);
}

MockCard.propTypes = {
	innerRef: PropTypes.func,
	id: PropTypes.string.isRequired,
	dataTestId: PropTypes.string.isRequired,
	mockName: PropTypes.string.isRequired,
	description: PropTypes.string,
	httpMethod: PropTypes.string.isRequired,
	route: PropTypes.string.isRequired,
	isDeleted: PropTypes.bool.isRequired,
	isArchived: PropTypes.bool.isRequired,
};

export default MockCard;
