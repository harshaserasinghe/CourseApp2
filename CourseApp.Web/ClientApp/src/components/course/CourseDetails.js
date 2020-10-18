import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as courseApi from "../../api/CoursesApi";
import moment from "moment";
import { toast } from "react-toastify";

const CourseDetails = (props) => {
	const id = props.match.params.id;
	const [course, setCourse] = useState({});

	useEffect(() => {
		onSearchCourse(id);
	}, [id]);

	const onSearchCourse = async (id) => {
		try {
			const _courses = await courseApi.getCourse(id);
			setCourse(_courses);
		} catch (error) {
			console.error(error);
			toast.error("Course get failed");
		}
	};

	return (
		Object.keys(course).length > 0 && (
			<>
				<div className="card">
					<div className="card-header">{course.name}</div>
					<div className="card-body">
						<div className="row">
							<div className="col-md-8">
								<div className="row">
									<div className="col-md-4">Rating</div>
									<div className="col-md-8">{course.rating}</div>
								</div>
								<div className="row">
									<div className="col-md-4">Level</div>
									<div className="col-md-8">{course.level}</div>
								</div>
								<div className="row">
									<div className="col-md-4">Path</div>
									<div className="col-md-8">{course.category}</div>
								</div>
								<div className="row">
									<div className="col-md-4">Author</div>
									<div className="col-md-8">{course.author}</div>
								</div>
								<div className="row">
									<div className="col-md-4">Published Date</div>
									<div className="col-md-8">
										{moment(course.publishedDate).format(
											"MMM DD, YYYY"
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="card-footer">
					<Link className="btn btn-secondary" to={"/"}>
						Back
					</Link>
				</div>
			</>
		)
	);
};

export default CourseDetails;
