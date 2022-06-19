import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { IconHeaderWrapper, Title, GoBack } from './IconHeader.style';

function IconHeader({
	icon,
	dataTestId,
	title,
	enableBackNavigation,
	additionalStyles,
}) {
	const navigate = useNavigate();

	return (
		<IconHeaderWrapper
			data-testid={dataTestId}
			$additionalStyles={additionalStyles}
		>
			<If condition={enableBackNavigation}>
				<Tooltip title='Go back' arrow>
					<GoBack
						data-testid='go-back-btn'
						onClick={() => {
							navigate(-1);
						}}
					>
						<IoMdArrowRoundBack />
					</GoBack>
				</Tooltip>
			</If>
			{icon}
			<Title>{title}</Title>
		</IconHeaderWrapper>
	);
}

IconHeader.propTypes = {
	icon: PropTypes.element.isRequired,
	dataTestId: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	enableBackNavigation: PropTypes.bool,
	additionalStyles: PropTypes.string,
};

IconHeader.defaultProps = {
	enableBackNavigation: false,
};

export default IconHeader;
