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
		decideBadgeColor();
	}, [badgeColor]);
	const decideBadgeColor = () => {
		let color = '';
		switch (httpMethod) {
			case 'GET':
				color = 'blue-500';
				break;
			case 'POST':
				color = 'green-500';
				break;
			case 'PUT':
				color = 'yellow-500';
				break;
			case 'DELETE':
				color = 'red-500';
				break;
			case 'PATCH':
				color = 'yellow-900';
				break;
			case 'CONNECT':
				color = 'pink-500';
				break;
			case 'HEAD':
				color = 'indigo-500';
				break;
			case 'TRACE':
				color = 'violet-500';
				break;
			case 'OPTIONS':
				color = 'gray-500';
				break;
			default:
				color = 'gray-500';
				break;
		}
		setBadgeColor(`border-2 border-${color} text-${color}`);
	};
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
