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
	const [responseType, setResponseType] = useState('text');
	const [mockData, setMockData] = useRecoilState(newMockFieldsAtom);

	const [responseContentType, setResponseContentType] = useState(
		mockData.responseContentType
	);
	const [showSuccess, setShowSuccess] = useState(false);

	const changeResponseType = (e) => {
		setResponseType(e.target.value);
		if (e.target.value === 'text') {
			setMockData({
				...mockData,
				binaryFile: '',
			});
		} else {
			setMockData({
				...mockData,
				expectedTextResponse: '',
			});
		}
	};

	const saveResponse = (e) => {
		e.preventDefault();

		setMockData({
			...mockData,
			expectedTextResponse:
				responseType === 'text' ? mockData.expectedTextResponse : '',
			binaryFile: responseType === 'file' ? mockData.binaryFile : '',
		});

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
						value='text'
						control={<Radio />}
						label='Text Response'
					/>
					<FormControlLabel
						value='binary'
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
				<When condition={responseType === 'text'}>
					<TextResponse
						rows={5}
						cols={10}
						value={mockData.expectedTextResponse}
						onChange={(e) => {
							setMockData({
								...mockData,
								expectedTextResponse: e.target.value,
							});
						}}
					/>
				</When>
				<Otherwise>
					<FileUpload />
				</Otherwise>
			</Choose>
			<If condition={showSuccess}>
				<SuccessPrompt>
					Response saved successfully for submission
				</SuccessPrompt>
			</If>
			<If condition={mockData.expectedTextResponse || mockData.binaryFile}>
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
