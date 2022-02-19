import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Style from './Style.jsx';

function AppRoutes() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<></>} />
				<If condition={process.env.NODE_ENV === 'development'}>
					<Route path='/style' element={<Style />} />
				</If>
			</Routes>
		</Router>
	);
}

export default AppRoutes;
