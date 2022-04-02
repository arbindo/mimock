import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router, Navigate } from 'react-router-dom';
import Login from 'components/login';
import useAxiosInterceptor from 'api/useAxiosInterceptor';

function AppRoutes() {
	useAxiosInterceptor();
	return (
		<Router basename='/'>
			<Routes>
				<Route path='' exact element={<Navigate to='/mimock-ui' />} />
				<Route path='/mimock-ui' exact element={<Login />} />
			</Routes>
		</Router>
	);
}

export default AppRoutes;
