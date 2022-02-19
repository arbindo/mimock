import React from 'react';
import PropTypes from 'prop-types';
import { PillWrapper } from './Pill.style';

const pillData = {
	RED_PILL: {
		background: 'bg-red-100',
		color: 'text-red-500',
		border: 'border-red-500',
	},
	GREEN_PILL: {
		background: 'bg-green-100',
		color: 'text-green-500',
		border: 'border-green-500',
	},
	YELLOW_PILL: {
		background: 'bg-yellow-100',
		color: 'text-yellow-500',
		border: 'border-yellow-500',
	},
	DEFAULT_PILL: {
		background: 'bg-white',
		color: 'text-gray-500',
		border: 'border-gray-500',
	},
};

function Pill({ variant, label }) {
	return (
		<PillWrapper data-testid='pill' variantprops={getVariant(variant)}>
			{label}
		</PillWrapper>
	);
}

function getVariant(variant) {
	return !variant ? pillData.DEFAULT_PILL : pillData[variant];
}

Pill.propTypes = {
	label: PropTypes.string.isRequired,
	variant: PropTypes.string,
};

export default Pill;
