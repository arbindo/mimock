import React, { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import { VscListFlat, VscCode } from 'react-icons/vsc';
import { useRecoilState } from 'recoil';
import newMockFieldsAtom from 'atoms/newMockFieldsAtom';
import { ButtonVariants } from 'styles/Button';
import { TextInput } from 'styles';
import ToggleMatchingMode from './ToggleMatchingMode';
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

export default function RequestHeaders() {
	const [inputIndex, setInputIndex] = useState([]);
	const [counter, setCounter] = useState(0);
	const [inputState, setInputState] = useState({});
	const [viewMode, setViewMode] = useState('text');
	const [requestHeaderValue, setRequestHeaderValue] = useState('');
	const [parsingError, setParsingError] = useState(false);
	const [promptSuccess, setPromptSuccess] = useState(false);
	const [mockData, setMockData] = useRecoilState(newMockFieldsAtom);

	useEffect(() => {
		if (mockData.requestHeader) {
			setRequestHeaderValue(mockData.requestHeader);
		}
	}, [mockData.requestHeader]);

	useEffect(() => {
		if (counter === 0) {
			setMockData({
				...mockData,
				requestHeader: '',
			});
		}
	}, [counter]);

	useEffect(() => {
		if (!requestHeaderValue || !requestHeaderValue.startsWith('{')) {
			setRequestHeaderValue('');
			return;
		}

		let requestHeaders;
		try {
			const sanitizedValue = requestHeaderValue
				.replaceAll("'", '"')
				.replace(/[\n\r\t ]*/g, '');

			requestHeaders = JSON.parse(sanitizedValue.toString());
		} catch (e) {
			setParsingError(true);
			return;
		}
		setParsingError(false);

		const keys = Object.keys(requestHeaders);

		if (requestHeaders && keys.length) {
			const indices = keys.map((key, idx) => idx);
			setInputIndex(indices);
			setCounter(keys.length);

			const inputStates = {};
			indices.forEach((idx) => {
				inputStates[`requestHeader_${idx}_key`] = keys[idx];
				inputStates[`requestHeader_${idx}_value`] =
					requestHeaders[keys[idx]].toString();
			});

			setInputState(inputStates);
		}
	}, [requestHeaderValue]);

	const buildHeaders = () => {
		let headerObject = {};
		inputIndex.forEach((idx) => {
			headerObject[inputState[`requestHeader_${idx}_key`]] =
				inputState[`requestHeader_${idx}_value`];
		});

		setRequestHeaderValue(JSON.stringify(headerObject, null, 2));
	};

	const input = (index) => {
		return (
			<InputContainer key={`requestHeaderContainer-${index}`}>
				<TextInput
					name={`requestHeader_${index}_key`}
					dataTestId={`requestHeader_${index}_key`}
					placeHolder='key'
					value={inputState[`requestHeader_${index}_key`]}
					onChange={(e) => {
						setInputState({
							...inputState,
							[`requestHeader_${index}_key`]: e.target.value,
						});
					}}
				/>
				<TextInput
					name={`requestHeader_${index}_value`}
					dataTestId={`requestHeader_${index}_value`}
					placeHolder='value'
					value={inputState[`requestHeader_${index}_value`]}
					onChange={(e) => {
						setInputState({
							...inputState,
							[`requestHeader_${index}_value`]: e.target.value,
						});
					}}
				/>
				<ActionToolTip
					data-testid={`remove-header-tooltip-${index}`}
					key={'tooltip-remove'}
					title={'Remove header'}
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
			[`requestHeader_${counter}_key`]: '',
			[`requestHeader_${counter}_value`]: '',
		});
	};

	const removeInput = (index) => {
		const newInputIndex = inputIndex.filter((i) => i !== index);
		setInputIndex(newInputIndex);
		setCounter(counter - 1);

		let tempInputValues = inputState;
		delete tempInputValues[`requestHeader_${index}_key`];
		delete tempInputValues[`requestHeader_${index}_value`];

		setInputState(tempInputValues);
	};

	const saveHeaders = (e) => {
		e.preventDefault();

		let headerObject = {};
		inputIndex.forEach((idx) => {
			headerObject[inputState[`requestHeader_${idx}_key`]] =
				inputState[`requestHeader_${idx}_value`];
		});
		setMockData({
			...mockData,
			requestHeader: JSON.stringify(headerObject),
		});

		setPromptSuccess(true);
		setTimeout(() => {
			setPromptSuccess(false);
		}, 6000);
	};

	return (
		<FormWrapper data-testid='request-header-form' onSubmit={saveHeaders}>
			<ToggleMatchingMode />
			<ToggleButtonGroup
				value={viewMode}
				color='primary'
				data-testid='view-mode'
				exclusive
				onChange={(e, mode) => {
					if (mode !== null) {
						buildHeaders();
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
					data-testid='add-header-button'
					key={'tooltip-add'}
					title={'Add new header'}
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
				<NoItem data-testid='no-header'>
					<NoItemLabel>No headers added yet</NoItemLabel>
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
						<TextWrapper data-testid='request-header-text'>
							<ParsedTextArea
								type='text'
								data-testid='request-header-text-input'
								placeholder='Enter request headers has JSON'
								rows={10}
								value={requestHeaderValue}
								onChange={(e) => {
									setRequestHeaderValue(e.target.value);
								}}
							/>
						</TextWrapper>
					</If>
				</Otherwise>
			</Choose>
			<If condition={parsingError}>
				<FailurePrompt data-testid='parsing-error'>
					Failed to parse request headers text
				</FailurePrompt>
			</If>
			<If condition={promptSuccess}>
				<SuccessPrompt data-testid='success-prompt'>
					Request headers saved for submission
				</SuccessPrompt>
			</If>
			<If condition={inputIndex.length !== 0}>
				<SaveButton
					type='submit'
					dataTestid='save-requestHeader-button'
					variant={ButtonVariants.BlueButton}
					label='Save'
					width='w-1/4'
				/>
			</If>
		</FormWrapper>
	);
}
