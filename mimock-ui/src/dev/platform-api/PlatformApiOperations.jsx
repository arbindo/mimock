import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
	getAllMocks,
	createMock,
	deleteMockById,
	forceDeleteMockById,
	getMockById,
	updateMock,
	listMocks,
	listArchivedMocks,
	listDeletedMocks,
	archiveMock,
	unarchiveMock,
	exportMocks,
	exportMocksCsvTemplate,
} from '../../api/MocksApi';
import {
	listEntityStatus,
	listHttpMethods,
	listResponseContentTypes,
} from '../../api/StaticRecordsApi';
import { CustomButton } from 'styles';

const PlatformApiOperations = ({ loggedIn, token }) => {
	const [mockId, setMockId] = useState('');
	const [response, setResponse] = useState('');

	useEffect(() => {
		if (!loggedIn) {
			setMockId('');
			setResponse('');
		}
	}, [loggedIn]);

	const getAllMocksOperation = async () => {
		const allMocksResponse = await getAllMocks(token);
		setMockId('');
		setResponse(JSON.stringify(allMocksResponse, null, 2));
	};

	const createMockOperation = async () => {
		let formData = new FormData();
		formData.append('name', 'Mock Name' + new Date().toUTCString());
		formData.append('route', 'github/api/pull');
		formData.append('httpMethod', 'GET');
		formData.append('statusCode', 200);
		const createdMockResponse = await createMock(formData, token);
		setResponse(JSON.stringify(createdMockResponse, null, 2));
		const mockId = createdMockResponse.data.data.id;
		setMockId(mockId);
	};

	const getMockOperation = async () => {
		const getMockResponse = await getMockById(mockId, token);
		setResponse(JSON.stringify(getMockResponse, null, 2));
	};

	const updateMockOperation = async () => {
		let updatedFormData = new FormData();
		updatedFormData.append(
			'name',
			'Updated Mock Name' + new Date().toUTCString()
		);
		updatedFormData.append('route', 'github/api/pull/v2');
		updatedFormData.append('httpMethod', 'POST');
		updatedFormData.append('statusCode', 201);
		const updatedMockResponse = await updateMock(
			mockId,
			updatedFormData,
			token
		);
		setResponse(JSON.stringify(updatedMockResponse, null, 2));
	};

	const deleteMockOperation = async () => {
		const deletedMockResponse = await deleteMockById(mockId, token);
		setResponse(JSON.stringify(deletedMockResponse, null, 2));
	};

	const forceDeleteMockOperation = async () => {
		const deletedMockResponse = await forceDeleteMockById(mockId, token);
		setMockId('');
		setResponse(JSON.stringify(deletedMockResponse, null, 2));
	};

	const renderListViewOperation = async () => {
		const listMocksResponse = await listMocks(token);
		setMockId('');
		setResponse(JSON.stringify(listMocksResponse, null, 2));
	};

	const renderArchivedViewOperation = async () => {
		const archivedMocksResponse = await listArchivedMocks(token);
		setMockId('');
		setResponse(JSON.stringify(archivedMocksResponse, null, 2));
	};

	const renderRecycleBinViewOperation = async () => {
		const deletedMocksResponse = await listDeletedMocks(token);
		setMockId('');
		setResponse(JSON.stringify(deletedMocksResponse, null, 2));
	};

	const archiveMockOperation = async () => {
		const archivedMockResponse = await archiveMock(mockId, token);
		setResponse(JSON.stringify(archivedMockResponse, null, 2));
	};

	const unarchiveMockOperation = async () => {
		const unarchivedMockResponse = await unarchiveMock(mockId, token);
		setResponse(JSON.stringify(unarchivedMockResponse, null, 2));
	};

	const exportMocksOperation = async () => {
		const exportMocksResponse = await exportMocks(token);
		setResponse(JSON.stringify(exportMocksResponse, null, 2));
	};

	const exportMocksCsvTemplateOperation = async () => {
		const exportMocksCsvTemplateResponse = await exportMocksCsvTemplate(token);
		setResponse(JSON.stringify(exportMocksCsvTemplateResponse, null, 2));
	};

	const listHttpMethodsOperation = async () => {
		setMockId('');
		const response = await listHttpMethods(token);
		setResponse(JSON.stringify(response, null, 2));
	};

	const listResponseContentTypesOperation = async () => {
		setMockId('');
		const response = await listResponseContentTypes(token);
		setResponse(JSON.stringify(response, null, 2));
	};

	const listEntityStatusOperation = async () => {
		setMockId('');
		const response = await listEntityStatus(token);
		setResponse(JSON.stringify(response, null, 2));
	};

	return (
		<>
			<If condition={loggedIn}>
				<div className='flex mt-10 mb-4'>
					<div className='w-full grid grid-cols-4 gap-2 gap-y-8'>
						<CustomButton
							background='bg-yellow-400'
							color='text-black'
							label='Create Mock'
							onclickHandler={() => {
								createMockOperation();
							}}
						></CustomButton>
						<CustomButton
							background='bg-yellow-400'
							color='text-black'
							label='Get Mock'
							onclickHandler={() => {
								getMockOperation();
							}}
						></CustomButton>
						<CustomButton
							background='bg-yellow-400'
							color='text-black'
							label='Update Mock'
							onclickHandler={() => {
								updateMockOperation();
							}}
						></CustomButton>
						<CustomButton
							background='bg-yellow-400'
							color='text-black'
							label='Delete Mock'
							onclickHandler={() => {
								deleteMockOperation();
							}}
						></CustomButton>
						<CustomButton
							background='bg-yellow-400'
							color='text-black'
							label='Force Delete Mock'
							onclickHandler={() => {
								forceDeleteMockOperation();
							}}
						></CustomButton>
						<CustomButton
							background='bg-yellow-400'
							color='text-black'
							label='Get All Mocks'
							onclickHandler={() => {
								getAllMocksOperation();
							}}
						></CustomButton>
						<CustomButton
							background='bg-yellow-400'
							color='text-black'
							label='Render List'
							onclickHandler={() => {
								renderListViewOperation();
							}}
						></CustomButton>
						<CustomButton
							background='bg-yellow-400'
							color='text-black'
							label='Render Archived'
							onclickHandler={() => {
								renderArchivedViewOperation();
							}}
						></CustomButton>
						<CustomButton
							background='bg-yellow-400'
							color='text-black'
							label='Render RecycleBin'
							onclickHandler={() => {
								renderRecycleBinViewOperation();
							}}
						></CustomButton>
						<CustomButton
							background='bg-yellow-400'
							color='text-black'
							label='Archive Mock'
							onclickHandler={() => {
								archiveMockOperation();
							}}
						></CustomButton>
						<CustomButton
							background='bg-yellow-400'
							color='text-black'
							label='Unarchive Mock'
							onclickHandler={() => {
								unarchiveMockOperation();
							}}
						></CustomButton>
						<CustomButton
							background='bg-yellow-400'
							color='text-black'
							label='Export Mocks'
							onclickHandler={() => {
								exportMocksOperation();
							}}
						></CustomButton>
						<CustomButton
							background='bg-yellow-400'
							color='text-black'
							label='Export Template'
							onclickHandler={() => {
								exportMocksCsvTemplateOperation();
							}}
						></CustomButton>
						<CustomButton
							background='bg-yellow-400'
							color='text-black'
							label='HTTP Methods'
							onclickHandler={() => {
								listHttpMethodsOperation();
							}}
						></CustomButton>
						<CustomButton
							background='bg-yellow-400'
							color='text-black'
							label='ResponseContentTypes'
							onclickHandler={() => {
								listResponseContentTypesOperation();
							}}
						></CustomButton>
						<CustomButton
							background='bg-yellow-400'
							color='text-black'
							label='EntityStatus'
							onclickHandler={() => {
								listEntityStatusOperation();
							}}
						></CustomButton>
					</div>
				</div>

				<div className='flex flex-col p-4 mx-4 overflow-hidden'>
					<If condition={mockId != ''}>
						<div className='rounded-lg text-white bg-gray-800 text-sm p-4 mt-8 mb-4'>
							Mock Id: {mockId}
						</div>
					</If>
					<If condition={response != ''}>
						<pre className='rounded-lg text-white bg-gray-800 text-sm p-4 mt-4 mb-2'>
							{response}
						</pre>
					</If>
				</div>
			</If>
		</>
	);
};

PlatformApiOperations.propTypes = {
	loggedIn: PropTypes.bool.isRequired,
	token: PropTypes.string,
};

export default PlatformApiOperations;
