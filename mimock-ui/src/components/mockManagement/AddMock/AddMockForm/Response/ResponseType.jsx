import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getResponseTypes } from 'services/staticRecords/getResponseContentTypes.service';
import { ResponseTypeWrapper, TypeLabel } from './Response.style';

function ResponseType({ type, responseContentType, setResponseContentType }) {
	const [responseTypes, setResponseTypes] = useState(null);
	const [filteredResponseTypes, setFilteredResponseTypes] = useState([]);
	const [defaultResponseType, setDefaultResponseType] =
		useState(responseContentType);

	useEffect(() => {
		getResponseTypes().then((types) => {
			setResponseTypes(types);
		});
	}, []);

	useEffect(() => {
		if (type && responseTypes) {
			const filteredTypes = responseTypes[type];
			filteredTypes?.includes(defaultResponseType)
				? setDefaultResponseType(defaultResponseType)
				: setDefaultResponseType(filteredTypes[0]);
			setFilteredResponseTypes(filteredTypes);
		}
	}, [type, responseTypes]);

	return (
		<If condition={type && filteredResponseTypes}>
			<ResponseTypeWrapper data-testid='response-type-wrapper'>
				<TypeLabel data-testid='response-type-label'>Response Type</TypeLabel>
				<Autocomplete
					disablePortal
					data-testid='response-type-autocomplete'
					id='response-types'
					options={filteredResponseTypes}
					defaultValue={defaultResponseType}
					value={defaultResponseType}
					sx={{ width: 300 }}
					renderInput={(params) => (
						<TextField {...params} label='Response type' />
					)}
					onChange={(e) => {
						setResponseContentType(e.target.value);
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
