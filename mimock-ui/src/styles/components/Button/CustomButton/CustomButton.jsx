import React from 'react';
import PropTypes from 'prop-types';
import { CustomButtonContainer } from './CustomButton.style';

function CustomButton({
	label,
	color,
	icon,
	width,
	background,
	onclickHandler,
	dataTestid,
	additionalStyles,
}) {
	return (
		<CustomButtonContainer
			data-testid={dataTestid}
			$color={color}
			$width={width}
			$background={background}
			onClick={onclickHandler}
			$additionalStyles={additionalStyles}
		>
			{icon}
			{label}
		</CustomButtonContainer>
	);
}

CustomButton.propTypes = {
	label: PropTypes.string.isRequired,
	onclickHandler: PropTypes.func,
	dataTestid: PropTypes.string,
	color: PropTypes.string,
	width: PropTypes.string,
	icon: PropTypes.element,
	background: PropTypes.string,
	additionalStyles: PropTypes.string,
};

export default CustomButton;
