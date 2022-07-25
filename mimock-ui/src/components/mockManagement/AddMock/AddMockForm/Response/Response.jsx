import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useRecoilState } from 'recoil';
import newMockFieldsAtom from 'atoms/newMockFieldsAtom';
import { ButtonVariants } from 'styles/Button';
import { mockManagementConstants } from 'constants/mockManagementConstants';
import ResponseType from './ResponseType';
import FileUpload from './FileUpload';
import { ResponseWrapper, TextResponse } from './Response.style';
import { SaveButton, SuccessPrompt } from '../FormCommon.style';

export default function Response() {
	const [mockData, setMockData] = useRecoilState(newMockFieldsAtom);

	const [responseType, setResponseType] = useState(mockData.responseType);
	const [textResponse, setTextResponse] = useState('');
	const [binaryFile, setBinaryFile] = useState(mockData.binaryFile);

	const [responseContentType, setResponseContentType] = useState(
		mockData.responseContentType
	);
	const [showSuccess, setShowSuccess] = useState(false);

	useEffect(() => {
		setTextResponse(mockData.expectedTextResponse);
		setBinaryFile(mockData.binaryFile);
		setResponseType(
			mockData.responseType || mockManagementConstants.TEXTUAL_RESPONSE
		);
		setResponseContentType(mockData.responseContentType);
	}, [
		mockData.expectedTextResponse,
		mockData.binaryFile,
		mockData.responseType,
		mockData.responseContentType,
	]);

	const changeResponseType = (e) => {
		setResponseType(e.target.value);
		if (responseType === mockManagementConstants.TEXTUAL_RESPONSE) {
			setBinaryFile(null);
			setMockData({
				...mockData,
				binaryFile: null,
			});
		} else {
			setTextResponse('');
			setMockData({
				...mockData,
				expectedTextResponse: '',
			});
		}
	};

	const saveResponse = (e) => {
		e.preventDefault();

		if (responseType === mockManagementConstants.BINARY_RESPONSE) {
			setMockData({
				...mockData,
				responseContentType,
				expectedTextResponse: '',
				responseType: mockManagementConstants.BINARY_RESPONSE,
				binaryFile,
			});
		} else {
			setMockData({
				...mockData,
				responseContentType,
				binaryFile: null,
				responseType: mockManagementConstants.TEXTUAL_RESPONSE,
				expectedTextResponse: textResponse,
			});
		}

		setShowSuccess(true);
		setTimeout(() => {
			setShowSuccess(false);
		}, 3000);
	};

	return (
		<ResponseWrapper data-testid='response-wrapper'>
			<FormControl>
				<RadioGroup
					row
					data-testid='response-type-radio'
					value={responseType}
					onChange={changeResponseType}
					name='responseType-radio-group'
				>
					<FormControlLabel
						value={mockManagementConstants.TEXTUAL_RESPONSE}
						control={<Radio />}
						label='Text Response'
					/>
					<FormControlLabel
						value={mockManagementConstants.BINARY_RESPONSE}
						control={<Radio />}
						label='Binary Response'
					/>
				</RadioGroup>
			</FormControl>
			<ResponseType
				type={responseType}
				responseContentType={responseContentType}
				setResponseContentType={setResponseContentType}
			/>
			<Choose>
				<When
					condition={responseType === mockManagementConstants.TEXTUAL_RESPONSE}
				>
					<TextResponse
						data-testid='text-response'
						rows={5}
						cols={10}
						value={textResponse}
						onChange={(e) => {
							setTextResponse(e.target.value);
						}}
					/>
				</When>
				<Otherwise>
					<FileUpload
						responseContentType={responseContentType}
						binaryFile={binaryFile}
						setBinaryFile={setBinaryFile}
					/>
				</Otherwise>
			</Choose>
			<If condition={showSuccess}>
				<SuccessPrompt data-testid='success-prompt'>
					Response saved successfully for submission
				</SuccessPrompt>
			</If>
			<If condition={textResponse || binaryFile}>
				<SaveButton
					dataTestid='save-response-button'
					variant={ButtonVariants.BlueButton}
					label='Save'
					width='w-1/4'
					background='bg-grey-50'
					color='text-gray-600'
					hover='hover:border-gray-500 hover:bg-gray-200'
					padding='py-2 px-2'
					additionalStyles='mx-0 break-normal p-0 border-2 border-gray-400'
					onclickHandler={saveResponse}
				/>
			</If>
		</ResponseWrapper>
	);
}
