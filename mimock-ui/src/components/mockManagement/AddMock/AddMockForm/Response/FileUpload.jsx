import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import IconButton from '@mui/material/IconButton';
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

function FileUpload({ binaryFile, setBinaryFile }) {
	const onDrop = useCallback((acceptedFiles) => {
		setBinaryFile(acceptedFiles[0]);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		multiple: false,
		maxSize: 5242880,
		onDrop,
	});

	return (
		<FileUploadWrapper data-testid='file-upload'>
			<Choose>
				<When condition={!binaryFile}>
					<UploadContainer {...getRootProps({ className: 'dropzone' })}>
						<UploadInput data-testid='upload-input' {...getInputProps()} />
						<UploadMessage data-testid='upload-message'>
							Drag and drop to upload the file
						</UploadMessage>
					</UploadContainer>
				</When>
				<Otherwise>
					<UploadedFile data-testid='uploaded-file'>
						<Label data-testid='uploaded-label'>Uploaded files</Label>
						<File data-testid='uploaded-file-details'>
							{binaryFile.name} - {binaryFile.size} bytes
						</File>
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
