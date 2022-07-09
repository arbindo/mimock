import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import newMockFieldsAtom from 'atoms/newMockFieldsAtom';
import { getHttpMethods } from 'services/staticRecords/getHttpMethods.service';
import { Select } from 'styles';
import { FormItem, FormLabel, HttpMethodSelect } from '../AddMockForm.style';

function HttpMethod({ selectedMethod }) {
	const [mockData, setMockData] = useRecoilState(newMockFieldsAtom);
	const [httpMethods, setHttpMethods] = useState([]);

	useEffect(() => {
		getHttpMethods().then((methods) => {
			setHttpMethods(methods);
		});
	}, []);

	return (
		<If condition={selectedMethod && httpMethods && httpMethods.length}>
			<FormItem data-testid='http-method-selector'>
				<FormLabel data-testid='http-methods-label'>HTTP Method</FormLabel>
				<HttpMethodSelect>
					<Select
						options={httpMethods}
						defaultValue={selectedMethod}
						dataTestId='http-methods'
						onChange={(event) => {
							setMockData({ ...mockData, httpMethod: event.target.value });
						}}
					/>
				</HttpMethodSelect>
			</FormItem>
		</If>
	);
}

HttpMethod.propTypes = {
	selectedMethod: PropTypes.string,
};

HttpMethod.defaultProps = {
	selectedMethod: 'GET',
};

export default HttpMethod;
