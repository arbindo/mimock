import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getMockById } from 'services/mockManagement/mockManagement.service';
import { Cookies } from 'react-cookie';
import { globalConstants } from 'constants/globalConstants';
import { DetailContainer } from './Detail.style';
import DetailToolbar from './detailtoolbar/DetailToolbar';
import DetailHeader from './detailheader';
import DetailContentViewer from './detailcontentviewer';
import { decideBadgeColor } from 'utils/badgeColor.js';

function Detail() {
	const [mock, setMock] = useState(null);
	const [badgeColor, setBadgeColor] = useState('');

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
					const color = decideBadgeColor(res.data.data.httpMethod.method);
					setBadgeColor(color);
				})
				.catch((err) => console.log(err));
		}
	}, []);

	return (
		<DetailContainer data-testid='detail-section'>
			<DetailToolbar />
			<If condition={mock != null}>
				<DetailHeader mock={mock} badgeColor={badgeColor} />
				<DetailContentViewer mock={mock} />
			</If>
		</DetailContainer>
	);
}

export default Detail;
