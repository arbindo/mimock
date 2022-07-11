import React from 'react';
import QueryParam from './QueryParams';
import RequestHeaders from './RequestHeaders';
import RequestBody from './RequestBody';
import Response from './Response';
import ResponseHeaders from './ResponseHeaders';

export const addMockFormInputData = (data, mode) => {
	const inputData = [
		{
			name: 'name',
			label: 'Mock name',
			type: 'text',
			placeholder: 'Enter mock name',
			validators: {
				required: 'Mock name is required',
				value: data?.name?.toString(),
				minLength: {
					value: 5,
					message: 'Name must be at least 5 characters',
				},
				maxLength: {
					value: 255,
					message: 'Name must be at most 255 characters',
				},
			},
		},
		{
			name: 'description',
			label: 'Mock description',
			type: 'text',
			placeholder: 'Enter mock description',
			validators: {
				required: 'Mock description is required',
				value: data?.description?.toString(),
				minLength: {
					value: 1,
					message: 'Description must be at least 1 character',
				},
				maxLength: {
					value: 255,
					message: 'Description must be at most 255 characters',
				},
			},
		},
		{
			name: 'statusCode',
			label: 'HTTP Status',
			type: 'text',
			placeholder: 'Enter HTTP status',
			validators: {
				required: 'HTTP status is required',
				valueAsNumber: true,
				value: data?.statusCode?.toString() || 200,
				validate: {
					lessThan: (v) => parseInt(v) < 600 || 'Not a valid HTTP status',
					greaterThan: (v) => parseInt(v) >= 100 || 'Not a valid HTTP status',
				},
			},
		},
		{
			name: 'route',
			label: 'Route to mock',
			type: 'text',
			placeholder: 'Enter route to mock',
			hint: (
				<div className='w-full'>
					<div className='my-2 font-bold font-sans'>
						Example: <code>/api/v1/users</code>
					</div>
					<ul className='list-disc ml-4'>
						<li>Route should not be the root (/)</li>
						<li>Route should start with a forward slash</li>
						<li>Route should not contain query parameters</li>
						<li>Route should not contain a trailing slash</li>
						<li>Route should not start with /mimock-ui/</li>
						<li>Route should not start with /api/mimock/</li>
					</ul>
				</div>
			),
			validators: {
				required: 'Route is required',
				value: data?.route?.toString(),
				minLength: {
					value: 2,
					message: 'Route must be at least 2 characters',
				},
				validate: {
					notRoot: (v) => v !== '/' || 'Route cannot be the root (/)',
					notUIPath: (v) =>
						!v.startsWith('/mimock-ui') || 'Route cannot start with /mimock-ui',
					notAPIPath: (v) =>
						!v.startsWith('/api/mimock') ||
						'Route cannot start with /api/mimock',
					notQueryParams: (v) =>
						!v.includes('?') || 'Route cannot contain query parameters',
					notTrailingSlash: (v) =>
						!v.endsWith('/') || 'Route cannot contain a trailing slash',
					startsWithForwardSlash: (v) =>
						v.startsWith('/') || 'Route must start with a forward slash',
				},
			},
		},
	];

	if (mode === 'create') {
		return inputData;
	}

	if (data && data.name && data.description && data.route) {
		return inputData;
	}
};

export const accordionData = [
	{
		title: 'Query Params',
		id: 'query',
		content: <QueryParam />,
	},
	{
		title: 'Request Headers',
		id: 'requestHeader',
		content: <RequestHeaders />,
	},
	{
		title: 'Request Body',
		id: 'requestBody',
		content: <RequestBody />,
	},
	{
		title: 'Response',
		id: 'response',
		content: <Response />,
	},
	{
		title: 'Response Headers',
		id: 'responseHeaders',
		content: <ResponseHeaders />,
	},
];
