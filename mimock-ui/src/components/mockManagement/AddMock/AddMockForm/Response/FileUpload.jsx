import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import IconButton from '@mui/material/IconButton';
import { useRecoilState } from 'recoil';
import newMockFieldsAtom from 'atoms/newMockFieldsAtom';
import {
	FileUploadWrapper,
	UploadContainer,
	UploadInput,
	UploadedFile,
	UploadMessage,
	Label,
	File,
} from './Response.style';
import { DeleteIcon, ActionToolTip } from '../FormCommon.style';

export default function FileUpload() {
	const [mockData, setMockData] = useRecoilState(newMockFieldsAtom);

	const onDrop = useCallback(
		(acceptedFiles) => {
			setMockData({
				...mockData,
				binaryFile: acceptedFiles[0],
			});
		},
		[setMockData]
	);

	const { getRootProps, getInputProps } = useDropzone({
		multiple: false,
		maxSize: 5242880,
		onDrop,
	});

	return (
		<FileUploadWrapper data-testid='file-upload'>
			<Choose>
				<When condition={mockData.binaryFile === ''}>
					<UploadContainer {...getRootProps({ className: 'dropzone' })}>
						<UploadInput {...getInputProps()} />
						<UploadMessage>Drag and drop the file to upload</UploadMessage>
					</UploadContainer>
				</When>
				<Otherwise>
					<UploadedFile key={mockData.binaryFile.path}>
						<Label>Uploaded files</Label>
						<File>
							{mockData.binaryFile.path} - {mockData.binaryFile.size} bytes
						</File>
						<ActionToolTip
							data-testid={`remove-file`}
							key={'tooltip-remove'}
							title={'Remove file'}
							arrow
						>
							<IconButton
								onClick={() => {
									setMockData({
										...mockData,
										binaryFile: '',
									});
								}}
							>
								<DeleteIcon />
							</IconButton>
						</ActionToolTip>
					</UploadedFile>
				</Otherwise>
			</Choose>
		</FileUploadWrapper>
	);
}
