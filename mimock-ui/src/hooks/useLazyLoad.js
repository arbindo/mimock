import { useEffect, useState, useRef } from 'react';
import { Cookies } from 'react-cookie';
import { listMocksWithMultipleFilters } from 'services/mockManagement/mockManagement.service';
import {
	globalConstants,
	mockManagementConstants,
} from 'constants/globalConstants';

function useLazyLoad(mocksListView, pageNumber, httpMethodFilter) {
	const cookies = new Cookies();
	const authCookieRef = useRef('');
	const csrfCookieRef = useRef('');

	useEffect(() => {
		authCookieRef.current = cookies.get(globalConstants.AUTH_TOKEN_COOKIE_NAME);
		csrfCookieRef.current = cookies.get(globalConstants.XSRF_COOKIE_NAME);
	}, []);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({
		status: false,
		message: '',
	});
	const [mocksList, setMocksList] = useState([]);
	const [listTitle, setListTitle] = useState('');
	const [isFilter, setIsFilter] = useState(false);
	const [hasMore, setHasMore] = useState(false);

	const DEFAULT = mockManagementConstants.DEFAULT_STATUS;
	const ACTIVE = mockManagementConstants.ACTIVE_STATUS;
	const ARCHIVED = mockManagementConstants.ARCHIVED_STATUS;
	const DELETED = mockManagementConstants.DELETED_STATUS;

	const isHttpMethodFilterExists =
		httpMethodFilter !== undefined && httpMethodFilter !== '';
	const isDefaultView = mocksListView === DEFAULT;

	useEffect(() => {
		setMocksList([]);
	}, [mocksListView, httpMethodFilter]);

	useEffect(() => {
		setLoading(true);
		setIsFilter(isHttpMethodFilterExists || !isDefaultView);

		async function callMockService(
			mocksListView,
			httpMethodFilter,
			authCookieRef,
			pageNumber
		) {
			let entityStatusString = '';
			switch (mocksListView) {
				case ACTIVE: {
					entityStatusString = 'NONE';
					setListTitle(mockManagementConstants.headerTitle.active);
					break;
				}
				case ARCHIVED: {
					entityStatusString = 'ARCHIVED';
					setListTitle(mockManagementConstants.headerTitle.archived);
					break;
				}
				case DELETED: {
					entityStatusString = 'DELETED';
					setListTitle(mockManagementConstants.headerTitle.deleted);
					break;
				}
				default: {
					entityStatusString = '';
					setListTitle(mockManagementConstants.headerTitle.all);
					break;
				}
			}
			let mocksListResponse = {
				data: null,
				status: 0,
				isLast: false,
			};
			const listMocksResponse = await listMocksWithMultipleFilters(
				authCookieRef,
				pageNumber,
				entityStatusString,
				httpMethodFilter
			);
			mocksListResponse.data = listMocksResponse.data.content;
			mocksListResponse.status = listMocksResponse.status;
			mocksListResponse.isLast = listMocksResponse.data.last;
			if (mocksListResponse != null && mocksListResponse.status == 200) {
				return mocksListResponse;
			} else {
				const unexpectedStateErrorMsg = `Server responded with Status:${mocksListResponse.status}. Unable To List Mocks !!`;
				setError({
					status: true,
					message: mockManagementConstants.errors.unexpectedState,
				});
				throw unexpectedStateErrorMsg;
			}
		}

		callMockService(mocksListView, httpMethodFilter, authCookieRef, pageNumber)
			.then((res) => {
				setMocksList((prevList) => {
					if (isHttpMethodFilterExists) {
						return [...res.data];
					} else {
						const combinedArray = [...prevList, ...res.data];
						return combinedArray;
					}
				});
				setHasMore(!res.isLast);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setError({
					status: true,
					message: mockManagementConstants.errors.serverError,
				});
			});
	}, [mocksListView, pageNumber, httpMethodFilter]);

	return { mocksList, listTitle, isFilter, loading, error, hasMore };
}

export default useLazyLoad;
