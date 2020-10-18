import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import * as courseApi from "../../api/CoursesApi";
import { toast } from "react-toastify";

const DeleteCourse = ({
	deleteModalShow,
	deleteId,
	onDeleteSuccess,
	onDeleteModalClose,
}) => {
	const handleModalClose = () => onDeleteModalClose();
	const handleDelete = async () => {
		try {
			await courseApi.courseDelete(deleteId);
			onDeleteSuccess();
			toast.success("Course deleted");
		} catch (error) {
			handleModalClose();
			console.error(error);
			toast.error("Course delete failed");
		}
	};

	return (
		<>
			<Modal
				show={deleteModalShow}
				onHide={handleModalClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Delete Course</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you want to delete?</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={handleDelete}>
						ok
					</Button>
					<Button variant="secondary" onClick={handleModalClose}>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

DeleteCourse.prototype = {
	deleteModalShow: PropTypes.bool.isRequired,
	deleteId: PropTypes.number.isRequired,
	onDeleteSuccess: PropTypes.func.isRequired,
	onDeleteModalClose: PropTypes.func.isRequired,
};

export default DeleteCourse;
