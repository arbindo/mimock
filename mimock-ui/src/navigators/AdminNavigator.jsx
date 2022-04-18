import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FullPageLoader } from 'styles/Loaders';
import PermissionErrorPage from 'components/common/PermissionErrorPage';
import { getUserDetails } from 'utils/jwtUtils';

function Navigator({ children }) {
	const [isLoading, setIsLoading] = useState(true);
	const [isAdminUser, setIsAdminUser] = useState(false);

	useEffect(() => {
		try {
			const userDetails = getUserDetails();
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
