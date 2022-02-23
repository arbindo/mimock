import React from 'react';
import PropTypes from 'prop-types';
import { ButtonContainer } from './Button.style';
import ButtonData from '../ButtonData';

function Button({ variant, label }) {
	return (
		<ButtonContainer data-testid='button' variantprops={getVariant(variant)}>
			{label}
		</ButtonContainer>
	);
}

function getVariant(variant) {
	return !variant ? ButtonData.DEFAULT_BUTTON : ButtonData[variant];
}

Button.propTypes = {
	label: PropTypes.string.isRequired,
	variant: PropTypes.string,
};

export default Button;
