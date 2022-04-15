import React from 'react';
import PropTypes from 'prop-types';
import { IconButtonData } from '../../ButtonData';
import { IconButtonWithLabelContainer } from './IconButtonWithLabel.style';
import { AiFillCopy, AiOutlineCheck } from 'react-icons/ai';
import { BiTrash, BiPlusMedical } from 'react-icons/bi';
import { FaFilter } from 'react-icons/fa';
import CloseIcon from '../CloseIcon.jsx';

function IconButtonWithLabel({
	label,
	width,
	variant,
	onclickHandler,
	dataTestid,
}) {
	const { color, background } = getVariant(variant);

	return (
		<IconButtonWithLabelContainer
			data-testid={dataTestid}
			$color={color}
			$width={width}
			$background={background}
			onClick={onclickHandler}
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
			return <CloseIcon />;
		case 'DELETE_BUTTON':
			return <BiTrash />;
		case 'ADD_BUTTON':
			return <BiPlusMedical />;
		case 'COPY_BUTTON':
			return <AiFillCopy />;
		case 'FILTER_BUTTON':
			return <FaFilter />;
		default:
			return <AiOutlineCheck />;
	}
}

IconButtonWithLabel.propTypes = {
	label: PropTypes.string.isRequired,
	onclickHandler: PropTypes.func,
	dataTestid: PropTypes.string,
	variant: PropTypes.string,
	width: PropTypes.string,
};

export default IconButtonWithLabel;
