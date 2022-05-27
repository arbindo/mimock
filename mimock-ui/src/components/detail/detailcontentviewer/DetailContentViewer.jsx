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

function DetailContentViewer({ mock }) {
	const [showGeneralPane, setShowGeneralPane] = useState(true);
	const [showRequestPane, setShowRequestPane] = useState(false);
	const [showResponsePane, setShowResponsePane] = useState(false);
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
	return (
		<DetailContentViewerContainer data-testid='detail-content-viewer-section'>
			<NavTabsContainer>
				<NavTab>
					<NavTabLink
						id='general-pane'
						className={
							showGeneralPane
								? 'bg-teal-500 text-white'
								: 'bg-white text-gray-400'
						}
						onClick={handleTabHeaderClick}
					>
						<FaInfoCircle /> General
					</NavTabLink>
				</NavTab>
				<NavTab>
					<NavTabLink
						id='request-pane'
						className={
							showRequestPane
								? 'bg-teal-500 text-white'
								: 'bg-white text-gray-400'
						}
						onClick={handleTabHeaderClick}
					>
						<FaArrowCircleUp /> Request
					</NavTabLink>
				</NavTab>
				<NavTab>
					<NavTabLink
						id='response-pane'
						className={
							showResponsePane
								? 'bg-teal-500 text-white'
								: 'bg-white text-gray-400'
						}
						onClick={handleTabHeaderClick}
					>
						<FaArrowCircleDown />
						Response
					</NavTabLink>
				</NavTab>
			</NavTabsContainer>
			<NavTabContent>
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
