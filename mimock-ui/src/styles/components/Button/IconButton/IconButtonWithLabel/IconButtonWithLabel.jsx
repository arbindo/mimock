import React from 'react';
import PropTypes from 'prop-types';
import { IconButtonData } from '../../ButtonData';
import {
	IconButtonWithLabelContainer,
	DownloadIcon,
} from './IconButtonWithLabel.style';
import { AiFillCopy, AiOutlineCheck } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { FaFilter, FaHome, FaPlusSquare } from 'react-icons/fa';
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
			return <FaPlusSquare />;
		case 'COPY_BUTTON':
			return <AiFillCopy />;
		case 'FILTER_BUTTON':
			return <FaFilter />;
		case 'HOME_BUTTON':
			return <FaHome />;
		case 'DOWNLOAD_BUTTON':
			return <DownloadIcon />;
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
