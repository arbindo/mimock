export const decideBadgeColor = (httpMethod) => {
	const colorMap = {
		GET: 'blue-500',
		POST: 'green-500',
		PUT: 'yellow-500',
		DELETE: 'red-500',
		PATCH: 'yellow-900',
		CONNECT: 'pink-500',
		HEAD: 'indigo-500',
		TRACE: 'violet-500',
		OPTIONS: 'gray-500',
	};

	const color = colorMap[httpMethod] || 'gray-500';

	return `border-2 border-${color} text-${color}`;
};
