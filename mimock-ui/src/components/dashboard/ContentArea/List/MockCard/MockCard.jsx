import React, { useState, useEffect } from 'react';
import {
	CardContainer,
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
}) {
	// #region States
	const [badgeColor, setBadgeColor] = useState('');
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
			<CardTitleContainer>
				<CardTitle data-testid={constants.testIds.cardTitle}>
					{mockName}
				</CardTitle>
				<CardSubtitle data-testid={constants.testIds.cardSubtitle}>
					{description}
				</CardSubtitle>
			</CardTitleContainer>
			<CardMetaContainer>
				<CardMetaInner>
					<CardBadge
						data-testid={constants.testIds.cardBadge}
						className={badgeColor}
					>
						{httpMethod}
					</CardBadge>
					<CardLinkSpan>
						<FaLink className={constants.additionalStyles.cardLink} />{' '}
						<CardLink data-testid={constants.testIds.cardLink}>
							{route}
						</CardLink>
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
};

export default MockCard;
