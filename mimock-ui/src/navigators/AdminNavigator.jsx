import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PermissionErrorPage from 'components/common/PermissionErrorPage';
import { useRecoilState } from 'recoil';
import { getUserDetails } from 'utils/jwtUtils';
import showFullPageLoader from 'atoms/showFullPageLoader';

function Navigator({ children }) {
	const [, setOpenFullPageLoader] = useRecoilState(showFullPageLoader);
	const [isLoading, setIsLoading] = useState(true);
	const [isAdminUser, setIsAdminUser] = useState(false);

	useEffect(() => {
		setOpenFullPageLoader(true);

		try {
			const userDetails = getUserDetails();
			setIsAdminUser(userDetails && userDetails.userRole === 'ROLE_ADMIN');
		} catch (e) {
			console.error(e);
		} finally {
			setOpenFullPageLoader(false);
			setIsLoading(false);
		}
	}, []);

	return (
		<If condition={!isLoading}>
			<Choose>
				<When condition={!isLoading && isAdminUser}>{children}</When>
				<Otherwise>
					<PermissionErrorPage />
				</Otherwise>
			</Choose>
		</If>
	);
}

Navigator.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Navigator;
