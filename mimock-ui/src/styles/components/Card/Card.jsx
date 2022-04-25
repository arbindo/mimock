import React from 'react';
import PropTypes from 'prop-types';
import { CardContainer } from './Card.style';

function Card({
	children,
	dataTestid,
	padding,
	border,
	background,
	width,
	margin,
}) {
	return (
		<CardContainer
			data-testid={dataTestid}
			$background={background}
			$border={border}
			$padding={padding}
			$width={width}
			$margin={margin}
		>
			{children}
		</CardContainer>
	);
}

Card.propTypes = {
	children: PropTypes.any.isRequired,
	padding: PropTypes.string,
	border: PropTypes.string,
	background: PropTypes.string,
	width: PropTypes.string,
	margin: PropTypes.string,
	dataTestid: PropTypes.string,
};

export default Card;
