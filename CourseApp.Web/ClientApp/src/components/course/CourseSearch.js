import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as courseApi from "../../api/CoursesApi";

const CourseSearch = ({ onGet }) => {
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		handleGet();
	}, []);

	const handleSearch = (event) => setSearchTerm(event.target.value);

	const handleGet = async () => {
		try {
			const courses = await courseApi.getCourses(searchTerm);
			onGet(courses);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className="col-md-2">
				<input
					type="text"
					name="filter"
					onChange={handleSearch}
					value={searchTerm}
				></input>
			</div>
			<div className="col-md-2">
				<button className="btn btn-primary search-btn" onClick={handleGet}>
					Search
				</button>
			</div>
		</>
	);
};

CourseSearch.propTypes = {
	onGet: PropTypes.func.isRequired,
};

export default CourseSearch;