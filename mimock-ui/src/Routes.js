import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from 'components/login';
import useAxiosInterceptor from 'api/useAxiosInterceptor';

function AppRoutes() {
	useAxiosInterceptor();
	return (
		<Router basename='/mimock-ui/'>
			<Routes>
				<Route path='/' element={<Login />} />
			</Routes>
		</Router>
	);
}

export default AppRoutes;
