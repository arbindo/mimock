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
	CardActionIconsSpan,
} from './MockCard.style.js';
import { FaLink, FaTrash, FaArchive } from 'react-icons/fa';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';

function MockCard({ mockName, description, httpMethod, route }) {
	const [badgeColor, setBadgeColor] = useState('');

	useEffect(() => {
		decideBadgeColor();
	}, [badgeColor]);

	const decideBadgeColor = () => {
		let color = '';
		console.log(httpMethod);
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
			default:
				color = 'gray-500';
				break;
		}
		setBadgeColor(`border-2 border-${color} text-${color}`);
	};

	const options = [
		{
			key: 'archive',
			title: 'Archive Mock',
			icon: <FaArchive />,
		},
		{
			key: 'delete',
			title: 'Delete Mock',
			icon: <FaTrash />,
		},
	];

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
				<For each='option' of={options}>
					<CardActionIconsSpan
						data-testid={`mock-item-${option.key}`}
						key={option.key}
					>
						<Tooltip title={option.title}>
							<IconButton size='small'>{option.icon}</IconButton>
						</Tooltip>
					</CardActionIconsSpan>
				</For>
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
