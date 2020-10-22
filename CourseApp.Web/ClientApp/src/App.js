import React, { useState } from "react";
import { Route, Switch } from "react-router";
import Layout from "./components/common/navmenu/Layout";
import CourseList from "./components/course/CourseList";
import CourseDetails from "./components/course/CourseDetails";
import CourseCreate from "./components/course/CourseCreate";
import CourseUpdate from "./components/course/CourseUpdate";
import Login from "./components/auth/Login";
import NotFound from "./components/common/NotFound";
import PrivateRoute from "./components/common/router/PrivateRoute";
import * as context from "./components/common/context/Context";
import * as authService from "./services/AuthService";
import { ToastContainer } from "react-toastify";
import "./custom.css";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/auth/Register";

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		authService.isAuthenticated()
	);

	return (
		<context.AuthContext.Provider
			value={[isAuthenticated, setIsAuthenticated]}
		>
			<Layout>
				<ToastContainer autoClose={1000} hideProgressBar />
				<Switch>
					<Route exact path="/" component={CourseList} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/course-details/:id" component={CourseDetails} />
					<Route path="/course-update/:id" component={CourseUpdate} />
					<PrivateRoute path="/course-create/" component={CourseCreate} />
					<Route component={NotFound} />
				</Switch>
			</Layout>
		</context.AuthContext.Provider>
	);
};

export default App;
