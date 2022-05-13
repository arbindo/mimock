import React from 'react';
import { PropTypes } from 'prop-types';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import Pill from './RolePill';
import ActivationStatus from './ActivationStatus/ActivationStatus';
import Actions from './Actions';
import {
	UserRowContainer,
	Text,
	RolePill,
	Timestamp,
	ActivationStatusWrapper,
} from './UserRow.style';

function UserRow({
	name,
	userName,
	userId,
	role,
	activationStatus,
	createdOn,
}) {
	return (
		<UserRowContainer data-testid={`user-record-${userName}`}>
			<Text data-testid='user-name'>{name}</Text>
			<Text data-testid='user-userName'>{userName}</Text>
			<RolePill data-testid='user-role'>
				<Pill role={role} />
			</RolePill>
			<ActivationStatusWrapper>
				<ActivationStatus status={activationStatus} />
			</ActivationStatusWrapper>
			<Timestamp data-testid='user-created-timestamp'>
				{format(parseISO(createdOn), 'dd MMM yyyy')}
			</Timestamp>
			<Actions userName={userName} userId={userId} />
		</UserRowContainer>
	);
}

UserRow.propTypes = {
	name: PropTypes.string.isRequired,
	userName: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired,
	role: PropTypes.string.isRequired,
	activationStatus: PropTypes.bool.isRequired,
	createdOn: PropTypes.string.isRequired,
};

export default UserRow;
