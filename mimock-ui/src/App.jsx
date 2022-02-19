import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRoutes from './Routes';

const App = () => <AppRoutes />;

ReactDOM.render(<App />, document.getElementById('app'));
