import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import * as courseService from "../../services/CourseService";
import { toast } from "react-toastify";

const DeleteCourse = ({ modalShow, id, onSuccess, onModalClose }) => {
	const handleModalClose = () => onModalClose();
	const handleDelete = async () => {
		try {
			await courseService.courseDelete(id);
			onSuccess();
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
				show={modalShow}
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
