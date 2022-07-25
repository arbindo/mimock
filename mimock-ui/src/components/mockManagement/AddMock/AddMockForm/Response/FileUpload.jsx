import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import IconButton from '@mui/material/IconButton';
import { useRecoilState } from 'recoil';
import fileDownload from 'js-file-download';
import mime from 'mime';
import newMockFieldsAtom from 'atoms/newMockFieldsAtom';
import { IconButtonVariants } from 'styles/Button';
import { mockManagementConstants } from 'constants/mockManagementConstants';
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

function FileUpload({ responseContentType, binaryFile, setBinaryFile }) {
	const [mockData] = useRecoilState(newMockFieldsAtom);

	const [isError, setIsError] = useState({
		error: false,
		errorMessage: '',
	});
	const [mode, setMode] = useState('');

	const onDrop = useCallback((acceptedFiles) => {
		if (acceptedFiles.length > 0) {
			setIsError({
				error: false,
				errorMessage: '',
			});
			setMode(mockManagementConstants.mode.CREATE);
			setBinaryFile(acceptedFiles[0]);
		}
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		multiple: false,
		maxSize: 5242880,
		onDrop,
		validator: (file) => {
			if (file.size > 5242880) {
				const error = {
					error: true,
					errorMessage: 'The file size is too large. Max size is 5MB',
				};
				setIsError(error);
				return error;
			}

			const fileType = mime.getType(file.path);

			if (
				responseContentType !== 'application/octet-stream' &&
				fileType !== responseContentType
			) {
				const rejectedFileType = mime.getExtension(fileType);
				const error = {
					error: true,
					errorMessage: `The file type ${rejectedFileType} is not allowed for ${responseContentType}`,
				};
				setIsError(error);
				return error;
			}

			return null;
		},
	});

	const downloadFile = (e) => {
		e.preventDefault();

		const fileName = `${mockData.id}.${
			mime.getExtension(mockData.responseContentType) || 'bin'
		}`;

		fileDownload(binaryFile, fileName);
	};

	useEffect(() => {
		setMode(mockData.mode);
	}, [mockData.mode]);

	useEffect(() => {
		if (binaryFile === null) {
			return;
		}

		if (mockData.responseContentType !== responseContentType) {
			setBinaryFile(null);
		} else {
			if (mockData.binaryFile) {
				setBinaryFile(mockData.binaryFile);
			}
		}
	}, [responseContentType]);

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
							<When condition={mode === mockManagementConstants.mode.CREATE}>
								<File data-testid='uploaded-file-details'>
									{binaryFile.name} - {binaryFile.size} bytes
								</File>
							</When>
							<When condition={mode === mockManagementConstants.mode.EDIT}>
								<DownloadFile
									dataTestid={`download-file-${mockData.id}`}
									label='Download file'
									variant={IconButtonVariants.DownloadButton}
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
	responseContentType: PropTypes.string.isRequired,
};

FileUpload.defaultProps = {
	binaryFile: null,
};

export default FileUpload;
