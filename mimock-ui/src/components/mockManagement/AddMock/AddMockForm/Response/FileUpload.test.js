import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import FileUpload from './FileUpload';

const mockSetBinaryFile = jest.fn();

describe('FileUpload', () => {
	it('should render file upload input', async () => {
		let tree;
		await act(async () => {
			tree = await render(<FileUpload setBinaryFile={mockSetBinaryFile} />);
		});

		const { getByTestId, queryByTestId, container } = tree;

		expect(getByTestId('file-upload')).toBeInTheDocument();
		expect(getByTestId('upload-input')).toBeInTheDocument();
		expect(getByTestId('upload-message')).toHaveTextContent(
			'Drag and drop to upload the file'
		);

		expect(queryByTestId('uploaded-file')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should drop file to dropzone input', async () => {
		let tree;
		await act(async () => {
			tree = await render(<FileUpload setBinaryFile={mockSetBinaryFile} />);
		});

		const { getByTestId, queryByTestId, rerender, container } = tree;

		expect(getByTestId('file-upload')).toBeInTheDocument();
		expect(queryByTestId('uploaded-file')).not.toBeInTheDocument();

		const fileInput = getByTestId('upload-input');
		const file = new File(['file'], 'ping.png', {
			type: 'image/png',
		});
		await act(async () => {
			fireEvent.change(fileInput, { target: { files: [file] } });
		});

		expect(mockSetBinaryFile).toHaveBeenCalledTimes(1);
		expect(mockSetBinaryFile).toHaveBeenCalledWith(file);

		await act(async () => {
			rerender(
				<FileUpload binaryFile={file} setBinaryFile={mockSetBinaryFile} />
			);
		});

		expect(queryByTestId('upload-input')).not.toBeInTheDocument();

		expect(getByTestId('uploaded-file')).toBeInTheDocument();
		expect(getByTestId('uploaded-label')).toHaveTextContent('Uploaded file');

		expect(container).toMatchSnapshot();
	});

	it('should remove uploaded file', async () => {
		const file = new File(['file'], 'ping.png', {
			type: 'image/png',
			path: 'ping.png',
		});

		let tree;
		await act(async () => {
			tree = await render(
				<FileUpload binaryFile={file} setBinaryFile={mockSetBinaryFile} />
			);
		});

		const { getByTestId, queryByTestId } = tree;

		expect(getByTestId('file-upload')).toBeInTheDocument();
		expect(queryByTestId('upload-input')).not.toBeInTheDocument();

		expect(getByTestId('uploaded-file')).toBeInTheDocument();
		expect(getByTestId('uploaded-label')).toHaveTextContent('Uploaded file');
		expect(getByTestId('uploaded-file-details')).toHaveTextContent(
			'ping.png - 4 bytes'
		);

		await act(async () => {
			await fireEvent.click(getByTestId('remove-file'));
		});

		expect(mockSetBinaryFile).toHaveBeenCalledTimes(1);
		expect(mockSetBinaryFile).toHaveBeenCalledWith(null);
	});
});
