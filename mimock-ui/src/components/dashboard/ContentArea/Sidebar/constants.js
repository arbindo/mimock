export const constants = {
	title: 'Tools',
	label: {
		sort: 'Sort By',
		group: 'Group By',
		radiogroup: 'Filter By Response Type',
		badgefilter: 'Filter By HTTP Method',
	},
	sortItems: [
		'Mock Name',
		'Http Method',
		'Status Code',
		'Route',
		'Time Created',
	],
	groupItems: ['Http Method', 'Status Code'],
	radioGroupItems: ['Textual Response', 'Binary Response', 'No Response'],
	badgeFilterItems: [
		{
			httpMethod: 'GET',
			badgeColor: 'border-2 border-blue-500 text-blue-500',
		},
		{
			httpMethod: 'POST',
			badgeColor: 'border-2 border-green-500 text-green-500',
		},
		{
			httpMethod: 'PUT',
			badgeColor: 'border-2 border-yellow-500 text-yellow-500',
		},
		{
			httpMethod: 'DELETE',
			badgeColor: 'border-2 border-red-500 text-red-500',
		},
		{
			httpMethod: 'PATCH',
			badgeColor: 'border-2 border-yellow-900 text-yellow-900',
		},
		{
			httpMethod: 'CONNECT',
			badgeColor: 'border-2 border-pink-500 text-pink-500',
		},
		{
			httpMethod: 'HEAD',
			badgeColor: 'border-2 border-indigo-500 text-indigo-500',
		},
		{
			httpMethod: 'TRACE',
			badgeColor: 'border-2 border-violet-500 text-violet-500',
		},
		{
			httpMethod: 'OPTIONS',
			badgeColor: 'border-2 border-gray-500 text-gray-500',
		},
	],
};
