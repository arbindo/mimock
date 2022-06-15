import React from 'react';
import { SelectWrapper } from './Select.style';
import PropTypes from 'prop-types';

function Select({ options, dataTestId, defaultValue, onChange }) {
	return (
		<SelectWrapper
			data-testid={dataTestId}
			defaultValue={defaultValue}
			onChange={onChange}
		>
			<For each='option' of={options}>
				<option data-testid='options' key={option} value={option}>
					{option}
				</option>
			</For>
		</SelectWrapper>
	);
}

Select.propTypes = {
	options: PropTypes.array.isRequired,
	dataTestId: PropTypes.string.isRequired,
	defaultValue: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default Select;
