import React, { useState, useEffect, useRef } from 'react';
import { Cookies } from 'react-cookie';
import { globalConstants } from 'constants/globalConstants';
import {
	ListContainer,
	ListEmptyStateWrapper,
	EmptyStateImage,
	ListEmptyStateMessage,
} from './List.style.js';
import { listMocks } from 'services/mockManagement/mockManagement.service';
import MockCard from './MockCard';
import EmptyState from 'assets/empty-state.png';

function List() {
	const cookies = new Cookies();
	const authCookieRef = useRef('');
	const csrfCookieRef = useRef('');
	const [mocksList, setMocksList] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		authCookieRef.current = cookies.get(globalConstants.AUTH_TOKEN_COOKIE_NAME);
		csrfCookieRef.current = cookies.get(globalConstants.XSRF_COOKIE_NAME);
	}, []);

	useEffect(() => {
		async function callMockService() {
			const mocksListResponse = await listMocks(authCookieRef);
			if (mocksListResponse.status == 200) {
				return mocksListResponse.data.content;
			}
			setErrorMessage('Unable To List Mocks');
		}
		callMockService()
			.then((apiArr) => {
				console.log(apiArr);
				setMocksList(apiArr);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<ListContainer data-testid='list-section'>
			<If condition={errorMessage == ''}>
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

export default List;
