import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Cookies } from 'react-cookie';
import { Buffer } from 'buffer';
import { FullPageLoader } from 'styles/Loaders';
import { globalConstants } from 'src/constants/globalConstants';
import PermissionErrorPage from 'components/common/PermissionErrorPage';

function Navigator({ children }) {
	const [isLoading, setIsLoading] = useState(true);
	const [isAdminUser, setIsAdminUser] = useState(false);

	const isAuthTokenInValid = (authToken) => {
		return (
			authToken === '' ||
			typeof authToken === undefined ||
			typeof authToken !== 'string'
		);
	};

	useEffect(() => {
		const cookie = new Cookies();
		const authToken = cookie.get(globalConstants.AUTH_TOKEN_COOKIE_NAME);
		if (isAuthTokenInValid(authToken)) {
			setIsLoading(false);
			return;
		}

		try {
			const decodedStr = Buffer.from(
				authToken.split('.')[1],
				'base64'
			).toString();
			const userDetails = JSON.parse(decodedStr);
			setIsAdminUser(userDetails && userDetails.userRole === 'ROLE_ADMIN');
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return (
		<Choose>
			<When condition={isLoading}>
				<FullPageLoader />
			</When>
			<Otherwise>
				<Choose>
					<When condition={!isLoading && isAdminUser}>{children}</When>
					<Otherwise>
						<PermissionErrorPage />
					</Otherwise>
				</Choose>
			</Otherwise>
		</Choose>
	);
}

Navigator.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Navigator;
