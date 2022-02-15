import React from 'react';
import PropTypes from 'prop-types';
import { ButtonContainer } from './Button.style';

function Button({ label, color, bgcolor }) {
	return (
		<ButtonContainer data-testid='button' color={color} bgcolor={bgcolor}>
			{label}
		</ButtonContainer>
	);
}

Button.propTypes = {
	label: PropTypes.string.isRequired,
	color: PropTypes.string,
	bgcolor: PropTypes.string,
};

export default Button;
