import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import { useRecoilState } from 'recoil';
import fileDownload from 'js-file-download';
import mime from 'mime';
import FileUpload from './FileUpload';

let mockedRecoilFn = jest.fn();
jest.mock('recoil');

jest.mock('js-file-download');
jest.mock('mime');

const mockSetBinaryFile = jest.fn();

describe('FileUpload', () => {
	beforeEach(() => {
		useRecoilState.mockImplementation(() => {
			return [
				{
					id: '1',
					name: '',
					responseType: 'BINARY_RESPONSE',
					responseContentType: 'image/png',
					expectedTextResponse: '',
					binaryFile: null,
					mode: 'create',
				},
				mockedRecoilFn,
			];
		});
	});

	it('should render file upload input', async () => {
		let tree;
		await act(async () => {
			tree = await render(
				<FileUpload
					responseContentType='application/pdf'
					setBinaryFile={mockSetBinaryFile}
				/>
			);
		});

		const { getByTestId, queryByTestId, container } = tree;

		expect(getByTestId('file-upload')).toBeInTheDocument();
		expect(getByTestId('upload-input')).toBeInTheDocument();
		expect(getByTestId('upload-size-hint')).toHaveTextContent(
			'Max upload size : 5 MB'
		);
		expect(getByTestId('upload-message')).toHaveTextContent(
			'Drag and drop to upload the file'
		);

		expect(queryByTestId('upload-error')).not.toBeInTheDocument();
		expect(queryByTestId('uploaded-file')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should drop file to dropzone input', async () => {
		mime.getType.mockImplementation(() => 'image/png');

		let tree;
		await act(async () => {
			tree = await render(
				<FileUpload
					responseContentType='image/png'
					setBinaryFile={mockSetBinaryFile}
				/>
			);
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

	it('should show error when file type is not valid', async () => {
		useRecoilState.mockImplementation(() => {
			return [
				{
					id: '1',
					name: '',
					responseType: 'BINARY_RESPONSE',
					responseContentType: 'application/pdf',
					expectedTextResponse: '',
					binaryFile: null,
					mode: 'create',
				},
				mockedRecoilFn,
			];
		});

		mime.getType.mockImplementation(() => 'image/jpeg');
		mime.getExtension.mockImplementation(() => 'jpeg');

		let tree;
		await act(async () => {
			tree = await render(
				<FileUpload
					responseContentType='application/pdf'
					setBinaryFile={mockSetBinaryFile}
				/>
			);
		});

		const { getByTestId, queryByTestId, container } = tree;

		expect(getByTestId('file-upload')).toBeInTheDocument();

		const fileInput = getByTestId('upload-input');
		await act(async () => {
			fireEvent.change(fileInput, {
				target: { files: [new File([], 'test.jpeg')] },
			});
		});

		expect(mockSetBinaryFile).toHaveBeenCalledTimes(0);

		expect(getByTestId('upload-input')).toBeInTheDocument();
		expect(getByTestId('upload-error')).toHaveTextContent(
			'The file type jpeg is not allowed for application/pdf'
		);

		expect(queryByTestId('uploaded-file')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should show error when file size is greater than 5MB', async () => {
		mime.getType.mockImplementation(() => 'image/png');

		let tree;
		await act(async () => {
			tree = await render(
				<FileUpload
					responseContentType='image/png'
					setBinaryFile={mockSetBinaryFile}
				/>
			);
		});

		const { getByTestId, queryByTestId, container } = tree;

		expect(getByTestId('file-upload')).toBeInTheDocument();

		const fileInput = getByTestId('upload-input');
		const file = new File([], 'test.png');
		Object.defineProperty(file, 'size', { value: 6000000 });

		await act(async () => {
			fireEvent.change(fileInput, {
				target: { files: [file] },
			});
		});

		expect(mockSetBinaryFile).toHaveBeenCalledTimes(0);

		expect(getByTestId('upload-input')).toBeInTheDocument();
		expect(getByTestId('upload-error')).toHaveTextContent(
			'The file size is too large. Max size is 5MB'
		);

		expect(queryByTestId('uploaded-file')).not.toBeInTheDocument();

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
				<FileUpload
					responseContentType='image/png'
					binaryFile={file}
					setBinaryFile={mockSetBinaryFile}
				/>
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

	it('should render file upload input for edit mode', async () => {
		const blob = new Blob([137, 80, 78, 71]);

		jest.spyOn(mime, 'getExtension').mockReturnValue('png');

		useRecoilState.mockImplementation(() => {
			return [
				{
					id: '1',
					name: 'Image mock',
					responseType: 'BINARY_RESPONSE',
					responseContentType: 'image/png',
					binaryFile: blob,
					mode: 'edit',
				},
				mockedRecoilFn,
			];
		});

		let tree;
		await act(async () => {
			tree = await render(
				<FileUpload
					responseContentType='image/png'
					binaryFile={blob}
					setBinaryFile={mockSetBinaryFile}
				/>
			);
		});

		const { getByTestId, queryByTestId, container } = tree;

		expect(getByTestId('file-upload')).toBeInTheDocument();
		expect(getByTestId('download-file-1')).toBeInTheDocument();
		expect(getByTestId('remove-file')).toBeInTheDocument();

		expect(queryByTestId('upload-input')).not.toBeInTheDocument();
		expect(queryByTestId('uploaded-file-details')).not.toBeInTheDocument();
		expect(queryByTestId('upload-size-hint')).not.toBeInTheDocument();
		expect(queryByTestId('upload-message')).not.toBeInTheDocument();
		expect(queryByTestId('upload-error')).not.toBeInTheDocument();

		await act(async () => {
			fireEvent.click(getByTestId('download-file-1'));
		});

		expect(mime.getExtension).toHaveBeenCalledTimes(1);
		expect(mime.getExtension).toHaveBeenCalledWith('image/png');

		expect(fileDownload).toHaveBeenCalledTimes(1);
		expect(fileDownload).toHaveBeenCalledWith(blob, '1.png');

		expect(container).toMatchSnapshot();
	});

	it('should fallback to bin extension when extension for content type is null', async () => {
		const blob = new Blob([138, 80, 78, 72]);

		jest.spyOn(mime, 'getExtension').mockReturnValue(null);

		useRecoilState.mockImplementation(() => {
			return [
				{
					id: '2',
					name: 'Audio mock',
					responseType: 'BINARY_RESPONSE',
					responseContentType: 'audio/aac',
					binaryFile: blob,
					mode: 'edit',
				},
				mockedRecoilFn,
			];
		});

		let tree;
		await act(async () => {
			tree = await render(
				<FileUpload binaryFile={blob} setBinaryFile={mockSetBinaryFile} />
			);
		});

		const { getByTestId, queryByTestId, container } = tree;

		expect(getByTestId('file-upload')).toBeInTheDocument();
		expect(getByTestId('download-file-2')).toBeInTheDocument();
		expect(getByTestId('remove-file')).toBeInTheDocument();

		expect(queryByTestId('upload-input')).not.toBeInTheDocument();
		expect(queryByTestId('uploaded-file-details')).not.toBeInTheDocument();
		expect(queryByTestId('upload-size-hint')).not.toBeInTheDocument();
		expect(queryByTestId('upload-message')).not.toBeInTheDocument();
		expect(queryByTestId('upload-error')).not.toBeInTheDocument();

		await act(async () => {
			fireEvent.click(getByTestId('download-file-2'));
		});

		expect(mime.getExtension).toHaveBeenCalledTimes(1);
		expect(mime.getExtension).toHaveBeenCalledWith('audio/aac');

		expect(fileDownload).toHaveBeenCalledTimes(1);
		expect(fileDownload).toHaveBeenCalledWith(blob, '2.bin');

		expect(container).toMatchSnapshot();
	});
});
