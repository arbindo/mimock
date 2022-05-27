export const decideBadgeColor = (httpMethod) => {
	let color = '';
	switch (httpMethod) {
		case 'GET':
			color = 'blue-500';
			break;
		case 'POST':
			color = 'green-500';
			break;
		case 'PUT':
			color = 'yellow-500';
			break;
		case 'DELETE':
			color = 'red-500';
			break;
		case 'PATCH':
			color = 'yellow-900';
			break;
		case 'CONNECT':
			color = 'pink-500';
			break;
		case 'HEAD':
			color = 'indigo-500';
			break;
		case 'TRACE':
			color = 'violet-500';
			break;
		case 'OPTIONS':
			color = 'gray-500';
			break;
		default:
			color = 'gray-500';
			break;
	}
	return `border-2 border-${color} text-${color}`;
};
