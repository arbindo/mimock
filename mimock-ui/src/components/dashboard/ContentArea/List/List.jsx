import React, { useState, useEffect, useRef } from 'react';
import { Cookies } from 'react-cookie';
import { globalConstants } from 'constants/globalConstants';
import { ListContainer } from './List.style.js';
import { listMocks } from 'services/mockManagement/mockManagement.service';
import MockCard from './MockCard';
import PropTypes from 'prop-types';

function List({ showSidebarSection }) {
	const cookies = new Cookies();
	const authCookieRef = useRef('');
	const csrfCookieRef = useRef('');
	const [mocksList, setMocksList] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');
	const [listSectionWidth, setListSectionWidth] = useState('');

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

	useEffect(() => {
		setListSectionWidth(showSidebarSection ? 'w-4/6' : 'w-full');
	}, [showSidebarSection]);

	return (
		<ListContainer data-testid='list-section' className={listSectionWidth}>
			<If condition={errorMessage == ''}>
				{mocksList.map((data) => (
					<MockCard
						key={data.id}
						id={data.id}
						mockName={data.mockName}
						description={data.description}
						httpMethod={data.httpMethod.method}
						route={data.route}
					/>
				))}
			</If>
		</ListContainer>
	);
}

List.propTypes = {
	showSidebarSection: PropTypes.bool.isRequired,
};

export default List;
