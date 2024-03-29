import React, { useEffect, useState } from 'react';
import { FaLink } from 'react-icons/fa';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { config } from 'config';

import { constants } from './constants';
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
	LinkIcon,
	CopyLink,
	CopyIcon,
} from './DetailHeader.style';

function DetailHeader({ mock, badgeColor }) {
	// #region Defaults
	const { testIds } = constants;
	// #endregion

	// #region State
	const [generatedURL, setGeneratedURL] = useState('');
	const [isCopied, setIsCopied] = useState(false);
	// #endregion

	// #region Effects
	useEffect(() => {
		let url = `${config.hostName[process.env.NODE_ENV]}${mock.route}`;
		if (mock.queryParams?.length > 0) {
			url += `?${mock.queryParams}`;
		}
		setGeneratedURL(url);
	}, [mock.route]);

	useEffect(() => {
		if (isCopied) {
			setTimeout(() => {
				setIsCopied(false);
			}, 1000);
		}
	}, [isCopied]);
	// #endregion

	// #child region
	const badge = () => {
		if (mock.deleted) {
			return <CardTopBadge $isDeleted={mock.deleted}>DELETED</CardTopBadge>;
		}
		if (mock.archived) {
			return <CardTopBadge $isArchived={mock.archived}>ARCHIVED</CardTopBadge>;
		}

		return null;
	};
	// #endregion

	return (
		<HeaderContainer data-testid={testIds.detailHeaderContainer}>
			{badge()}
			<TitleContainer data-testid={testIds.titleContainer}>
				<Title data-testid={testIds.mockTitle}>{mock.mockName}</Title>
				<Subtitle data-testid={testIds.mockSubtitle}>
					{mock.description}
				</Subtitle>
				<Link data-testid={testIds.mockLink}>
					<LinkDiv>
						<LinkIcon>
							<FaLink />
						</LinkIcon>
						<LinkText href={generatedURL} target='_blank'>
							{mock.route}
						</LinkText>
						<CopyLink key='copy-url'>
							<CopyToClipboard
								text={generatedURL}
								onCopy={() => setIsCopied(true)}
							>
								<Tooltip title={isCopied ? 'URL Copied' : 'Copy URL'}>
									<IconButton data-testid='copy-url-button'>
										<CopyIcon />
									</IconButton>
								</Tooltip>
							</CopyToClipboard>
						</CopyLink>
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
