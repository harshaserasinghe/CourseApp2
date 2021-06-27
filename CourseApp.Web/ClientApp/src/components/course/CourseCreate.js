import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as courseService from "../../services/CourseService";
import { toast } from "react-toastify";

const CourseCreate = (props) => {
	const [course, setCourse] = useState({
		id: null,
		name: "",
		level: null,
		rating: null,
		category: "",
		author: "",
		publishedDate: null,
	});

	const [errors, setErrors] = useState({});

	const handleChange = ({ target }) => {
		setCourse({ ...course, [target.name]: target.value });
		setErrors({ ...errors, [target.name]: null });
	};

	const handleCreate = async () => {
		try {
			await courseService.createCourse(course);
			props.history.push("/");
			toast.success("Course saved");
		} catch (_errors) {
			console.error(_errors);
			toast.error("Course saved failed");
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!formIsValid()) return;

		handleCreate();
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
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name">Title</label>
					<input
						id="name"
						type="text"
						name="name"
						value={course.name}
						onChange={handleChange}
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
						onChange={handleChange}
						className="form-control"
					>
						<option value="">Select skill level</option>
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
						onChange={handleChange}
						className="form-control"
					>
						<option value="">Select rating</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="3">4</option>
						<option value="3">5</option>
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
						onChange={handleChange}
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
						onChange={handleChange}
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

export default CourseCreate;
