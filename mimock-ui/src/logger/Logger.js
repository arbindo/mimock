export const Log = (url, response) => {
	console.log(`URL: ${url}; Status: ${response.status};`);
	console.log(`Response: ${JSON.stringify(response.data)}`);
};

export const LogError = (message) => {
	console.error(message);
};
