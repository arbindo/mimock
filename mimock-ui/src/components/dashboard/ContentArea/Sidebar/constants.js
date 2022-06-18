export const constants = {
	headerTitle: 'Tools',
	title: {
		exportBtn: 'Export Mocks',
		importBtn: 'Coming Soon!!',
	},
	label: {
		sort: 'Sort By',
		group: 'Group By',
		radiogroup: 'Filter By Response Type',
		badgefilter: 'Filter By HTTP Method',
		exportImport: 'Export-Import Mocks',
		exportMocksBtn: 'Export',
		importMocksBtn: 'Import',
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
			badgeColor: 'border-blue-500 text-blue-500',
			activeBadgeColor: 'border-blue-400 bg-blue-500 text-white',
		},
		{
			httpMethod: 'POST',
			badgeColor: 'border-green-500 text-green-500',
			activeBadgeColor: 'border-green-400 bg-green-500 text-white',
		},
		{
			httpMethod: 'PUT',
			badgeColor: 'border-yellow-500 text-yellow-500',
			activeBadgeColor: 'border-yellow-400 bg-yellow-500 text-black',
		},
		{
			httpMethod: 'DELETE',
			badgeColor: 'border-red-500 text-red-500',
			activeBadgeColor: 'border-red-400 bg-red-500 text-white',
		},
		{
			httpMethod: 'PATCH',
			badgeColor: 'border-yellow-900 text-yellow-900',
			activeBadgeColor: 'border-yellow-800 bg-yellow-900 text-white',
		},
		{
			httpMethod: 'CONNECT',
			badgeColor: 'border-pink-500 text-pink-500',
			activeBadgeColor: 'border-pink-400 bg-pink-500 text-white',
		},
		{
			httpMethod: 'HEAD',
			badgeColor: 'border-indigo-500 text-indigo-500',
			activeBadgeColor: 'border-indigo-400 bg-indigo-500 text-white',
		},
		{
			httpMethod: 'TRACE',
			badgeColor: 'border-violet-500 text-violet-500',
			activeBadgeColor: 'border-violet-400 bg-violet-500 text-white',
		},
		{
			httpMethod: 'OPTIONS',
			badgeColor: 'border-gray-500 text-gray-500',
			activeBadgeColor: 'border-gray-400 bg-gray-500 text-white',
		},
	],
};
