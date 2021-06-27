import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import * as context from "../context/Context";

const PrivateRoute = ({ path, component, exact }) => {
	const [isAuthenticated] = useContext(context.AuthContext);
	return isAuthenticated ? (
		<Route exact={exact} path={path} component={component} />
	) : (
		<Redirect to="/login" />
	);
};

export default PrivateRoute;
