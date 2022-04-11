import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isTokenValid } from 'services/authentication/validateToken.service';
import { FullPageLoader } from 'styles/Loaders';
import showFullPageLoader from 'atoms/showFullPageLoader';

function Navigator({ children }) {
	const [, setOpenFullPageLoader] = useRecoilState(showFullPageLoader);
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthTokenValid, setIsAuthTokenValid] = useState(false);

	useEffect(() => {
		setOpenFullPageLoader(true);

		isTokenValid()
			.then((status) => {
				setIsAuthTokenValid(status);
				setOpenFullPageLoader(false);
				setIsLoading(false);
			})
			.catch(() => {
				setIsAuthTokenValid(false);
				setOpenFullPageLoader(false);
				setIsLoading(false);
			});
	}, []);

	return (
		<Choose>
			<When condition={isLoading}>
				<FullPageLoader />
			</When>
			<Otherwise>
				<Choose>
					<When condition={!isLoading && isAuthTokenValid}>{children}</When>
					<Otherwise>
						<Navigate to='/' />
					</Otherwise>
				</Choose>
			</Otherwise>
		</Choose>
	);
}

Navigator.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Navigator;
