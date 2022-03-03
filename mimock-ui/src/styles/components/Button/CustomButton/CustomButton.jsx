import React from 'react';
import PropTypes from 'prop-types';
import { CustomButtonContainer } from './CustomButton.style';

function CustomButton({ label, color, width, background }) {
	return (
		<CustomButtonContainer
			data-testid='custom-button'
			color={color}
			width={width}
			background={background}
		>
			{label}
		</CustomButtonContainer>
	);
}

CustomButton.propTypes = {
	label: PropTypes.string.isRequired,
	color: PropTypes.string,
	width: PropTypes.string,
	background: PropTypes.string,
};

export default CustomButton;
