import React from "react";
import { Route, Switch } from "react-router";
import Layout from "./components/common/navmenu/Layout";
import CourseList from "./components/course/CourseList";
import CourseDetails from "./components/course/CourseDetails";
import CourseCreate from "./components/course/CourseCreate";
import CourseUpdate from "./components/course/CourseUpdate";
import NotFound from "./components/common/NotFound";
import { ToastContainer } from "react-toastify";
import "./custom.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	return (
		<Layout>
			<ToastContainer autoClose={3000} hideProgressBar />
			<Switch>
				<Route exact path="/" component={CourseList} />
				<Route path="/course-details/:id" component={CourseDetails} />
				<Route path="/course-update/:id" component={CourseUpdate} />
				<Route path="/course-create/" component={CourseCreate} />
				<Route component={NotFound} />
			</Switch>
		</Layout>
	);
};

export default App;
