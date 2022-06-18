import React from 'react';
import {
	DetailToolbarContainer,
	MiniBtnSpan,
	BackButton,
	BaseButton,
	OperationsContainer,
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
	status,
	performArchiveMockOperation,
	performUnarchiveMockOperation,
	performDeleteMockOperation,
	performEditMockOperation,
}) {
	return (
		<DetailToolbarContainer data-testid='detail-toolbar-section'>
			<BackButton to={`/mimock-ui/mocks`} dataTestid='back-btn'>
				<MiniBtnSpan>
					<FaArrowCircleLeft /> {constants.label.backBtn}
				</MiniBtnSpan>
			</BackButton>
			<OperationsContainer>
				<Choose>
					<When condition={status == 'NONE'}>
						<BaseButton onClick={performArchiveMockOperation}>
							<MiniBtnSpan>
								<MdArchive /> {constants.label.archiveBtn}
							</MiniBtnSpan>
						</BaseButton>
						<BaseButton onClick={performDeleteMockOperation}>
							<MiniBtnSpan>
								<MdDelete /> {constants.label.deleteBtn}
							</MiniBtnSpan>
						</BaseButton>
						<BaseButton onClick={performEditMockOperation}>
							<MiniBtnSpan>
								<MdEdit /> {constants.label.editBtn}
							</MiniBtnSpan>
						</BaseButton>
					</When>
					<When condition={status == 'ARCHIVED'}>
						<BaseButton onClick={performUnarchiveMockOperation}>
							<MiniBtnSpan>
								<MdUnarchive /> {constants.label.unarchiveBtn}
							</MiniBtnSpan>
						</BaseButton>
					</When>
					<When condition={status == 'DELETED'}>
						<MdOutlineReportProblem /> No actions permitted. This mock resource
						has been already deleted.
					</When>
				</Choose>
			</OperationsContainer>
		</DetailToolbarContainer>
	);
}

DetailToolbar.propTypes = {
	status: PropTypes.string.isRequired,
	performArchiveMockOperation: PropTypes.func.isRequired,
	performUnarchiveMockOperation: PropTypes.func.isRequired,
	performDeleteMockOperation: PropTypes.func.isRequired,
	performEditMockOperation: PropTypes.func.isRequired,
};

export default DetailToolbar;