import React from 'react';
import PropTypes from 'prop-types';
import {
	DetailToolbarContainer,
	MiniBtnSpan,
	BackButton,
	BaseButton,
	OperationsContainer,
	WarningMessage,
	ArchiveIcon,
	UnArchiveIcon,
	DeleteIcon,
	EditIcon,
	BackIcon,
	ReportProblemIcon,
} from './DetailToolbar.style';
import { constants } from './constants';

function DetailToolbar({
	hideDetailActionsToolbar,
	status,
	performArchiveMockOperation,
	performUnarchiveMockOperation,
	performDeleteMockOperation,
	performEditMockOperation,
}) {
	// #region Defaults
	const { testIds, ids, label } = constants;
	// #endregion

	return (
		<DetailToolbarContainer data-testid={testIds.detailToolbarContainer}>
			<BackButton
				to={`/mimock-ui/mocks`}
				data-testid={testIds.backBtn}
				id={ids.backBtn}
			>
				<MiniBtnSpan>
					<BackIcon /> {label.backBtn}
				</MiniBtnSpan>
			</BackButton>
			<If condition={!hideDetailActionsToolbar}>
				<OperationsContainer data-testid={testIds.operationsContainer}>
					<Choose>
						<When condition={status == 'NONE'}>
							<BaseButton
								data-testid={testIds.archiveBtn}
								id={ids.archiveBtn}
								onClick={performArchiveMockOperation}
							>
								<MiniBtnSpan>
									<ArchiveIcon /> {label.archiveBtn}
								</MiniBtnSpan>
							</BaseButton>
							<BaseButton
								data-testid={testIds.deleteBtn}
								id={ids.deleteBtn}
								onClick={performDeleteMockOperation}
							>
								<MiniBtnSpan>
									<DeleteIcon /> {label.deleteBtn}
								</MiniBtnSpan>
							</BaseButton>
							<BaseButton
								data-testid={testIds.editBtn}
								id={ids.editBtn}
								onClick={performEditMockOperation}
							>
								<MiniBtnSpan>
									<EditIcon /> {label.editBtn}
								</MiniBtnSpan>
							</BaseButton>
						</When>
						<When condition={status == 'ARCHIVED'}>
							<BaseButton
								data-testid={testIds.unarchiveBtn}
								id={ids.unarchiveBtn}
								onClick={performUnarchiveMockOperation}
							>
								<MiniBtnSpan>
									<UnArchiveIcon /> {label.unarchiveBtn}
								</MiniBtnSpan>
							</BaseButton>
						</When>
						<When condition={status == 'DELETED'}>
							<WarningMessage
								data-testid={testIds.warningMessage}
								id={ids.warningMessage}
							>
								<ReportProblemIcon /> {label.warningMessage}
							</WarningMessage>
						</When>
					</Choose>
				</OperationsContainer>
			</If>
		</DetailToolbarContainer>
	);
}

DetailToolbar.propTypes = {
	hideDetailActionsToolbar: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	performArchiveMockOperation: PropTypes.func.isRequired,
	performUnarchiveMockOperation: PropTypes.func.isRequired,
	performDeleteMockOperation: PropTypes.func.isRequired,
	performEditMockOperation: PropTypes.func.isRequired,
};

export default DetailToolbar;
