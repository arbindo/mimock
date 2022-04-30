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
import PropTypes from 'prop-types';

function MockCard({ mockName, description, httpMethod, route }) {
	const [badgeColor, setBadgeColor] = useState('');

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

	return (
		<CardContainer data-testid='card'>
			<CardTitleContainer>
				<CardTitle data-testid='card-title'>{mockName}</CardTitle>
				<CardSubtitle data-testid='card-subtitle'>{description}</CardSubtitle>
			</CardTitleContainer>
			<CardMetaContainer>
				<CardMetaInner>
					<CardBadge data-testid='card-badge' className={badgeColor}>
						{httpMethod}
					</CardBadge>
					<CardLinkSpan>
						<FaLink /> <CardLink data-testid='card-link'>{route}</CardLink>
					</CardLinkSpan>
				</CardMetaInner>
			</CardMetaContainer>
		</CardContainer>
	);
}

MockCard.propTypes = {
	id: PropTypes.string.isRequired,
	mockName: PropTypes.string.isRequired,
	description: PropTypes.string,
	httpMethod: PropTypes.string.isRequired,
	route: PropTypes.string.isRequired,
};

export default MockCard;
