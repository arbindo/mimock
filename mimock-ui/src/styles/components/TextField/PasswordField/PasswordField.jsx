import React from 'react';
import { PasswordFieldContainer } from './PasswordField.style';
import PropTypes from 'prop-types';

function PasswordField({
	dataTestid,
	placeholder,
	autoComplete,
	value,
	onChangeHandler,
	onBlurHandler,
	onFocusHandler,
}) {
	return (
		<PasswordFieldContainer
			data-testid={dataTestid}
			placeholder={placeholder}
			autoComplete={autoComplete}
			value={value}
			onChange={onChangeHandler}
			onBlur={onBlurHandler}
			onFocus={onFocusHandler}
		/>
	);
}

PasswordField.propTypes = {
	dataTestid: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChangeHandler: PropTypes.func,
	onBlurHandler: PropTypes.func,
	onFocusHandler: PropTypes.func,
	placeholder: PropTypes.string,
	autoComplete: PropTypes.bool,
};

export default PasswordField;
