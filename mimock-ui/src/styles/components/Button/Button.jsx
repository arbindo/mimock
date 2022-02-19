import React from 'react';
import PropTypes from 'prop-types';
import { ButtonContainer } from './Button.style';

const ButtonData = {
	RED_BUTTON: {
		background: 'bg-red-300',
		color: 'text-red-800',
	},
	GREEN_BUTTON: {
		background: 'bg-green-300',
		color: 'text-lime-700',
	},
	INDIGO_BUTTON: {
		background: 'bg-blue-600',
		color: 'text-white',
	},
	DEFAULT_BUTTON: {
		background: 'bg-white',
		color: 'text-black',
	},
};

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
