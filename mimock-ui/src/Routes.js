import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router, Navigate } from 'react-router-dom';
import Login from 'components/login';
import useAxiosInterceptor from 'api/useAxiosInterceptor';
import SecuredNavigator from './navigators/SecuredNavigator';

function AppRoutes() {
	useAxiosInterceptor();

	const secureRoute = (component) => {
		return <SecuredNavigator>{component}</SecuredNavigator>;
	};

	return (
		<Router basename='/'>
			<Routes>
				<Route path='' exact element={<Navigate to='/mimock-ui' />} />
				<Route path='/mimock-ui'>
					<Route path='' exact element={<Login />} />
					<Route
						path='/mimock-ui/mocks'
						element={secureRoute(<h1>Mocks</h1>)}
					/>
					<Route
						path='/mimock-ui/users'
						element={secureRoute(<h1>Users</h1>)}
					/>
				</Route>
			</Routes>
		</Router>
	);
}

export default AppRoutes;
