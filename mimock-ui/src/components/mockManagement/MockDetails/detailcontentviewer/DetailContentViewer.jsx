import React, { useState } from 'react';
import {
	DetailContentViewerContainer,
	NavTabsContainer,
	NavTab,
	NavTabLink,
	NavTabContent,
} from './DetailContentViewer.style';
import PropTypes from 'prop-types';
import GeneralPane from './GeneralPane';
import RequestPane from './RequestPane';
import ResponsePane from './ResponsePane';
import {
	FaInfoCircle,
	FaArrowCircleUp,
	FaArrowCircleDown,
} from 'react-icons/fa';
import { constants } from './constants';

function DetailContentViewer({ mock }) {
	// #region States
	const [showGeneralPane, setShowGeneralPane] = useState(true);
	const [showRequestPane, setShowRequestPane] = useState(false);
	const [showResponsePane, setShowResponsePane] = useState(false);
	// #endregion

	// #region Handler functions
	const handleTabHeaderClick = (e) => {
		const currentTarget = e.target.id;
		switch (currentTarget) {
			case 'general-pane':
				setShowGeneralPane(true);
				setShowRequestPane(false);
				setShowResponsePane(false);
				break;
			case 'request-pane':
				setShowGeneralPane(false);
				setShowRequestPane(true);
				setShowResponsePane(false);
				break;
			case 'response-pane':
				setShowGeneralPane(false);
				setShowRequestPane(false);
				setShowResponsePane(true);
				break;
			default:
				break;
		}
	};
	// #endregion

	return (
		<DetailContentViewerContainer
			data-testid={constants.testIds.detailContentViewerSection}
		>
			<NavTabsContainer>
				<NavTab>
					<NavTabLink
						id={constants.ids.generalPane}
						data-testid={constants.testIds.generalPane}
						className={
							showGeneralPane
								? constants.additionalStyles.active
								: constants.additionalStyles.normal
						}
						onClick={handleTabHeaderClick}
					>
						<FaInfoCircle /> {constants.labels.generalPane}
					</NavTabLink>
				</NavTab>
				<NavTab>
					<NavTabLink
						id={constants.ids.requestPane}
						data-testid={constants.testIds.requestPane}
						className={
							showRequestPane
								? constants.additionalStyles.active
								: constants.additionalStyles.normal
						}
						onClick={handleTabHeaderClick}
					>
						<FaArrowCircleUp /> {constants.labels.requestPane}
					</NavTabLink>
				</NavTab>
				<NavTab>
					<NavTabLink
						id={constants.ids.responsePane}
						data-testid={constants.testIds.responsePane}
						className={
							showResponsePane
								? constants.additionalStyles.active
								: constants.additionalStyles.normal
						}
						onClick={handleTabHeaderClick}
					>
						<FaArrowCircleDown />
						{constants.labels.responsePane}
					</NavTabLink>
				</NavTab>
			</NavTabsContainer>
			<NavTabContent data-testid={constants.testIds.tabContentContainer}>
				<If condition={showGeneralPane}>
					<GeneralPane
						uniqueId={mock.id}
						mockName={mock.mockName}
						description={mock.description}
						entityStatus={mock.entityStatus.status}
						httpMethod={mock.httpMethod.method}
						route={mock.route}
						queryParams={mock.queryParams}
						statusCode={mock.statusCode}
						createdBy={mock.createdBy}
						createdAt={mock.createdAt}
						modifiedBy={mock.modifiedBy}
						updatedAt={mock.updatedAt}
					/>
				</If>
				<If condition={showRequestPane}>
					<RequestPane
						requestHeader={JSON.stringify(mock.requestHeaders.requestHeader)}
						matchExact={mock.requestHeaders.matchExact.toString()}
						requestBody={JSON.stringify(mock.requestBodiesForMock.requestBody)}
						requestBodyType={
							mock.requestBodiesForMock.requestBodyType.requestBodyType
						}
					/>
				</If>
				<If condition={showResponsePane}>
					<ResponsePane
						responseHeader={JSON.stringify(mock.responseHeaders.responseHeader)}
						contentType={mock.responseContentType.contentType}
						responseBody={mock.textualResponse.responseBody}
					/>
				</If>
			</NavTabContent>
		</DetailContentViewerContainer>
	);
}

DetailContentViewer.propTypes = {
	mock: PropTypes.object.isRequired,
};

export default DetailContentViewer;
