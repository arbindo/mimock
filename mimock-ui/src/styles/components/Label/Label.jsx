import React from 'react';
import PropTypes from 'prop-types';
import { LabelContainer } from './Label.style';

function Label({ label, dataTestid, font, background, color, margin }) {
	return (
		<LabelContainer
			data-testid={dataTestid}
			$background={background}
			$font={font}
			$color={color}
			$margin={margin}
		>
			{label}
		</LabelContainer>
	);
}

Label.propTypes = {
	label: PropTypes.any.isRequired,
	font: PropTypes.string,
	background: PropTypes.string,
	color: PropTypes.string,
	margin: PropTypes.string,
	dataTestid: PropTypes.string,
};

export default Label;
