import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import PlatformApi from './dev/platform-api/PlatformApi.jsx';
import Style from './dev/ui-library/Style.jsx';

function AppRoutes() {
	console.log(process.env.NODE_ENV);

	return (
		<Router basename='/mimock-ui/'>
			<Routes>
				<Route path='/' element={<></>} />
				<Route path='/style' element={<Style />} />
				<Route path='/platform-api' element={<PlatformApi />} />
			</Routes>
		</Router>
	);
}

export default AppRoutes;
