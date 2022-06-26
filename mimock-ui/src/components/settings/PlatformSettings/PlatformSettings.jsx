import React, { useEffect, useState, useRef } from 'react';
import {
	SettingsContainer,
	PlatformSettingsHeader,
	SwitchComponentWrapper,
	SwitchComponentLabel,
	SwitchComponentStatusActions,
	StatusLabel,
	PlatformSettingsOptions,
} from './PlatformSettings.style';
import { updatePlatformSettings } from 'services/mockManagement/updatePlatformSettings.service';
import { Cookies } from 'react-cookie';
import ActivationSwitch from '@material-ui/core/Switch';
import { useIosSwitchStyles } from '@mui-treasury/styles/switch/ios';
import useNotification from 'hooks/useNotification';
import { notificationTypes } from 'constants/notificationConstants';
import { constants } from './constants';
import { globalConstants } from 'constants/globalConstants';

function PlatformSettings() {
	const cookies = new Cookies();
	const iosStyles = useIosSwitchStyles();
	const authCookieRef = useRef('');
	const csrfCookieRef = useRef('');
	const [isExportImportMocksEnabled, setIsExportImportMocksEnabled] =
		useState(false);
	const [isBinCronJobEnabled, setIsBinCronJobEnabled] = useState(false);

	useEffect(() => {
		authCookieRef.current = cookies.get(globalConstants.AUTH_TOKEN_COOKIE_NAME);
		csrfCookieRef.current = cookies.get(globalConstants.XSRF_COOKIE_NAME);
		const platformSettings = cookies.get(
			globalConstants.PLATFORM_SETTINGS_COOKIE_NAME
		);
		if (platformSettings !== undefined) {
			const { isExportImportEnabled, isFlushBinCronEnabled } = platformSettings;
			setIsExportImportMocksEnabled(isExportImportEnabled);
			setIsBinCronJobEnabled(isFlushBinCronEnabled);
		}
	}, []);

	const updateExportImportSettingHandler = (e) => {
		// call update api
		updatePlatformSettings(e.target.checked, isBinCronJobEnabled)
			.then((res) => {
				const { isExportImportEnabled } = res;
				setIsExportImportMocksEnabled(isExportImportEnabled);
				useNotification({
					type: isExportImportEnabled
						? notificationTypes.NOTIFICATION_TYPE_SUCCESS
						: notificationTypes.NOTIFICATION_TYPE_WARNING,
					title: isExportImportEnabled ? 'Enabled' : 'Disabled',
					message: `Bulk operations has been ${
						isExportImportEnabled ? 'enabled' : 'disabled'
					}`,
					animationIn: 'animate__bounceIn',
					animationOut: 'animate__bounceOut',
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const updateFlushBinCronSettingHandler = (e) => {
		// call update api
		updatePlatformSettings(isExportImportMocksEnabled, e.target.checked)
			.then((res) => {
				const { isFlushBinCronEnabled } = res;
				setIsBinCronJobEnabled(isFlushBinCronEnabled);
				useNotification({
					type: isFlushBinCronEnabled
						? notificationTypes.NOTIFICATION_TYPE_SUCCESS
						: notificationTypes.NOTIFICATION_TYPE_WARNING,
					title: isFlushBinCronEnabled ? 'Enabled' : 'Disabled',
					message: `Autoflush recycle bin has been ${
						isFlushBinCronEnabled ? 'enabled' : 'disabled'
					}`,
					animationIn: 'animate__bounceIn',
					animationOut: 'animate__bounceOut',
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const { root, switchBase, checked, thumb, track } = iosStyles;

	const { testIds, label } = constants;

	return (
		<SettingsContainer data-testid={testIds.settingsContainer}>
			<PlatformSettingsHeader data-testid={testIds.settingsHeader}>
				{label.settingsHeader}
			</PlatformSettingsHeader>
			<PlatformSettingsOptions>
				<SwitchComponentWrapper>
					<SwitchComponentLabel>
						{label.switchComponentBulk}
					</SwitchComponentLabel>
					<SwitchComponentStatusActions>
						<ActivationSwitch
							data-testid={testIds.switchComponentBulk}
							classes={{ root, switchBase, checked, thumb, track }}
							checked={isExportImportMocksEnabled}
							value={isExportImportMocksEnabled}
							onChange={(e) => {
								updateExportImportSettingHandler(e);
							}}
						/>
						<StatusLabel $isActive={isExportImportMocksEnabled}>
							{isExportImportMocksEnabled ? 'Active' : 'Inactive'}
						</StatusLabel>
					</SwitchComponentStatusActions>
				</SwitchComponentWrapper>
				<SwitchComponentWrapper>
					<SwitchComponentLabel>
						{label.switchComponentAutoflush}
					</SwitchComponentLabel>
					<SwitchComponentStatusActions>
						<ActivationSwitch
							data-testid={testIds.switchComponentBulk}
							classes={{ root, switchBase, checked, thumb, track }}
							checked={isBinCronJobEnabled}
							value={isBinCronJobEnabled}
							onChange={(e) => {
								updateFlushBinCronSettingHandler(e);
							}}
						/>
						<StatusLabel $isActive={isBinCronJobEnabled}>
							{isBinCronJobEnabled ? 'Active' : 'Inactive'}
						</StatusLabel>
					</SwitchComponentStatusActions>
				</SwitchComponentWrapper>
			</PlatformSettingsOptions>
		</SettingsContainer>
	);
}

export default PlatformSettings;
