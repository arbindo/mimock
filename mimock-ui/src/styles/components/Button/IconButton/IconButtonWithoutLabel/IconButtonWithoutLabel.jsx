import React from 'react';
import PropTypes from 'prop-types';
import { IconButtonData } from '../../ButtonData';
import { IconButtonWithoutLabelContainer } from './IconButtonWithoutLabel.style';
import { AiOutlineClose, AiFillCopy, AiOutlineCheck } from 'react-icons/ai';
import { BiTrash, BiPlusMedical } from 'react-icons/bi';

function IconButtonWithoutLabel({ variant }) {
	return (
		<IconButtonWithoutLabelContainer
			data-testid='icon-button-without-label'
			variant={getVariant(variant)}
		>
			{getIcon(variant)}
		</IconButtonWithoutLabelContainer>
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

IconButtonWithoutLabel.propTypes = {
	variant: PropTypes.string,
};

export default IconButtonWithoutLabel;
