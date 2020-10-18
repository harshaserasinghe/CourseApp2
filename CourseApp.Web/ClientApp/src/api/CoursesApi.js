const axios = require("axios").default;
const baseUrl = "api/courses";

export const getCourses = async (filter = "") => {
	try {
		const url = `${baseUrl}/?filter=${filter}`;
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const getCourse = async (id) => {
	try {
		const url = baseUrl + "/" + id;
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const createCourse = async (course) => {
	try {
		const url = baseUrl;
		const response = await axios.post(url, {
			name: course.name,
			level: parseInt(course.level),
			rating: parseInt(course.rating),
			category: course.category,
			author: course.author,
		});
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const courseUpdate = async (id, course) => {
	try {
		const url = baseUrl + "/" + id;
		await axios.put(url, {
			id: parseInt(course.id),
			name: course.name,
			level: parseInt(course.level),
			rating: parseInt(course.rating),
			category: course.category,
			author: course.author,
		});
	} catch (error) {
		handleError(error);
	}
};

export const courseDelete = async (id) => {
	try {
		const url = baseUrl + "/" + id;
		await axios.delete(url);
	} catch (error) {
		handleError(error);
	}
};

export const handleError = (error) => {
	const _error = {
		status: error.response.data.status,
		message: error.response.data.title,
		errors: error.response.data.errors,
	};
	throw _error;
};
