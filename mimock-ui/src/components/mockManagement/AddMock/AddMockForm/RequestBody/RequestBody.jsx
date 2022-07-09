import React, { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import { VscListFlat, VscCode } from 'react-icons/vsc';
import { useRecoilState } from 'recoil';
import newMockFieldsAtom from 'atoms/newMockFieldsAtom';
import { ButtonVariants } from 'styles/Button';
import { TextInput } from 'styles';
import RequestBodyType from './RequestBodyType';
import {
	FormWrapper,
	InputContainer,
	AddIcon,
	DeleteIcon,
	ActionToolTip,
	NoItem,
	NoItemLabel,
	TextWrapper,
	ParsedTextArea,
	SaveButton,
	FailurePrompt,
	SuccessPrompt,
} from '../FormCommon.style';

export default function RequestBody() {
	const [inputIndex, setInputIndex] = useState([]);
	const [counter, setCounter] = useState(0);
	const [inputState, setInputState] = useState({});
	const [viewMode, setViewMode] = useState('text');
	const [mockData, setMockData] = useRecoilState(newMockFieldsAtom);
	const [requestBodyValue, setRequestBodyValue] = useState(
		mockData.requestBody
	);
	const [parsingError, setParsingError] = useState(false);
	const [promptSuccess, setPromptSuccess] = useState(false);

	useEffect(() => {
		if (mockData.requestBody) {
			let parsedRequestBody;
			try {
				parsedRequestBody = JSON.parse(mockData.requestBody);
			} catch (e) {
				setParsingError(true);
				return;
			}
			setRequestBodyValue(JSON.stringify(parsedRequestBody, null, 2));
		}
	}, [mockData.requestBody]);

	useEffect(() => {
		if (counter === 0) {
			setMockData({
				...mockData,
				requestBody: '',
			});
		}
	}, [counter]);

	useEffect(() => {
		if (requestBodyValue === '' || requestBodyValue === '{}') {
			setRequestBodyValue('');
			setInputIndex([0]);
			setCounter(1);
			setInputState({
				requestBody_0_key: '',
				requestBody_0_value: '',
			});

			return;
		}

		let requestBody;
		try {
			const sanitizedValue = requestBodyValue
				.replaceAll("'", '"')
				.replace(/[\n\r\t]*/g, '');

			requestBody = JSON.parse(sanitizedValue.toString());
		} catch (e) {
			setParsingError(true);
			return;
		}
		setParsingError(false);

		const keys = Object.keys(requestBody);

		if (requestBody && keys.length) {
			const indices = keys.map((key, idx) => idx);
			setInputIndex(indices);
			setCounter(keys.length);

			const inputStates = {};
			indices.forEach((idx) => {
				inputStates[`requestBody_${idx}_key`] = keys[idx];
				inputStates[`requestBody_${idx}_value`] =
					requestBody[keys[idx]].toString();
			});

			setInputState(inputStates);
		} else {
			setInputIndex([]);
			setCounter(0);
			setInputState({});
		}
	}, [requestBodyValue]);

	const buildRequestBody = () => {
		let bodyObject = {};

		inputIndex.forEach((idx) => {
			const key = inputState[`requestBody_${idx}_key`];
			const value = inputState[`requestBody_${idx}_value`];

			if (!key || !value) {
				return;
			}

			bodyObject[key] = value;
		});

		setRequestBodyValue(JSON.stringify(bodyObject, null, 2));
	};

	const input = (index) => {
		return (
			<InputContainer key={`requestBodyContainer-${index}`}>
				<TextInput
					name={`requestBody_${index}_key`}
					dataTestId={`requestBody_${index}_key`}
					placeHolder='key'
					value={inputState[`requestBody_${index}_key`]}
					onChange={(e) => {
						setInputState({
							...inputState,
							[`requestBody_${index}_key`]: e.target.value,
						});
					}}
				/>
				<TextInput
					name={`requestBody_${index}_value`}
					dataTestId={`requestBody_${index}_value`}
					placeHolder='value'
					value={inputState[`requestBody_${index}_value`]}
					onChange={(e) => {
						setInputState({
							...inputState,
							[`requestBody_${index}_value`]: e.target.value,
						});
					}}
				/>
				<ActionToolTip
					data-testid={`remove-request-body-tooltip-${index}`}
					key={'tooltip-remove'}
					title={'Remove request body'}
					arrow
				>
					<IconButton
						onClick={() => {
							removeInput(index);
						}}
					>
						<DeleteIcon />
					</IconButton>
				</ActionToolTip>
			</InputContainer>
		);
	};

	const addInput = () => {
		setInputIndex([...inputIndex, counter]);
		setCounter(counter + 1);
		setInputState({
			...inputState,
			[`requestBody_${counter}_key`]: '',
			[`requestBody_${counter}_value`]: '',
		});
	};

	const removeInput = (index) => {
		const newInputIndex = inputIndex.filter((i) => i !== index);
		setInputIndex(newInputIndex);
		setCounter(counter - 1);

		let tempInputValues = inputState;
		delete tempInputValues[`requestBody_${index}_key`];
		delete tempInputValues[`requestBody_${index}_value`];

		setInputState(tempInputValues);
	};

	const saveRequestBody = (e) => {
		e.preventDefault();

		let requestBodyObject = {};
		inputIndex.forEach((idx) => {
			requestBodyObject[inputState[`requestBody_${idx}_key`]] =
				inputState[`requestBody_${idx}_value`];
		});
		setMockData({
			...mockData,
			requestBody: JSON.stringify(requestBodyObject, null, 2),
			requestBodyType: mockData.requestBodyType,
		});

		setPromptSuccess(true);
		setTimeout(() => {
			setPromptSuccess(false);
		}, 6000);
	};

	return (
		<FormWrapper data-testid='request-body-wrapper'>
			<RequestBodyType />
			<ToggleButtonGroup
				value={viewMode}
				color='primary'
				data-testid='view-mode'
				exclusive
				onChange={(e, mode) => {
					if (mode !== null) {
						buildRequestBody();
						setViewMode(viewMode === 'text' ? 'code' : 'text');
					}
				}}
			>
				<ToggleButton data-testid='view-mode-text' value='text'>
					<VscListFlat />
				</ToggleButton>
				<If condition={inputIndex && inputIndex.length !== 0}>
					<ToggleButton data-testid='view-mode-code' value='code'>
						<VscCode />
					</ToggleButton>
				</If>
			</ToggleButtonGroup>
			<If condition={viewMode === 'text'}>
				<ActionToolTip
					data-testid='add-request-body-button'
					key={'tooltip-add'}
					title={'Add new request body'}
					arrow
				>
					<IconButton
						onClick={() => {
							addInput();
						}}
					>
						<AddIcon />
					</IconButton>
				</ActionToolTip>
			</If>
			<If condition={inputIndex.length === 0}>
				<NoItem data-testid='no-request-body'>
					<NoItemLabel>No request body fields added yet</NoItemLabel>
				</NoItem>
			</If>
			<Choose>
				<When condition={viewMode === 'text'}>
					<For each='index' index='idx' of={inputIndex}>
						{input(index)}
					</For>
				</When>
				<Otherwise>
					<If condition={inputIndex.length !== 0}>
						<TextWrapper data-testid='request-body-text'>
							<ParsedTextArea
								type='text'
								data-testid='request-body-text-input'
								placeholder='Enter request body as JSON'
								rows={10}
								value={requestBodyValue}
								onChange={(e) => {
									setRequestBodyValue(e.target.value);
								}}
							/>
						</TextWrapper>
					</If>
				</Otherwise>
			</Choose>
			<If condition={parsingError}>
				<FailurePrompt data-testid='parsing-error'>
					Failed to parse request body text
				</FailurePrompt>
			</If>
			<If condition={promptSuccess && !parsingError}>
				<SuccessPrompt data-testid='success-prompt'>
					Request body fields saved for submission
				</SuccessPrompt>
			</If>
			<If condition={!parsingError && inputIndex.length !== 0}>
				<SaveButton
					dataTestid='save-requestBody-button'
					variant={ButtonVariants.BlueButton}
					label='Save'
					width='w-1/4'
					onclickHandler={saveRequestBody}
				/>
			</If>
		</FormWrapper>
	);
}
