import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from 'components/login';
import useAxiosInterceptor from 'api/useAxiosInterceptor';
import Style from './dev/ui-library/Style.jsx';
import PlatformApi from './dev/platform-api/PlatformApi.jsx';

function AppRoutes() {
	useAxiosInterceptor();
	return (
		<Router basename='/mimock-ui/'>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/style' element={<Style />} />
				<Route path='/platform-api' element={<PlatformApi />} />
			</Routes>
		</Router>
	);
}

export default AppRoutes;
