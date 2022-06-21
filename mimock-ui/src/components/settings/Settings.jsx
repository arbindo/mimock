import React, { useEffect, useState } from 'react';
import Header from './Header';
import UserRole from './UserRole';
import { getUserDetails } from 'utils/jwtUtils';
import PlatformSettings from './PlatformSettings';

function Settings() {
	const [username, setUsername] = useState('');
	const [userrole, setUserrole] = useState('');
	const [isReadOnlyUser, setIsReadOnlyUser] = useState(false);

	useEffect(() => {
		try {
			const userDetails = getUserDetails();
			const { userName, userRole } = userDetails;
			const isReadOnlyUser =
				userDetails && userDetails.userRole === 'ROLE_VIEWER';
			setIsReadOnlyUser(isReadOnlyUser);
			setUsername(userName);
			setUserrole(userRole.split('_')[1]);
		} catch (e) {
			console.log(e);
		}
	}, []);

	return (
		<>
			<Header username={username} />
			<UserRole role={userrole}></UserRole>
			<If condition={!isReadOnlyUser}>
				<PlatformSettings />
			</If>
		</>
	);
}

export default Settings;
