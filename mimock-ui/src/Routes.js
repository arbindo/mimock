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
import Users from './components/users';
import EditUser from './components/users/UserManagement/EditUser';
import Logout from './components/common/Logout';
import Detail from './components/detail';
import AddUser from './components/users/UserManagement/AddUser';

function AppRoutes() {
	useAxiosInterceptor();

	const secureRoute = (component) => {
		return (
			<Wrapper>
				<SecuredNavigator> {component} </SecuredNavigator>
			</Wrapper>
		);
	};

	const secureAdminRoutes = (component) => {
		return secureRoute(<AdminNavigator> {component} </AdminNavigator>);
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
					<Route
						path={routes.mocksDetail.path}
						element={secureRoute(<Detail />)}
					/>
					<Route path={routes.logout.path} element={secureRoute(<Logout />)} />
					{/* Admin Routes */}
					<Route path={routes.adminPrefix}>
						<Route
							path={routes.adminRoutes.users.path}
							element={secureAdminRoutes(<Users />)}
						/>
						<Route
							path={routes.adminRoutes.editUsers.path}
							element={secureAdminRoutes(<EditUser />)}
						/>
						<Route
							path={routes.adminRoutes.addUser.path}
							element={secureAdminRoutes(<AddUser />)}
						/>
					</Route>
				</Route>
			</Routes>
		</Router>
	);
}

export default AppRoutes;
