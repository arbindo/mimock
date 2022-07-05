import React from 'react';
import { Select } from 'styles';
import { useRecoilState } from 'recoil';
import newMockFieldsAtom from 'atoms/newMockFieldsAtom';
import { RequestBodyTypeWrapper, TypeLabel } from './RequestBody.style';

export default function RequestBodyType() {
	const types = [
		'application/json',
		'application/x-www-form-urlencoded',
		'multipart/form-data',
	];

	const [mockData, setMockData] = useRecoilState(newMockFieldsAtom);

	return (
		<RequestBodyTypeWrapper>
			<TypeLabel>Request body type</TypeLabel>
			<Select
				options={types}
				defaultValue={types[0]}
				dataTestId='request-body-type'
				onChange={(e) => {
					setMockData({
						...mockData,
						requestBodyType: e.target.value,
					});
				}}
			/>
		</RequestBodyTypeWrapper>
	);
}
