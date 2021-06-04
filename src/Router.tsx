import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';

import Home from './components/pages/home/container';
import FurnitureScreen from './components/pages/fixture/container';

const Main = () => {
	return (
		<Router>
			<Switch>
				<Route exact path='/home' component={Home}></Route>
				<Route exact path='/furniture' component={FurnitureScreen}></Route>
				<Redirect from="/" to="/home" />
			</Switch>
		</Router>
	);
};

export default Main;