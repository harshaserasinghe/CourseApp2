import React, { useState } from "react";
import { Link } from "react-router-dom";
import CourseSearch from "./CourseSearch";
import DeleteCourse from "./CourseDelete";
import UpdateCourse from "./CourseUpdate";

const CourseList = () => {
	const [courses, setCourses] = useState([]);
	const [updateModalShow, setUpdateModelShow] = useState(false);
	const [deleteModalShow, setDeleteModelShow] = useState(false);
	const [updateId, setUpdateId] = useState(null);
	const [deleteId, setDeleteId] = useState(null);

	const handleGet = (_courses) => {
		setCourses(_courses);
	};

	const handleUpdate = (event) => {
		setUpdateId(event.target.value);
		setUpdateModelShow(true);
	};

	const handleUpdateSuccess = (_course) => {
		setCourses(
			courses.map((c) => {
				if (c.id !== parseInt(_course.id)) return c;
				else return _course;
			})
		);
		setUpdateId(null);
		setUpdateModelShow(false);
	};

	const handleUpdateModalClose = () => {
		setUpdateId(null);
		setUpdateModelShow(false);
	};

	const handleDelete = (event) => {
		setDeleteId(event.target.value);
		setDeleteModelShow(true);
	};

	const handleDeleteSuccess = () => {
		setCourses(courses.filter((c) => c.id !== parseInt(deleteId)));
		setDeleteId(null);
		setDeleteModelShow(false);
	};

	const handleDeleteModalClose = () => {
		setDeleteId(null);
		setDeleteModelShow(false);
	};

	return (
		<>
			<div className="card">
				<div className="card-body">
					<div className="row search-row">
						<CourseSearch onGet={handleGet} />
						{courses.length > 0 && (
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Title</th>
											<th>Skill Level</th>
											<th>
												Rating
											</th>
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
														<button
															className="btn btn-secondary"
															onClick={handleUpdate}
															value={c.id}
														>
															Update
														</button>
														<button
															className="btn btn-warning delete-btn"
															onClick={handleDelete}
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
			<DeleteCourse
				deleteModalShow={deleteModalShow}
				deleteId={deleteId}
				onDeleteSuccess={handleDeleteSuccess}
				onDeleteModalClose={handleDeleteModalClose}
			/>
			<UpdateCourse
				updateModalShow={updateModalShow}
				updateId={updateId}
				onUpdateSuccess={handleUpdateSuccess}
				onUpdateModalClose={handleUpdateModalClose}
			/>
		</>
	);
};

export default CourseList;
