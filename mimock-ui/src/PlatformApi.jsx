import React, { useState } from 'react';
import {
	createMock,
	deleteMockById,
	getMockById,
	updateMock,
} from './api/MocksApi';
import { Button, CustomButton } from 'styles';
import { ButtonVariants } from './styles/components/Button';
import { Buffer } from 'buffer';

const PlatformApi = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [token, setToken] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const [mockId, setMockId] = useState('');
	const [response, setResponse] = useState('');

	const login = async () => {
		const token = Buffer.from(`${username}:${password}`, 'utf8').toString(
			'base64'
		);
		setToken(token);
		setLoggedIn(true);
		setUsername('');
		setPassword('');
	};

	const logout = async () => {
		setToken('');
		setLoggedIn(false);
	};

	const createMockOperation = async () => {
		let formData = new FormData();
		formData.append('name', 'Mock Name' + new Date().toUTCString());
		formData.append('route', 'github/api/pull');
		formData.append('httpMethod', 'GET');
		formData.append('statusCode', 200);
		const createdMockResponse = await createMock(formData, token);
		console.log(createdMockResponse);
		setResponse(JSON.stringify(createdMockResponse, null, 2));
		const mockId = createdMockResponse.data.data.id;
		setMockId(mockId);
	};

	const getMockOperation = async () => {
		const getMockResponse = await getMockById(mockId, token);
		console.log(getMockResponse);
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
		console.log(updatedMockResponse);
		setResponse(JSON.stringify(updatedMockResponse, null, 2));
	};

	const deleteMockOperation = async () => {
		const deletedMockResponse = await deleteMockById(mockId, token);
		console.log(deletedMockResponse);
		setResponse(JSON.stringify(deletedMockResponse, null, 2));
	};

	return (
		<div data-testid='platform-api' className='mt-10 text-3xl mx-auto w-screen'>
			<div className='w-full mb-20'>
				<div className='flex justify-center'>
					<div className='font-sans font-bold mb-10 ml-6 dark:text-gray-100'>
						Mimock Platform APIs
					</div>
				</div>
				<If condition={loggedIn}>
					<div className='font-sans text-lg mb-2 mt-2 p-2 dark:text-gray-100'>
						<span className='underline cursor-pointer' onClick={() => logout()}>
							Logout
						</span>
					</div>
				</If>
				<If condition={!loggedIn}>
					<div className='overflow-hidden px-3 py-10 bg-white-200 flex justify-center'>
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
								<Button
									variant={ButtonVariants.TealButton}
									label='LOGIN'
									onclickHandler={() => {
										login();
									}}
								></Button>
							</div>
						</form>
					</div>
				</If>
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
			</div>
		</div>
	);
};

export default PlatformApi;
