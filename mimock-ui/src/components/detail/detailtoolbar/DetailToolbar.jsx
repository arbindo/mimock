import React from 'react';
import {
	DetailToolbarContainer,
	MiniBtnSpan,
	BackButton,
} from './DetailToolbar.style';
import { constants } from './constants';
import { FaArrowCircleLeft } from 'react-icons/fa';
import PropTypes from 'prop-types';

function DetailToolbar() {
	return (
		<DetailToolbarContainer data-testid='detail-toolbar-section'>
			<BackButton to={`/mimock-ui/mocks`} dataTestid='back-btn'>
				<MiniBtnSpan>
					<FaArrowCircleLeft /> {constants.label.backBtn}
				</MiniBtnSpan>
			</BackButton>
		</DetailToolbarContainer>
	);
}

DetailToolbar.propTypes = {
	handleBackBtnClick: PropTypes.func.isRequired,
};

export default DetailToolbar;
