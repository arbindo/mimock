import React from 'react';
import { Navigate, Outlet } from 'react-router';
import {
	isTokenValid,
	readToken,
} from 'services/authentication/validateToken.service';

isTokenValid();

const GuardedRoute = () => {
	const isAuthTokenValid = readToken().read();

	return (
		<Choose>
			<When condition={isAuthTokenValid}>
				<Outlet />
			</When>
			<Otherwise>
				<Navigate to='/' replace={true} />
			</Otherwise>
		</Choose>
	);
};

export default GuardedRoute;
