import React, { useRef, useCallback } from 'react';
import { constants } from './constants';
import {
	ListContainer,
	ListTitle,
	ListClearFilter,
	ListClearFilterText,
	ListTitleSpan,
	MessageWrapper,
	MessageImageIcon,
	MessageSpan,
	LoaderStyle,
	WarningBanner,
} from './List.style.js';
import MockCard from './MockCard';
import EmptyState from 'assets/empty-state.png';
import ErrorState from 'assets/server-down-state.png';
import PropTypes from 'prop-types';
import { FaFilter } from 'react-icons/fa';
import { MdCancel, MdWarning } from 'react-icons/md';
import BarLoader from 'react-spinners/BarLoader';
import useLazyLoad from 'src/hooks/useLazyLoad';
import { useRecoilState } from 'recoil';
import pageNumberAtom from 'atoms/pageNumberAtom';
import { mockManagementConstants } from 'constants/globalConstants';

function List({ mocksListView, handleClearFilter }) {
	const [pageNumber, setPageNumber] = useRecoilState(pageNumberAtom);

	const { mocksList, listTitle, isFilter, loading, error, hasMore } =
		useLazyLoad(mocksListView, pageNumber);

	const observer = useRef();
	const lastItem = useCallback(
		(node) => {
			// do NOT modify pageNumber when useLazyLoad hook isLoading data
			if (loading) {
				return;
			}

			// disconnect current observer (if current observer is valid)
			if (observer.current) {
				observer.current.disconnect();
			}

			// assign observer to IntersectionObserver if useLazyLoad hook has more data
			// and window scroll is intersecting with the last item in the list
			observer.current = new IntersectionObserver((items) => {
				if (items[0].isIntersecting && hasMore) {
					setPageNumber((prevPageNumber) => prevPageNumber + 1);
				}
			});

			// start observing the current node
			if (node) {
				observer.current.observe(node);
			}
		},
		[loading, hasMore]
	);

	return (
		<ListContainer data-testid='list-section'>
			<BarLoader
				data-testid='list-mocks-loader'
				loading={loading}
				color='teal'
				size={1000}
				css={LoaderStyle}
			/>
			<Choose>
				<When condition={error.status}>
					<MessageWrapper>
						<MessageImageIcon src={ErrorState} />
						<MessageSpan>{error.message}</MessageSpan>
					</MessageWrapper>
				</When>
				<When condition={!error.status && !loading}>
					<ListTitleSpan>
						<If condition={isFilter}>
							<FaFilter />
						</If>
						<ListTitle>{listTitle}</ListTitle>
						<If condition={isFilter}>
							<ListClearFilter>
								<MdCancel />
								<ListClearFilterText onClick={handleClearFilter}>
									{constants.label.clearFilter}
								</ListClearFilterText>
							</ListClearFilter>
						</If>
					</ListTitleSpan>
					<Choose>
						<When condition={mocksList.length > 0}>
							{mocksListView === mockManagementConstants.DELETED_STATUS && (
								<WarningBanner>
									{' '}
									<MdWarning /> Items in bin are deleted forever after 30 days!
								</WarningBanner>
							)}
							{mocksList.map((mock, index) => {
								if (mocksList.length === index + 1) {
									return (
										<MockCard
											innerRef={lastItem}
											key={mock.id}
											id={mock.id}
											mockName={mock.mockName}
											description={mock.description}
											httpMethod={mock.httpMethod}
											route={mock.route}
										/>
									);
								} else {
									return (
										<MockCard
											key={mock.id}
											id={mock.id}
											mockName={mock.mockName}
											description={mock.description}
											httpMethod={mock.httpMethod}
											route={mock.route}
										/>
									);
								}
							})}
						</When>
						<When condition={mocksList.length == 0}>
							<MessageWrapper>
								<MessageImageIcon src={EmptyState} />
								<MessageSpan>{constants.errors.emptyState}</MessageSpan>
							</MessageWrapper>
						</When>
					</Choose>
				</When>
			</Choose>
		</ListContainer>
	);
}

List.propTypes = {
	mocksListView: PropTypes.string.isRequired,
	handleClearFilter: PropTypes.func.isRequired,
};

export default List;
