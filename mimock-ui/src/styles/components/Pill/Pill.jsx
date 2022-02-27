import React from 'react';
import PropTypes from 'prop-types';
import { PillWrapper } from './Pill.style';

const pillData = {
	RED_PILL: {
		background: 'bg-red-100 dark:bg-red-200',
		color: 'text-red-500 dark:text-red-700',
		border: 'border-red-500',
	},
	GREEN_PILL: {
		background: 'bg-green-100 dark:bg-green-200',
		color: 'text-green-500 dark:text-green-700',
		border: 'border-green-500',
	},
	YELLOW_PILL: {
		background: 'bg-yellow-100 dark:bg-yellow-200',
		color: 'text-yellow-500 dark:text-yellow-700',
		border: 'border-yellow-500',
	},
	DEFAULT_PILL: {
		background: 'bg-white dark:bg-slate-300',
		color: 'text-gray-500',
		border: 'border-gray-500',
	},
};

function Pill({ variant, label }) {
	const { color, background, border } = getVariant(variant);

	return (
		<PillWrapper
			data-testid='pill'
			color={color}
			background={background}
			border={border}
		>
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
