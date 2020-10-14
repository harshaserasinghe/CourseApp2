import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as courseApi from "../../api/CoursesApi";
import { Modal, Button } from "react-bootstrap";

const CourseList = () => {
	const [courses, setCourses] = useState([]);
	const [filter, setFilter] = useState("");
	const [modalShow, setModelShow] = useState(false);
	const [deleteId, setDeleteId] = useState(0);

	useEffect(() => {
		onSearchCourse();
	}, []);

	const onFilter = (event) => setFilter(event.target.value);

	const onSearchCourse = async () => {
		try {
			const _courses = await courseApi.getCourses(filter);
			setCourses(_courses);
		} catch (error) {
			console.error(error);
		}
	};

	const onDeleteCourse = async (event) => {
		const id = parseInt(deleteId);
		try {
			await courseApi.courseDelete(id);
			setCourses(courses.filter((c) => c.id !== id));
			setDeleteId(0);
			onModalClose();
		} catch (error) {
			console.error(error);
		}
	};

	const onModalClose = () => setModelShow(false);

	const onModalShow = (event) => {
		setDeleteId(event.target.value);
		setModelShow(true);
	};

	return (
		<>
			<div className="card">
				<div className="card-body">
					<div className="row search-row">
						<div className="col-md-2">
							<input
								type="text"
								name="filter"
								onChange={onFilter}
								value={filter}
							></input>
						</div>
						<div className="col-md-2">
							<button
								className="btn btn-primary search-btn"
								onClick={onModalShow}
							>
								Search
							</button>
						</div>
						{courses.length > 0 && (
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Title</th>
											<th>Skill Level</th>
											<th>Rating</th>
											<th>Path</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{courses.map((c) => {
											return (
												<tr key={c.id}>
													<td>
														<Link to={"/course-details/" + c.id}>
															{c.name}
														</Link>
													</td>
													<td>{c.level}</td>
													<td>{`${c.rating}/5`}</td>
													<td>{c.category}</td>
													<td>
														<Link
															className="btn btn-secondary"
															to={"/course-update/" + c.id}
														>
															Edit
														</Link>
														<button
															className="btn btn-warning delete-btn"
															onClick={onModalShow}
															value={c.id}
														>
															Delete
														</button>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>
			</div>
			<Modal
				show={modalShow}
				onHide={onModalClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Delete confirm</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you want to delete ?</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={onDeleteCourse}>
						Ok
					</Button>
					<Button variant="secondary" onClick={onModalClose}>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default CourseList;
