import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'styles';
import { useRecoilState } from 'recoil';
import newMockFieldsAtom from 'atoms/newMockFieldsAtom';
import { getResponseTypes } from 'services/staticRecords/getResponseContentTypes.service';
import { ResponseTypeWrapper, TypeLabel } from './Response.style';

function ResponseType({ type }) {
	const [mockData, setMockData] = useRecoilState(newMockFieldsAtom);
	const [responseTypes, setResponseTypes] = useState([]);

	useEffect(() => {
		setMockData({
			...mockData,
			responseContentType:
				type === 'text' ? 'application/json' : 'application/pdf',
		});

		getResponseTypes().then((responseTypes) => {
			setResponseTypes(responseTypes[type]);
		});
	}, [type]);

	return (
		<If condition={type && responseTypes}>
			<ResponseTypeWrapper data-testid='response-type-wrapper'>
				<TypeLabel data-testid='response-type-label'>Response Type</TypeLabel>
				<Select
					options={responseTypes}
					defaultValue={
						type === 'text' ? 'application/json' : 'application/pdf'
					}
					dataTestId='response-type'
					width='w-1/3'
					onChange={(e) => {
						setMockData({
							...mockData,
							responseContentType: e.target.value,
						});
					}}
				/>
			</ResponseTypeWrapper>
		</If>
	);
}

ResponseType.propTypes = {
	type: PropTypes.string.isRequired,
};

export default ResponseType;
