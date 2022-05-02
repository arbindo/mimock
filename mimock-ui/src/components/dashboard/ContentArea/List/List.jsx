import React, { useState, useEffect, useRef } from 'react';
import { Cookies } from 'react-cookie';
import { globalConstants } from 'constants/globalConstants';
import {
	ListContainer,
	ListTitle,
	ListClearFilter,
	ListClearFilterText,
	ListTitleSpan,
	MessageWrapper,
	MessageImageIcon,
	MessageSpan,
	LoaderStyle,
} from './List.style.js';
import {
	listArchivedMocks,
	listDeletedMocks,
	listMocks,
	listActiveMocks,
} from 'services/mockManagement/mockManagement.service';
import MockCard from './MockCard';
import EmptyState from 'assets/empty-state.png';
import ErrorState from 'assets/server-down-state-2.png';
import PropTypes from 'prop-types';
import { FaFilter } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import BarLoader from 'react-spinners/BarLoader';

function List({ mocksListView, handleClearFilter }) {
	const cookies = new Cookies();
	const authCookieRef = useRef('');
	const csrfCookieRef = useRef('');
	const [mocksList, setMocksList] = useState([]);
	const [listTitle, setListTitle] = useState('');
	const [isFilter, setIsFilter] = useState(false);
	const [error, setError] = useState({
		status: false,
		message: '',
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		authCookieRef.current = cookies.get(globalConstants.AUTH_TOKEN_COOKIE_NAME);
		csrfCookieRef.current = cookies.get(globalConstants.XSRF_COOKIE_NAME);
	}, []);

	useEffect(() => {
		setLoading(true);
		async function callMockService(mocksListView) {
			let mocksListResponse = {
				data: null,
				status: 0,
			};
			switch (mocksListView) {
				case 'ACTIVE': {
					const listActiveMocksApiResponse = await listActiveMocks(
						authCookieRef
					);
					mocksListResponse.data = listActiveMocksApiResponse.data.content;
					mocksListResponse.status = listActiveMocksApiResponse.status;
					setListTitle('Active Mocks');
					setIsFilter(true);
					break;
				}
				case 'ARCHIVED': {
					const listArchivedMocksApiResponse = await listArchivedMocks(
						authCookieRef
					);
					mocksListResponse.data = listArchivedMocksApiResponse.data.content;
					mocksListResponse.status = listArchivedMocksApiResponse.status;
					setListTitle('Archived Mocks');
					setIsFilter(true);
					break;
				}
				case 'DELETED': {
					const listDeletedMocksApiResponse = await listDeletedMocks(
						authCookieRef
					);
					mocksListResponse.data = listDeletedMocksApiResponse.data.content;
					mocksListResponse.status = listDeletedMocksApiResponse.status;
					setListTitle('Deleted Mocks');
					setIsFilter(true);
					break;
				}
				default: {
					const listAllMocksApiResponse = await listMocks(authCookieRef);
					mocksListResponse.data = listAllMocksApiResponse.data.content;
					mocksListResponse.status = listAllMocksApiResponse.status;
					setListTitle('All Mocks');
					setIsFilter(false);
					break;
				}
			}
			if (mocksListResponse != null && mocksListResponse.status == 200) {
				return mocksListResponse.data;
			} else {
				setError({
					status: true,
					message: `Server responded with Status:${mocksListResponse.status}. Unable To List Mocks !!`,
				});
				return null;
			}
		}
		callMockService(mocksListView)
			.then((apiArr) => {
				setMocksList(apiArr);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setError({
					status: true,
					message: 'Unable To Reach Server, Contact your system admin!!',
				});
				setLoading(false);
			});
	}, [mocksListView]);

	return (
		<ListContainer data-testid='list-section'>
			<BarLoader
				data-testid='list-mocks-loader'
				loading={loading}
				color='teal'
				size={1000}
				css={LoaderStyle}
			/>
			<Choose>
				<When condition={error.status}>
					<MessageWrapper>
						<MessageImageIcon src={ErrorState} />
						<MessageSpan>{error.message}</MessageSpan>
					</MessageWrapper>
				</When>
				<When condition={!error.status && !loading}>
					<ListTitleSpan>
						<If condition={isFilter}>
							<FaFilter />
						</If>
						<ListTitle>{listTitle}</ListTitle>
						<If condition={isFilter}>
							<ListClearFilter>
								<MdCancel />
								<ListClearFilterText onClick={handleClearFilter}>
									Clear Filter
								</ListClearFilterText>
							</ListClearFilter>
						</If>
					</ListTitleSpan>
					<Choose>
						<When condition={mocksList.length > 0}>
							<For each='mock' of={mocksList}>
								<MockCard
									key={mock.id}
									id={mock.id}
									mockName={mock.mockName}
									description={mock.description}
									httpMethod={mock.httpMethod.method}
									route={mock.route}
								/>
							</For>
						</When>
						<When condition={mocksList.length == 0}>
							<MessageWrapper>
								<MessageImageIcon src={EmptyState} />
								<MessageSpan>No mocks to display!!!</MessageSpan>
							</MessageWrapper>
						</When>
					</Choose>
				</When>
			</Choose>
		</ListContainer>
	);
}

List.propTypes = {
	mocksListView: PropTypes.string.isRequired,
	handleClearFilter: PropTypes.func.isRequired,
};

export default List;
