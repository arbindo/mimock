import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useRecoilState } from 'recoil';
import newMockFieldsAtom from 'atoms/newMockFieldsAtom';
import { ButtonVariants } from 'styles/Button';
import ResponseType from './ResponseType';
import FileUpload from './FileUpload';
import { ResponseWrapper, TextResponse } from './Response.style';
import { SaveButton, SuccessPrompt } from '../FormCommon.style';

export default function Response() {
	const [mockData, setMockData] = useRecoilState(newMockFieldsAtom);

	const [responseType, setResponseType] = useState(mockData.responseType);
	const [textResponse, setTextResponse] = useState(
		mockData.expectedTextResponse
	);
	const [binaryFile, setBinaryFile] = useState(mockData.binaryFile);

	const [responseContentType, setResponseContentType] = useState(
		mockData.responseContentType
	);
	const [showSuccess, setShowSuccess] = useState(false);

	const changeResponseType = (e) => {
		setResponseType(e.target.value);
		if (e.target.value === 'TEXTUAL_RESPONSE') {
			setBinaryFile(null);
			setMockData({
				...mockData,
				binaryFile: '',
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

		if (responseType === 'BINARY_RESPONSE') {
			setMockData({
				...mockData,
				expectedTextResponse: '',
				binaryFile: binaryFile,
			});
		} else {
			setMockData({
				...mockData,
				binaryFile: '',
				expectedTextResponse: textResponse,
			});
		}

		setShowSuccess(true);
		setTimeout(() => {
			setShowSuccess(false);
		}, 3000);
	};

	return (
		<ResponseWrapper onSubmit={saveResponse}>
			<FormControl>
				<RadioGroup row value={responseType} onChange={changeResponseType}>
					<FormControlLabel
						value='TEXTUAL_RESPONSE'
						control={<Radio />}
						label='Text Response'
					/>
					<FormControlLabel
						value='BINARY_RESPONSE'
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
				<When condition={responseType === 'TEXTUAL_RESPONSE'}>
					<TextResponse
						rows={5}
						cols={10}
						value={textResponse}
						onChange={(e) => {
							setTextResponse(e.target.value);
						}}
					/>
				</When>
				<Otherwise>
					<FileUpload binaryFile={binaryFile} setBinaryFile={setBinaryFile} />
				</Otherwise>
			</Choose>
			<If condition={showSuccess}>
				<SuccessPrompt>
					Response saved successfully for submission
				</SuccessPrompt>
			</If>
			<If condition={textResponse || binaryFile}>
				<SaveButton
					type='submit'
					dataTestid='save-requestBody-button'
					variant={ButtonVariants.BlueButton}
					label='Save'
					width='w-1/4'
				/>
			</If>
		</ResponseWrapper>
	);
}
