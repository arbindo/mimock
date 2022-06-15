import React from 'react';
import PropTypes from 'prop-types';
import { InputBlock, FormInput, ErrorMessage } from './ValidatedInput.style';

function ValidatedInput({
	name,
	type,
	dataTestId,
	placeHolder,
	error,
	errorMessage,
	register,
}) {
	return (
		<InputBlock>
			<FormInput
				type={type}
				data-testid={dataTestId}
				placeholder={placeHolder}
				$error={error}
				{...register}
			/>
			<If condition={error}>
				<ErrorMessage data-testid={`input-error-${name}`}>
					{errorMessage}
				</ErrorMessage>
			</If>
		</InputBlock>
	);
}

ValidatedInput.propTypes = {
	name: PropTypes.string.isRequired,
	type: PropTypes.string,
	dataTestId: PropTypes.string.isRequired,
	placeHolder: PropTypes.string.isRequired,
	error: PropTypes.bool,
	errorMessage: PropTypes.string,
	register: PropTypes.object.isRequired,
};

ValidatedInput.defaultProps = {
	type: 'text',
	error: false,
	errorMessage: '',
};

export default ValidatedInput;
