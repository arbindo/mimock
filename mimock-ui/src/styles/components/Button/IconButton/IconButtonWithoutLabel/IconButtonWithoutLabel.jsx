import React from 'react';
import PropTypes from 'prop-types';
import { IconButtonData } from '../../ButtonData';
import { IconButtonWithoutLabelContainer } from './IconButtonWithoutLabel.style';
import { AiFillCopy, AiOutlineCheck } from 'react-icons/ai';
import { BiTrash, BiPlusMedical } from 'react-icons/bi';
import CloseIcon from '../CloseIcon.jsx';

function IconButtonWithoutLabel({ variant, onclickHandler, dataTestid }) {
	const { color, background } = getVariant(variant);

	return (
		<IconButtonWithoutLabelContainer
			data-testid={dataTestid}
			$color={color}
			$background={background}
			onClick={onclickHandler}
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
			return <CloseIcon />;
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
	dataTestid: PropTypes.string,
	onclickHandler: PropTypes.func.isRequired,
};

export default IconButtonWithoutLabel;
