import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import * as courseApi from "../../api/CoursesApi";

const DeleteCourse = ({
	modalShow,
	deleteId,
	onDeleteSuccess,
	onModalClose,
}) => {
	const handleModalClose = () => onModalClose();
	const handleDelete = async () => {
		try {
			await courseApi.courseDelete(parseInt(deleteId));
			onDeleteSuccess();
		} catch (error) {
			console.error(error);
			handleModalClose();
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
					<Modal.Title>Delete confirm</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you want to delete ?</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={handleDelete}>
						Ok
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
	modalShow: PropTypes.bool.isRequired,
	deleteId: PropTypes.number.isRequired,
	onDeleteSuccess: PropTypes.func.isRequired,
	onModelClose: PropTypes.func.isRequired,
};

export default DeleteCourse;
