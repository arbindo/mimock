import React, { useState, useEffect, useRef } from 'react';
import { Cookies } from 'react-cookie';
import { globalConstants } from 'constants/globalConstants';
import {
	ListContainer,
	ListTitle,
	ListClearFilter,
	ListClearFilterText,
	ListTitleSpan,
	ListEmptyStateWrapper,
	EmptyStateImage,
	ListEmptyStateMessage,
} from './List.style.js';
import {
	listArchivedMocks,
	listDeletedMocks,
	listMocks,
	getAllMocks,
} from 'services/mockManagement/mockManagement.service';
import MockCard from './MockCard';
import EmptyState from 'assets/empty-state.png';
import PropTypes from 'prop-types';
import { FaFilter } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

function List({ mocksListView, handleClearFilter }) {
	const cookies = new Cookies();
	const authCookieRef = useRef('');
	const csrfCookieRef = useRef('');
	const [mocksList, setMocksList] = useState([]);
	const [listTitle, setListTitle] = useState('');
	const [isFilter, setIsFilter] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		authCookieRef.current = cookies.get(globalConstants.AUTH_TOKEN_COOKIE_NAME);
		csrfCookieRef.current = cookies.get(globalConstants.XSRF_COOKIE_NAME);
	}, []);

	useEffect(() => {
		async function callMockService(mocksListView) {
			console.log(mocksListView);
			let mocksListResponse = {
				data: null,
				status: 0,
			};
			switch (mocksListView) {
				case 'ACTIVE': {
					const listMocksApiResponse = await listMocks(authCookieRef);
					mocksListResponse.data = listMocksApiResponse.data.content;
					mocksListResponse.status = listMocksApiResponse.status;
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
					const getAllMocksApiResponse = await getAllMocks(authCookieRef);
					mocksListResponse.data = getAllMocksApiResponse.data;
					mocksListResponse.status = getAllMocksApiResponse.status;
					setListTitle('All Mocks');
					setIsFilter(false);
					break;
				}
			}
			if (mocksListResponse != null && mocksListResponse.status == 200) {
				return mocksListResponse.data;
			} else {
				setErrorMessage('Unable To List Mocks');
			}
		}
		callMockService(mocksListView)
			.then((apiArr) => {
				console.log(apiArr);
				setMocksList(apiArr);
			})
			.catch((err) => console.log(err));
	}, [mocksListView]);

	return (
		<ListContainer data-testid='list-section'>
			<If condition={errorMessage == ''}>
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
				<If condition={mocksList.length > 0}>
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
				</If>
				<If condition={mocksList.length == 0}>
					<ListEmptyStateWrapper>
						<EmptyStateImage src={EmptyState} />
						<ListEmptyStateMessage>
							No mocks to display!!!
						</ListEmptyStateMessage>
					</ListEmptyStateWrapper>
				</If>
			</If>
		</ListContainer>
	);
}

List.propTypes = {
	mocksListView: PropTypes.string.isRequired,
	handleClearFilter: PropTypes.func.isRequired,
};

export default List;
