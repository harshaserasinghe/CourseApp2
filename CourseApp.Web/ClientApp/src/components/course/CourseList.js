import React, { useState } from "react";
import { Link } from "react-router-dom";
import CourseSearch from "./CourseSearch";
import DeleteCourse from "./CourseDelete";

const CourseList = () => {
	const [courses, setCourses] = useState([]);
	const [modalShow, setModelShow] = useState(false);
	const [deleteId, setDeleteId] = useState(0);

	const handleGet = (_courses) => {
		setCourses(_courses);
	};

	const handleDelete = (event) => {
		setDeleteId(event.target.value);
		setModelShow(true);
	};

	const handleDeleteSuccess = async () => {
		await setCourses(courses.filter((c) => c.id !== parseInt(deleteId)));
		setDeleteId(0);
		setModelShow(false);
	};

	const handleModalClose = () => {
		setDeleteId(0);
		setModelShow(false);
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
				modalShow={modalShow}
				deleteId={deleteId}
				onDeleteSuccess={handleDeleteSuccess}
				onModalClose={handleModalClose}
			/>
		</>
	);
};

export default CourseList;
