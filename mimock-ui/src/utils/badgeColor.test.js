import { decideBadgeColor } from './badgeColor';

describe('decideBadgeColor', () => {
	it.each([
		['GET', 'border-2 border-blue-500 text-blue-500'],
		['POST', 'border-2 border-green-500 text-green-500'],
		['PUT', 'border-2 border-yellow-500 text-yellow-500'],
		['DELETE', 'border-2 border-red-500 text-red-500'],
		['PATCH', 'border-2 border-yellow-900 text-yellow-900'],
		['CONNECT', 'border-2 border-pink-500 text-pink-500'],
		['HEAD', 'border-2 border-indigo-500 text-indigo-500'],
		['TRACE', 'border-2 border-violet-500 text-violet-500'],
	])('should render %s HTTP method badge', (httpMethod, expected) => {
		const color = decideBadgeColor(httpMethod);

		expect(color).toBe(expected);
	});
});
