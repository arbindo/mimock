import React from 'react';
import PropTypes from 'prop-types';
import { UserNameFieldContainer } from './UserNameField.style';

function UserNameField({
	dataTestid,
	placeholder,
	autoComplete,
	value,
	onChangeHandler,
	onBlurHandler,
	onFocusHandler,
}) {
	return (
		<UserNameFieldContainer
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

UserNameField.propTypes = {
	dataTestid: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChangeHandler: PropTypes.func,
	onBlurHandler: PropTypes.func,
	onFocusHandler: PropTypes.func,
	placeholder: PropTypes.string,
	autoComplete: PropTypes.bool,
};

export default UserNameField;
