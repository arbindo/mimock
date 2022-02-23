import React from 'react';
import PropTypes from 'prop-types';
import { IconButtonData } from '../../ButtonData';
import { IconButtonWithLabelContainer } from './IconButtonWithLabel.style';
import { AiOutlineClose, AiFillCopy, AiOutlineCheck } from 'react-icons/ai';
import { BiTrash, BiPlusMedical } from 'react-icons/bi';

function IconButtonWithLabel({ label, variant }) {
	return (
		<IconButtonWithLabelContainer
			data-testid='icon-button-with-label'
			variant={getVariant(variant)}
		>
			{getIcon(variant)}
			{label}
		</IconButtonWithLabelContainer>
	);
}

function getVariant(variant) {
	return !variant ? IconButtonData.DEFAULT_BUTTON : IconButtonData[variant];
}

function getIcon(variant) {
	switch (variant) {
		case 'CLEAR_BUTTON':
			return <AiOutlineClose />;
		case 'DELETE_BUTTON':
			return <BiTrash />;
		case 'ADD_BUTTON':
			return <BiPlusMedical />;
		case 'COPY_BUTTON':
			return <AiFillCopy />;
		default:
			return <AiOutlineCheck />;
	}
}

IconButtonWithLabel.propTypes = {
	label: PropTypes.string.isRequired,
	variant: PropTypes.string,
};

export default IconButtonWithLabel;
