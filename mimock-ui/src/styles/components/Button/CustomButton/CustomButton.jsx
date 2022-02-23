import React from 'react';
import PropTypes from 'prop-types';
import { CustomButtonContainer } from './CustomButton.style';

function CustomButton({ label, color, bgcolor }) {
	return (
		<CustomButtonContainer
			data-testid='custom-button'
			color={color}
			bgcolor={bgcolor}
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
