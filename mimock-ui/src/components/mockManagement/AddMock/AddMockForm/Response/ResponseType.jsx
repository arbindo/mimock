import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getResponseTypes } from 'services/staticRecords/getResponseContentTypes.service';
import { ResponseTypeWrapper, TypeLabel } from './Response.style';

function ResponseType({ type, responseContentType, setResponseContentType }) {
	const [filteredResponseTypes, setFilteredResponseTypes] = useState([]);
	const [responseTypes, setResponseTypes] = useState(null);

	useEffect(() => {
		getResponseTypes().then((types) => {
			setResponseTypes(types);
		});
	}, []);

	useEffect(() => {
		if (type && responseTypes) {
			const filteredTypes = responseTypes[type];
			setFilteredResponseTypes(filteredTypes);

			const defaultType = filteredTypes.includes(responseContentType)
				? responseContentType
				: filteredTypes[0];
			!filteredTypes.includes(responseContentType);
			setResponseContentType(defaultType);
		}
	}, [type, responseTypes, responseContentType]);

	return (
		<If condition={type && responseContentType && filteredResponseTypes}>
			<ResponseTypeWrapper data-testid='response-type-wrapper'>
				<TypeLabel data-testid='response-type-label'>Response Type</TypeLabel>
				<Autocomplete
					disablePortal
					data-testid='response-type-autocomplete'
					id='response-types'
					options={filteredResponseTypes}
					value={responseContentType || ''}
					sx={{ width: 300 }}
					renderInput={(params) => (
						<TextField {...params} label='Response type' />
					)}
					onChange={(e, val) => {
						setResponseContentType(val);
					}}
				/>
			</ResponseTypeWrapper>
		</If>
	);
}

ResponseType.propTypes = {
	type: PropTypes.string.isRequired,
	responseContentType: PropTypes.string.isRequired,
	setResponseContentType: PropTypes.func.isRequired,
};

export default ResponseType;
