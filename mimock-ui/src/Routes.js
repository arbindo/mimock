import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router, Navigate } from 'react-router-dom';
import Login from 'components/login';
import useAxiosInterceptor from 'api/useAxiosInterceptor';
import { routes } from './constants/routes';
import SecuredNavigator from './navigators/SecuredNavigator';
import AdminNavigator from './navigators/AdminNavigator';
import Wrapper from './components/common/Wrapper';
import Dashboard from './components/dashboard';

function AppRoutes() {
	useAxiosInterceptor();

	const secureRoute = (component) => {
		return (
			<Wrapper>
				<SecuredNavigator>{component}</SecuredNavigator>
			</Wrapper>
		);
	};

	const secureAdminRoutes = (component) => {
		return secureRoute(<AdminNavigator>{component}</AdminNavigator>);
	};

	return (
		<Router basename='/'>
			<Routes>
				<Route path='' exact element={<Navigate to={routes.root} />} />
				<Route path={routes.root}>
					<Route path='' exact element={<Login />} />
					<Route
						path={routes.mocks.path}
						element={secureRoute(<Dashboard />)}
					/>
					<Route path={routes.adminPrefix}>
						<Route
							path={routes.adminRoutes.users.path}
							element={secureAdminRoutes(<h1>Users</h1>)}
						/>
					</Route>
				</Route>
			</Routes>
		</Router>
	);
}

export default AppRoutes;
