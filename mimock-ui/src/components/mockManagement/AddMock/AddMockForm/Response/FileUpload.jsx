import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import IconButton from '@mui/material/IconButton';
import { useRecoilState } from 'recoil';
import fileDownload from 'js-file-download';
import mime from 'mime';
import newMockFieldsAtom from 'atoms/newMockFieldsAtom';
import {
	FileUploadWrapper,
	UploadContainer,
	UploadInput,
	UploadedFile,
	UploadMessage,
	Label,
	File,
	SizeHint,
	UploadError,
	DownloadFile,
	RemoveFile,
} from './Response.style';
import { DeleteIcon, ActionToolTip } from '../FormCommon.style';

function FileUpload({ binaryFile, setBinaryFile }) {
	const [mockData] = useRecoilState(newMockFieldsAtom);

	const [isError, setIsError] = useState({
		error: false,
		errorMessage: '',
	});
	const [mode, setMode] = useState('');

	const onDrop = useCallback((acceptedFiles) => {
		setIsError({ error: false, errorMessage: '' });
		setMode('create');

		if (acceptedFiles.length <= 0) {
			setIsError({
				error: true,
				errorMessage: 'The file is not allowed',
			});
			return;
		}
		setBinaryFile(acceptedFiles[0]);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		multiple: false,
		maxSize: 5242880,
		onDrop,
		onError: (error) => {
			console.log(error);
			setIsError({
				error: true,
				errorMessage: error.message,
			});
		},
	});

	const downloadFile = (e) => {
		e.preventDefault();

		const fileName = `${mockData.id}.${mime.getExtension(
			mockData.responseContentType
		)}`;

		fileDownload(binaryFile, fileName);
	};

	useEffect(() => {
		setMode(mockData.mode);
	}, [mockData.mode]);

	return (
		<FileUploadWrapper data-testid='file-upload'>
			<Choose>
				<When condition={!binaryFile}>
					<UploadContainer {...getRootProps({ className: 'dropzone' })}>
						<UploadInput data-testid='upload-input' {...getInputProps()} />
						<UploadMessage data-testid='upload-message'>
							Drag and drop to upload the file
						</UploadMessage>
						<SizeHint data-testid='upload-size-hint'>
							Max upload size : 5 MB
						</SizeHint>
						<If condition={isError.error}>
							<UploadError data-testid='upload-error'>
								{isError.errorMessage}
							</UploadError>
						</If>
					</UploadContainer>
				</When>
				<Otherwise>
					<UploadedFile data-testid='uploaded-file'>
						<Label data-testid='uploaded-label'>Uploaded file</Label>
						<Choose>
							<When condition={mode === 'create'}>
								<File data-testid='uploaded-file-details'>
									{binaryFile.name} - {binaryFile.size} bytes
								</File>
							</When>
							<When condition={mode === 'edit'}>
								<DownloadFile
									label='Download file'
									dataTestid={`download-file-${mockData.id}`}
									background='bg-blue-500'
									color='text-white'
									additionalStyles='ml-0 break-normal'
									width='w-1/3'
									onclickHandler={downloadFile}
								/>
							</When>
						</Choose>
						<RemoveFile>
							<ActionToolTip
								data-testid={`remove-file`}
								key={'tooltip-remove'}
								title={'Remove file'}
								arrow
							>
								<IconButton
									onClick={() => {
										setBinaryFile(null);
									}}
								>
									<DeleteIcon />
								</IconButton>
							</ActionToolTip>
						</RemoveFile>
					</UploadedFile>
				</Otherwise>
			</Choose>
		</FileUploadWrapper>
	);
}

FileUpload.propTypes = {
	binaryFile: PropTypes.object,
	setBinaryFile: PropTypes.func.isRequired,
};

export default FileUpload;
