import React from 'react';
import PropTypes from 'prop-types';
import { CustomButtonContainer } from './CustomButton.style';

function CustomButton({ label, color, background }) {
	return (
		<CustomButtonContainer
			data-testid='custom-button'
			color={color}
			background={background}
		>
			{label}
		</CustomButtonContainer>
	);
}

CustomButton.propTypes = {
	label: PropTypes.string.isRequired,
	color: PropTypes.string,
	bgcolor: PropTypes.string,
};

export default CustomButton;
