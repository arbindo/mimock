import React, { useState } from 'react';
import {
	createMock,
	deleteMockById,
	getMockById,
	updateMock,
} from './api/mocks/MocksApi';
import { Buffer } from 'buffer';

const PlatformApi = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [token, setToken] = useState('');
	const [mockId, setMockId] = useState('');
	const [response, setResponse] = useState('');

	const login = async () => {
		const token = Buffer.from(`${username}:${password}`, 'utf8').toString(
			'base64'
		);
		setToken(token);
	};

	const createMockOperation = async () => {
		let formData = new FormData();
		formData.append('name', 'Mock Name' + new Date().toUTCString());
		formData.append('route', 'github/api/pull');
		formData.append('httpMethod', 'GET');
		formData.append('statusCode', 200);
		const createdMockResponse = await createMock(formData, token);
		console.log(createdMockResponse);
		setResponse(JSON.stringify(createdMockResponse));
		const mockId = createdMockResponse.data.data.id;
		setMockId(mockId);
	};

	const getMockOperation = async () => {
		const getMockResponse = await getMockById(mockId, token);
		console.log(getMockResponse);
		setResponse(JSON.stringify(getMockResponse));
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
		console.log(updatedMockResponse);
		setResponse(JSON.stringify(updatedMockResponse));
	};

	const deleteMockOperation = async () => {
		const deletedMockResponse = await deleteMockById(mockId, token);
		console.log(deletedMockResponse);
		setResponse(JSON.stringify(deletedMockResponse));
	};

	return (
		<div data-testid='platform-api' className='mt-10 text-3xl mx-auto w-screen'>
			<div className='w-full mb-20'>
				<div className='font-sans font-bold text-lg mb-10 ml-6 dark:text-gray-100'>
					Mimock Platform APIs
				</div>
				<If condition={token == ''}>
					<div className='overflow-hidden border-t border-l border-r border-gray-400 px-3 py-10 bg-white-200 flex justify-center'>
						<form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='username'
								>
									Username
								</label>
								<input
									className='shadow appearance-none text-base border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id='username'
									type='text'
									placeholder='bruce'
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
							<div className='mb-6'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='password'
								>
									Password
								</label>
								<input
									className='shadow appearance-none text-base border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
									id='password'
									type='password'
									placeholder='batcave'
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className='flex items-center justify-between'>
								<button
									className='bg-blue-500 hover:bg-blue-700 text-base text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline'
									type='button'
									onClick={() => login()}
								>
									Sign In
								</button>
							</div>
						</form>
					</div>
				</If>
				<If condition={token != ''}>
					<div className='overflow-hidden border-t border-l border-r border-gray-400 px-3 py-10 bg-white-200 flex justify-center'>
						<div
							className='px-2 py-1 mx-2 my-1 bg-yellow-400 text-black rounded shadow cursor-pointer'
							onClick={() => createMockOperation()}
						>
							Create Mock
						</div>
						<div
							className='px-2 py-1 mx-2 my-1 bg-yellow-400 text-black rounded shadow cursor-pointer'
							onClick={() => getMockOperation()}
						>
							Get Mock
						</div>
						<div
							className='px-2 py-1 mx-2 my-1 bg-yellow-400 text-black rounded shadow cursor-pointer'
							onClick={() => updateMockOperation()}
						>
							Update Mock
						</div>
						<div
							className='px-2 py-1 mx-2 my-1 bg-yellow-400 text-black rounded shadow cursor-pointer'
							onClick={() => deleteMockOperation()}
						>
							Delete Mock
						</div>
					</div>
				</If>
				<If condition={mockId != ''}>
					<div className='flex my-2 py-2'>
						<div className='rounded-lg text-white bg-gray-800 text-sm p-2 m-2'>
							Mock Id: {mockId}
						</div>
					</div>
				</If>
				<If condition={response != ''}>
					<div className='flex my-2 py-2'>
						<div className='rounded-lg text-white bg-gray-800 text-sm p-2 m-2'>
							{response}
						</div>
					</div>
				</If>
			</div>
		</div>
	);
};

export default PlatformApi;
