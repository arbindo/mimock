import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getMockById } from 'services/mockManagement/mockManagement.service';
import { Cookies } from 'react-cookie';
import { globalConstants } from 'constants/globalConstants';
import { DetailContainer } from './Detail.style';
import DetailToolbar from './detailtoolbar/DetailToolbar';

function Detail() {
	const [mock, setMock] = useState(null);

	const location = useLocation();
	const cookies = new Cookies();
	const authCookieRef = useRef('');
	const csrfCookieRef = useRef('');

	useEffect(() => {
		authCookieRef.current = cookies.get(globalConstants.AUTH_TOKEN_COOKIE_NAME);
		csrfCookieRef.current = cookies.get(globalConstants.XSRF_COOKIE_NAME);
	}, []);

	useEffect(() => {
		if (location.pathname != undefined) {
			const mockId = location.pathname.split('/detail/')[1];
			getMockById(mockId, authCookieRef)
				.then((res) => {
					console.log(res.data);
					setMock(res.data.data);
				})
				.catch((err) => console.log(err));
		}
	}, []);

	return (
		<DetailContainer data-testid='detail-section'>
			<DetailToolbar />
			<If condition={mock != null}>Mock Fetched From Backend</If>
		</DetailContainer>
	);
}

export default Detail;
