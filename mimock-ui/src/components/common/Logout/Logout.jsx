import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import { Cookies } from 'react-cookie';
import { useRecoilState } from 'recoil';
import showFullPageLoader from 'atoms/showFullPageLoader';
import { routes } from 'constants/routes';
import { globalConstants } from 'constants/globalConstants';

export default function Logout() {
	const [, setOpenFullPageLoader] = useRecoilState(showFullPageLoader);
	const [clearingSession, setClearingSession] = useState(true);

	useEffect(() => {
		setOpenFullPageLoader(true);

		const cookies = new Cookies();
		cookies.remove(globalConstants.XSRF_COOKIE_NAME, {
			path: '/',
		});
		cookies.remove(globalConstants.AUTH_TOKEN_COOKIE_NAME, {
			path: '/',
		});

		setClearingSession(false);
		setOpenFullPageLoader(false);
	}, []);

	return (
		<If condition={!clearingSession}>
			<Navigate to={routes.root} replace={true} />
		</If>
	);
}
