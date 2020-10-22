import React, { useState, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import CourseSearch from "./CourseSearch";
import DeleteCourse from "./CourseDelete";
import UpdateCourse from "./CourseUpdate";
import * as context from "../common/context/Context";

const CourseList = () => {
	const [courses, setCourses] = useState([]);
	const [updateModalShow, setUpdateModelShow] = useState(false);
	const [deleteModalShow, setDeleteModelShow] = useState(false);
	const [updateId, setUpdateId] = useState(null);
	const [deleteId, setDeleteId] = useState(null);
	const [sortConfig, setSortConfig] = useState({
		key: "name",
		direction: "ascending",
	});
	const [isAuthenticated, setIsAuthenticated] = useContext(
		context.AuthContext
	);

	const sortCourses = () => {
		let sortedCourses = [...courses];
		sortedCourses.sort((a, b) => {
			if (a[sortConfig.key] < b[sortConfig.key]) {
				return sortConfig.direction === "ascending" ? -1 : 1;
			} else if (a[sortConfig.key] > b[sortConfig.key]) {
				return sortConfig.direction === "ascending" ? 1 : -1;
			} else {
				return 0;
			}
		});
		setCourses(sortedCourses);
	};

	const handleSort = (key) => {
		let direction = "ascending";
		if (sortConfig.key === key && sortConfig.direction === "ascending") {
			direction = "descending";
		}
		setSortConfig({ key, direction });
	};

	useMemo(() => {
		if (!updateId && !deleteId) sortCourses();
	}, [updateId, deleteId, sortConfig]);

	const getClassNamesFor = (name) =>
		sortConfig.key === name ? sortConfig.direction : undefined;

	const handleGet = (_courses) => {
		setCourses(_courses);
	};

	const handleModalUpdateShow = (id) => {
		setUpdateId(id);
		setUpdateModelShow(true);
	};

	const handleUpdateSuccess = (_course) => {
		setCourses(
			courses.map((c) => (c.id !== parseInt(updateId) ? c : _course))
		);
		handleUpdateModalClose();
	};

	const handleUpdateModalClose = () => {
		setUpdateId(null);
		setUpdateModelShow(false);
	};

	const handleDeleteModalShow = (id) => {
		setDeleteId(id);
		setDeleteModelShow(true);
	};

	const handleDeleteSuccess = () => {
		setCourses(courses.filter((c) => c.id !== parseInt(deleteId)));
		handleDeleteModalClose();
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
											<th
												onClick={() => handleSort("name")}
												className={getClassNamesFor("name")}
											>
												Title
											</th>
											<th
												onClick={() => handleSort("level")}
												className={getClassNamesFor("level")}
											>
												Skill Level
											</th>
											<th
												onClick={() => handleSort("rating")}
												className={getClassNamesFor("rating")}
											>
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
													{isAuthenticated && (
														<td>
															<button
																className="btn btn-secondary"
																onClick={() =>
																	handleModalUpdateShow(c.id)
																}
															>
																Update
															</button>
															<button
																className="btn btn-warning delete-btn"
																onClick={() =>
																	handleDeleteModalShow(c.id)
																}
															>
																Delete
															</button>
														</td>
													)}
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
				modalShow={deleteModalShow}
				id={deleteId}
				onSuccess={handleDeleteSuccess}
				onModalClose={handleDeleteModalClose}
			/>
			<UpdateCourse
				modalShow={updateModalShow}
				id={updateId}
				onSuccess={handleUpdateSuccess}
				onModalClose={handleUpdateModalClose}
			/>
		</>
	);
};

export default CourseList;
