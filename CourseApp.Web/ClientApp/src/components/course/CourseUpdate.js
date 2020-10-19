import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import * as courseApi from "../../api/CoursesApi";
import { toast } from "react-toastify";

const CourseUpdate = ({ modalShow, id, onSuccess, onModalClose }) => {
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

	useEffect(() => {
		if (id) handleSearch(id);
	}, [id]);

	const handleModalClose = () => onModalClose();

	const handleChange = ({ target }) => {
		setCourse({ ...course, [target.name]: target.value });
		setErrors({ ...errors, [target.name]: null });
	};

	const handleSearch = async (id) => {
		try {
			const _courses = await courseApi.getCourse(id);
			setCourse(_courses);
		} catch (error) {
			console.error(error);
			toast.error("Course get failed");
		}
	};

	const handleUpdate = async (id) => {
		try {
			await courseApi.courseUpdate(id, course);
			onSuccess(course);
			toast.success("Course updated");
		} catch (_errors) {
			handleModalClose();
			console.error(_errors);
			toast.error("Course update failed");
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!formIsValid()) return;

		handleUpdate(id);
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
		<>
			<Modal
				show={modalShow}
				onHide={handleModalClose}
				backdrop="static"
				keyboard={false}
				dialogClassName="col-md-12"
			>
				<Modal.Header closeButton>
					<Modal.Title>Update Course</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="col-md-12">
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
									<div className="alert alert-danger">
										{errors.name}
									</div>
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
									<option value="1">Basic</option>
									<option value="2">Intermediate</option>
									<option value="3">Advance</option>
								</select>
								{errors.level && (
									<div className="alert alert-danger">
										{errors.level}
									</div>
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
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
								</select>
								{errors.rating && (
									<div className="alert alert-danger">
										{errors.rating}
									</div>
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
									<div className="alert alert-danger">
										{errors.category}
									</div>
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
									<div className="alert alert-danger">
										{errors.author}
									</div>
								)}
							</div>
							<div className="row justify-content-center align-items-center">
								<button type="submit" className="btn btn-primary">
									Submit
								</button>
								<button
									type="button"
									className="btn btn-secondary btn-cancel"
									onClick={handleModalClose}
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

CourseUpdate.prototype = {
	updateModalShow: PropTypes.bool.isRequired,
	updateId: PropTypes.number.isRequired,
	onUpdateSuccess: PropTypes.func.isRequired,
	onUpdateModalClose: PropTypes.func.isRequired,
};

export default CourseUpdate;
