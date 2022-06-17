import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PermissionErrorPage from 'components/common/PermissionErrorPage';
import { useRecoilState } from 'recoil';
import { getUserDetails } from 'utils/jwtUtils';
import showFullPageLoader from 'atoms/showFullPageLoader';

function RoleBasedNavigator({ children, allowedRoles }) {
	const [, setOpenFullPageLoader] = useRecoilState(showFullPageLoader);
	const [isLoading, setIsLoading] = useState(true);
	const [isAllowedUserRole, setIsAllowedUserRole] = useState(false);

	useEffect(() => {
		setOpenFullPageLoader(true);

		try {
			const userDetails = getUserDetails();
			setIsAllowedUserRole(
				allowedRoles && allowedRoles.includes(userDetails?.userRole)
			);
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
				<When condition={!isLoading && isAllowedUserRole}>{children}</When>
				<Otherwise>
					<PermissionErrorPage />
				</Otherwise>
			</Choose>
		</If>
	);
}

RoleBasedNavigator.propTypes = {
	children: PropTypes.node.isRequired,
	allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RoleBasedNavigator;
