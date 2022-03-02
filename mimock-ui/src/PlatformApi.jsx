import React, { Component, useEffect, useState } from 'react'
import { createMock, getMocks } from './api/mocks/MocksApi';
import { Buffer } from 'buffer';

const PlatformApi = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const callApi = async () => {
        const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
        const data = await getMocks(token)
        .then(() => 'Fetched Mocks')
        .catch(() => 'Error');
        console.log(data);
    }

    return (
        <div data-testid='platform-api' className='mt-10 text-3xl mx-auto w-screen'>
            <div className="w-full mb-20">
                <div className='font-sans font-bold text-lg mb-10 ml-6 dark:text-gray-100'>
                    Mimock Platform API's
				</div>
                <div className='w-full flex flex-col mx-4 my-4'>
                    <div className="my-2">
                        <input type="text" placeholder='Enter username' onChange={setUsername} className='my-2 border rounded' />
                    </div>
                    <div className="my-2">
                        <input type="password" placeholder='Enter password' onChange={setPassword} className='my-2 border rounded' />
                    </div>
                    <div className="my-2">
                        <button className='p-2 rounded shadow' onClick={() => callApi()}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlatformApi;

