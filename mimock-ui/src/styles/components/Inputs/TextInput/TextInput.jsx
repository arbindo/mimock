import React from 'react';
import PropTypes from 'prop-types';
import { InputBlock, FormInput, ErrorMessage } from './TextInput.style';

function TextInput({
	name,
	type,
	dataTestId,
	placeHolder,
	error,
	errorMessage,
	value,
	onChange,
}) {
	return (
		<InputBlock>
			<FormInput
				type={type}
				data-testid={dataTestId}
				placeholder={placeHolder}
				$error={error}
				value={value}
				onChange={onChange}
			/>
			<If condition={error}>
				<ErrorMessage data-testid={`input-error-${name}`}>
					{errorMessage}
				</ErrorMessage>
			</If>
		</InputBlock>
	);
}

TextInput.propTypes = {
	name: PropTypes.string.isRequired,
	type: PropTypes.string,
	dataTestId: PropTypes.string.isRequired,
	placeHolder: PropTypes.string.isRequired,
	error: PropTypes.bool,
	errorMessage: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
};

TextInput.defaultProps = {
	type: 'text',
	error: false,
	errorMessage: '',
	value: '',
	onChange: () => {},
};

export default TextInput;
