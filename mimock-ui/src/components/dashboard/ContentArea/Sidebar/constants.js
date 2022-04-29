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
	],
};
