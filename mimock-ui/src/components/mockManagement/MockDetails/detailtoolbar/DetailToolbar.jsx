import React from 'react';
import {
	DetailToolbarContainer,
	MiniBtnSpan,
	BackButton,
	BaseButton,
	OperationsContainer,
	WarningMessage,
} from './DetailToolbar.style';
import { constants } from './constants';
import { FaArrowCircleLeft } from 'react-icons/fa';
import {
	MdArchive,
	MdUnarchive,
	MdDelete,
	MdEdit,
	MdOutlineReportProblem,
} from 'react-icons/md';
import PropTypes from 'prop-types';

function DetailToolbar({
	hideDetailActionsToolbar,
	status,
	performArchiveMockOperation,
	performUnarchiveMockOperation,
	performDeleteMockOperation,
	performEditMockOperation,
}) {
	return (
		<DetailToolbarContainer
			data-testid={constants.testIds.detailToolbarContainer}
		>
			<BackButton
				to={`/mimock-ui/mocks`}
				data-testid={constants.testIds.backBtn}
				id={constants.ids.backBtn}
			>
				<MiniBtnSpan>
					<FaArrowCircleLeft /> {constants.label.backBtn}
				</MiniBtnSpan>
			</BackButton>
			<If condition={!hideDetailActionsToolbar}>
				<OperationsContainer
					data-testid={constants.testIds.operationsContainer}
				>
					<Choose>
						<When condition={status == 'NONE'}>
							<BaseButton
								data-testid={constants.testIds.archiveBtn}
								id={constants.ids.archiveBtn}
								onClick={performArchiveMockOperation}
							>
								<MiniBtnSpan>
									<MdArchive /> {constants.label.archiveBtn}
								</MiniBtnSpan>
							</BaseButton>
							<BaseButton
								data-testid={constants.testIds.deleteBtn}
								id={constants.ids.deleteBtn}
								onClick={performDeleteMockOperation}
							>
								<MiniBtnSpan>
									<MdDelete /> {constants.label.deleteBtn}
								</MiniBtnSpan>
							</BaseButton>
							<BaseButton
								data-testid={constants.testIds.editBtn}
								id={constants.ids.editBtn}
								onClick={performEditMockOperation}
							>
								<MiniBtnSpan>
									<MdEdit /> {constants.label.editBtn}
								</MiniBtnSpan>
							</BaseButton>
						</When>
						<When condition={status == 'ARCHIVED'}>
							<BaseButton
								data-testid={constants.testIds.unarchiveBtn}
								id={constants.ids.unarchiveBtn}
								onClick={performUnarchiveMockOperation}
							>
								<MiniBtnSpan>
									<MdUnarchive /> {constants.label.unarchiveBtn}
								</MiniBtnSpan>
							</BaseButton>
						</When>
						<When condition={status == 'DELETED'}>
							<WarningMessage
								data-testid={constants.testIds.warningMessage}
								id={constants.ids.warningMessage}
							>
								<MdOutlineReportProblem /> {constants.label.warningMessage}
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
