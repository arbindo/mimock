import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import editUserDetailsAtom from 'atoms/editUserDetailsAtom';
import Header from './Header';
import UserRole from './UserRole';
import { getUserDetails } from 'utils/jwtUtils';
import PasswordUpdateModal from 'editUser/UserDetails/UserPasswordUpdate/PasswordUpdateModal';
import { SettingsContainer } from './Settings.style';
import PlatformSettings from './PlatformSettings';
import UpdatePassword from './UpdatePassword';

function Settings() {
	const [userName, setUserName] = useState('');
	const [userRole, setUserRole] = useState('');
	const [isReadOnlyUser, setIsReadOnlyUser] = useState(false);
	const [userInfo, setUserInfo] = useRecoilState(editUserDetailsAtom);

	useEffect(() => {
		try {
			const userDetails = getUserDetails();
			const { userName, userRole } = userDetails;
			const isReadOnlyUser =
				userDetails && userDetails.userRole === 'ROLE_VIEWER';
			setIsReadOnlyUser(isReadOnlyUser);
			setUserName(userName);
			setUserRole(userRole.split('_')[1]);
		} catch (e) {
			console.log(e);
		}

		return () => {
			setUserInfo({
				...userInfo,
				showPasswordUpdateModal: false,
			});
		};
	}, []);

	return (
		<>
			<Header username={userName} />
			<Choose>
				<When condition={!userInfo.showPasswordUpdateModal}>
					<SettingsContainer>
						<UpdatePassword userName={userName} userRole={userRole} />
						<UserRole role={userRole} />
						<If condition={!isReadOnlyUser}>
							<PlatformSettings />
						</If>
					</SettingsContainer>
				</When>
				<Otherwise>
					<PasswordUpdateModal userName={userName} />
				</Otherwise>
			</Choose>
		</>
	);
}

export default Settings;
