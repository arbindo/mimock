import { get } from 'api/AxiosClient';
import { mockManagementConstants } from 'constants/mockManagementConstants';

export const getResponseTypes = async () => {
	return await get('/static-records/response-content-types')
		.then((res) => {
			let textTypes = [];
			let binaryTypes = [];

			res.data.forEach((item) => {
				if (
					item.responseType.name === mockManagementConstants.TEXTUAL_RESPONSE
				) {
					textTypes.push(item.contentType);
				} else {
					binaryTypes.push(item.contentType);
				}
			});

			return {
				TEXTUAL_RESPONSE: textTypes,
				BINARY_RESPONSE: binaryTypes,
			};
		})
		.catch((err) => Promise.reject(err));
};
