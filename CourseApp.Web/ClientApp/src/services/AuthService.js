const axios = require("axios").default;
const baseUrl = "api/auth";

axios.interceptors.request.use(
	(config) => {
		config.headers.authorization = `Bearer ${localStorage.getItem("jwt")}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const isAuthenticated = () => {
	let token = localStorage.getItem("jwt");
	if (token) return true;
	else return false;
};

export const getUser = async () => {
	try {
		const url = baseUrl + "/getuser";
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

export const login = async (cred) => {
	try {
		const url = baseUrl + "/login";
		const response = await axios.post(url, {
			username: cred.username,
			password: cred.password,
		});
		localStorage.setItem("jwt", response.data.token);
	} catch (error) {
		handleError(error);
	}
};

export const register = async (user) => {
	try {
		const url = baseUrl + "/register";
		await axios.post(url, {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			password: user.password,
			confirmPassword: user.confirmPassword,
		});
	} catch (error) {
		handleError(error);
	}
};

export const logout = async () => {
	try {
		const url = baseUrl + "/logout";
		await axios.post(url);
		localStorage.removeItem("jwt");
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
