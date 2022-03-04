import React from 'react';
import PropTypes from 'prop-types';
import { CustomButtonContainer } from './CustomButton.style';

function CustomButton({
	label,
	color,
	width,
	background,
	onclickHandler,
	dataTestid,
}) {
	return (
		<CustomButtonContainer
			data-testid={dataTestid}
			color={color}
			width={width}
			background={background}
			onClick={onclickHandler}
		>
			{label}
		</CustomButtonContainer>
	);
}

CustomButton.propTypes = {
	label: PropTypes.string.isRequired,
	onclickHandler: PropTypes.func.isRequired,
	dataTestid: PropTypes.string,
	color: PropTypes.string,
	width: PropTypes.string,
	background: PropTypes.string,
};

export default CustomButton;
