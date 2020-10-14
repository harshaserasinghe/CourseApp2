import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as courseApi from "../../api/CoursesApi";

const CourseUpdate = (props) => {
	const id = props.match.params.id;
	const [course, setCourse] = useState({
		id: null,
		name: "",
		level: null,
		rating: null,
		category: "",
		author: "",
		publishedDate: null,
		errors: "",
	});
	const [errors, setErrors] = useState({});

	useEffect(() => {
		onSearchCourse(id);
	}, [id]);

	const onChange = ({ target }) => {
		setCourse({ ...course, [target.name]: target.value });
	};

	const onSearchCourse = async (id) => {
		try {
			const _courses = await courseApi.getCourse(id);
			setCourse(_courses);
		} catch (error) {
			console.error(error);
		}
	};

	const onUpdateCourse = async (id) => {
		try {
			await courseApi.courseUpdate(id, course);
			props.history.push("/");
		} catch (_errors) {
			console.error(_errors);
			setCourse({ _errors });
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();

		if (!formIsValid()) return;

		onUpdateCourse(id);
	};

	const formIsValid = () => {
		const _errors = {};

		if (!course.name) _errors.name = "Title is required";

		if (!course.level) _errors.level = "Skill level is required";

		if (!course.rating) _errors.rating = "Rating is required";

		if (!course.category) _errors.category = "Path is required";

		if (!course.author) _errors.author = "Author is required";

		setErrors(_errors);
		return Object.keys(_errors).length === 0;
	};

	return (
		<div className="col-md-4">
			<form onSubmit={onSubmit}>
				{course.errors && (
					<div className="alert alert-danger">{course.errors}</div>
				)}
				<div className="form-group">
					<label htmlFor="name">Title</label>
					<input
						id="name"
						type="text"
						name="name"
						value={course.name}
						onChange={onChange}
						error={errors.name}
						placeholder="Title"
						className="form-control"
					/>
					{errors.name && (
						<div className="alert alert-danger">{errors.name}</div>
					)}
				</div>
				<div className="form-group">
					<label htmlFor="level">Level</label>
					<select
						id="level"
						name="level"
						value={course.level || ""}
						onChange={onChange}
						className="form-control"
					>
						<option value="1">Basic</option>
						<option value="2">Intermediate</option>
						<option value="3">Advance</option>
					</select>
					{errors.level && (
						<div className="alert alert-danger">{errors.level}</div>
					)}
				</div>
				<div className="form-group">
					<label htmlFor="rating">Rating</label>
					<select
						id="rating"
						name="rating"
						value={course.rating || ""}
						onChange={onChange}
						className="form-control"
					>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="4">3</option>
						<option value="5">4</option>
						<option value="5">5</option>
					</select>
					{errors.rating && (
						<div className="alert alert-danger">{errors.rating}</div>
					)}
				</div>
				<div className="form-group">
					<label htmlFor="category">Path</label>
					<input
						id="category"
						type="text"
						name="category"
						value={course.category}
						onChange={onChange}
						error={errors.name}
						placeholder="Category"
						className="form-control"
					/>
					{errors.category && (
						<div className="alert alert-danger">{errors.category}</div>
					)}
				</div>
				<div className="form-group">
					<label htmlFor="author">Author</label>
					<input
						id="author"
						type="text"
						name="author"
						value={course.author}
						onChange={onChange}
						error={errors.author}
						placeholder="Author"
						className="form-control"
					/>
					{errors.author && (
						<div className="alert alert-danger">{errors.author}</div>
					)}
				</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
				<Link to="/" className="btn btn-secondary btn-cancel">
					Cancel
				</Link>
			</form>
		</div>
	);
};

export default CourseUpdate;
