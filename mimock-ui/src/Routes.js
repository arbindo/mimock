import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import PlatformApi from './dev/platform-api/PlatformApi.jsx';
import Style from './dev/ui-library/Style.jsx';

function AppRoutes() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<></>} />
				<If condition={process.env.NODE_ENV === 'development'}>
					<Route path='/style' element={<Style />} />
					<Route path='/platform-api' element={<PlatformApi />} />
				</If>
			</Routes>
		</Router>
	);
}

export default AppRoutes;
