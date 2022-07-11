import React, { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import { VscListFlat, VscCode } from 'react-icons/vsc';
import { useRecoilState } from 'recoil';
import newMockFieldsAtom from 'atoms/newMockFieldsAtom';
import { ButtonVariants } from 'styles/Button';
import { TextInput } from 'styles';
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

export default function ResponseHeaders() {
	const [inputIndex, setInputIndex] = useState([]);
	const [counter, setCounter] = useState(0);
	const [inputState, setInputState] = useState({});
	const [viewMode, setViewMode] = useState('text');
	const [mockData, setMockData] = useRecoilState(newMockFieldsAtom);
	const [responseHeaderValue, setResponseHeaderValue] = useState(
		mockData.responseHeaders
	);
	const [parsingError, setParsingError] = useState(false);
	const [promptSuccess, setPromptSuccess] = useState(false);

	useEffect(() => {
		if (mockData.responseHeaders) {
			let parsedResponseHeader;
			try {
				parsedResponseHeader = JSON.parse(mockData.responseHeaders);
			} catch (e) {
				setParsingError(true);
				return;
			}
			setResponseHeaderValue(JSON.stringify(parsedResponseHeader, null, 2));
		}
	}, [mockData.responseHeaders]);

	useEffect(() => {
		if (counter === 0) {
			setMockData({
				...mockData,
				responseHeaders: '',
			});
		}
	}, [counter]);

	useEffect(() => {
		if (responseHeaderValue === '' || responseHeaderValue === '{}') {
			setResponseHeaderValue('');
			setInputIndex([0]);
			setCounter(1);
			setInputState({
				responseHeader_0_key: '',
				responseHeader_0_value: '',
			});

			return;
		}

		let responseHeaders;
		try {
			const sanitizedValue = responseHeaderValue
				.replaceAll("'", '"')
				.replace(/[\n\r\t]*/g, '');

			responseHeaders = JSON.parse(sanitizedValue.toString());
		} catch (e) {
			setParsingError(true);
			return;
		}
		setParsingError(false);

		const keys = Object.keys(responseHeaders);

		if (responseHeaders && keys.length) {
			const indices = keys.map((key, idx) => idx);
			setInputIndex(indices);
			setCounter(keys.length);

			const inputStates = {};
			indices.forEach((idx) => {
				inputStates[`responseHeader_${idx}_key`] = keys[idx];
				inputStates[`responseHeader_${idx}_value`] =
					responseHeaders[keys[idx]].toString();
			});

			setInputState(inputStates);
		} else {
			setInputIndex([]);
			setCounter(0);
			setInputState({});
		}
	}, [responseHeaderValue]);

	const buildHeaders = () => {
		let headerObject = {};

		inputIndex.forEach((idx) => {
			const key = inputState[`responseHeader_${idx}_key`];
			const value = inputState[`responseHeader_${idx}_value`];

			if (!key || !value) {
				return;
			}

			headerObject[key] = value;
		});

		setResponseHeaderValue(JSON.stringify(headerObject, null, 2));
	};

	const input = (index) => {
		return (
			<InputContainer key={`responseHeaderContainer-${index}`}>
				<TextInput
					name={`responseHeader_${index}_key`}
					dataTestId={`responseHeader_${index}_key`}
					placeHolder='key'
					value={inputState[`responseHeader_${index}_key`]}
					onChange={(e) => {
						setInputState({
							...inputState,
							[`responseHeader_${index}_key`]: e.target.value,
						});
					}}
				/>
				<TextInput
					name={`responseHeader_${index}_value`}
					dataTestId={`responseHeader_${index}_value`}
					placeHolder='value'
					value={inputState[`responseHeader_${index}_value`]}
					onChange={(e) => {
						setInputState({
							...inputState,
							[`responseHeader_${index}_value`]: e.target.value,
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
			[`responseHeader_${counter}_key`]: '',
			[`responseHeader_${counter}_value`]: '',
		});
	};

	const removeInput = (index) => {
		const newInputIndex = inputIndex.filter((i) => i !== index);
		setInputIndex(newInputIndex);
		setCounter(counter - 1);

		let tempInputValues = inputState;
		delete tempInputValues[`responseHeader_${index}_key`];
		delete tempInputValues[`responseHeader_${index}_value`];

		setInputState(tempInputValues);
	};

	const saveHeaders = (e) => {
		e.preventDefault();

		let headerObject = {};
		inputIndex.forEach((idx) => {
			headerObject[inputState[`responseHeader_${idx}_key`]] =
				inputState[`responseHeader_${idx}_value`];
		});
		setMockData({
			...mockData,
			responseHeaders: JSON.stringify(headerObject, null, 2),
		});

		setPromptSuccess(true);
		setTimeout(() => {
			setPromptSuccess(false);
		}, 6000);
	};

	return (
		<FormWrapper data-testid='response-headers-wrapper'>
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
						<TextWrapper data-testid='response-header-text'>
							<ParsedTextArea
								type='text'
								data-testid='response-header-text-input'
								placeholder='Enter response headers as JSON'
								rows={10}
								value={responseHeaderValue}
								onChange={(e) => {
									setResponseHeaderValue(e.target.value);
								}}
							/>
						</TextWrapper>
					</If>
				</Otherwise>
			</Choose>
			<If condition={parsingError}>
				<FailurePrompt data-testid='parsing-error'>
					Failed to parse response headers text
				</FailurePrompt>
			</If>
			<If condition={promptSuccess && !parsingError}>
				<SuccessPrompt data-testid='success-prompt'>
					Response headers saved for submission
				</SuccessPrompt>
			</If>
			<If condition={!parsingError && inputIndex.length !== 0}>
				<SaveButton
					dataTestid='save-responseHeader-button'
					variant={ButtonVariants.BlueButton}
					label='Save'
					width='w-1/4'
					background='bg-grey-50'
					color='text-gray-600'
					hover='hover:border-gray-500 hover:bg-gray-200'
					padding='py-2 px-2'
					additionalStyles='mx-0 break-normal p-0 border-2 border-gray-400'
					onclickHandler={saveHeaders}
				/>
			</If>
		</FormWrapper>
	);
}
