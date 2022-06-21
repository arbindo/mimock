import React from 'react';
import { FaCog } from 'react-icons/fa';
import IconHeader from 'styles/IconHeader';
import { constants } from './constants';
import { SettingsHeader, SettingsSubText } from './Header.style';
import PropTypes from 'prop-types';

function Header({ username }) {
	// #region Defaults
	const { testIds, title } = constants;
	// #endregion

	return (
		<SettingsHeader data-testid={testIds.settingsHeaderContainer}>
			<IconHeader
				dataTestId={testIds.settingsHeader}
				icon={<FaCog />}
				title={title.settingsHeader}
			/>
			<SettingsSubText data-testid={testIds.settingsSubText}>
				User: {username}
			</SettingsSubText>
		</SettingsHeader>
	);
}

Header.propTypes = {
	username: PropTypes.string.isRequired,
};

export default Header;
