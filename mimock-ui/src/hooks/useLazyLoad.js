import { useEffect, useState, useRef } from 'react';
import { Cookies } from 'react-cookie';
import {
	listArchivedMocks,
	listDeletedMocks,
	listMocks,
	listActiveMocks,
} from 'services/mockManagement/mockManagement.service';
import {
	globalConstants,
	mockManagementConstants,
} from 'constants/globalConstants';

function useLazyLoad(mocksListView, pageNumber) {
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

	const ACTIVE = mockManagementConstants.ACTIVE_STATUS;
	const ARCHIVED = mockManagementConstants.ARCHIVED_STATUS;
	const DELETED = mockManagementConstants.DELETED_STATUS;

	useEffect(() => {
		setMocksList([]);
	}, [mocksListView]);

	useEffect(() => {
		setLoading(true);

		async function callMockService(mocksListView, authCookieRef, pageNumber) {
			let mocksListResponse = {
				data: null,
				status: 0,
				isLast: false,
			};
			switch (mocksListView) {
				case ACTIVE: {
					const listActiveMocksApiResponse = await listActiveMocks(
						authCookieRef,
						pageNumber
					);
					mocksListResponse.data = listActiveMocksApiResponse.data.content;
					mocksListResponse.status = listActiveMocksApiResponse.status;
					mocksListResponse.isLast = listActiveMocksApiResponse.data.last;
					setListTitle(mockManagementConstants.headerTitle.active);
					setIsFilter(true);
					break;
				}
				case ARCHIVED: {
					const listArchivedMocksApiResponse = await listArchivedMocks(
						authCookieRef,
						pageNumber
					);
					mocksListResponse.data = listArchivedMocksApiResponse.data.content;
					mocksListResponse.status = listArchivedMocksApiResponse.status;
					mocksListResponse.isLast = listArchivedMocksApiResponse.data.last;
					setListTitle(mockManagementConstants.headerTitle.archived);
					setIsFilter(true);
					break;
				}
				case DELETED: {
					const listDeletedMocksApiResponse = await listDeletedMocks(
						authCookieRef,
						pageNumber
					);
					mocksListResponse.data = listDeletedMocksApiResponse.data.content;
					mocksListResponse.status = listDeletedMocksApiResponse.status;
					mocksListResponse.isLast = listDeletedMocksApiResponse.data.last;

					setListTitle(mockManagementConstants.headerTitle.deleted);
					setIsFilter(true);
					break;
				}
				default: {
					const listAllMocksApiResponse = await listMocks(
						authCookieRef,
						pageNumber
					);
					mocksListResponse.data = listAllMocksApiResponse.data.content;
					mocksListResponse.status = listAllMocksApiResponse.status;
					mocksListResponse.isLast = listAllMocksApiResponse.data.last;
					setListTitle(mockManagementConstants.headerTitle.all);
					setIsFilter(false);
					break;
				}
			}
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

		callMockService(mocksListView, authCookieRef, pageNumber)
			.then((res) => {
				setMocksList((prevList) => {
					return [...prevList, ...res.data];
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
	}, [mocksListView, pageNumber]);

	return { mocksList, listTitle, isFilter, loading, error, hasMore };
}

export default useLazyLoad;
