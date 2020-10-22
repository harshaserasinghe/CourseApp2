import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import * as authService from "../../services/AuthService";
import * as context from "../common/context/Context";
import { toast } from "react-toastify";

const Login = (props) => {
	const [cred, setCred] = useState({
		username: "",
		password: "",
	});

	const [errors, setErrors] = useState({});

	const [isAuthenticated, setIsAuthenticated] = useContext(
		context.AuthContext
	);

	const handleChange = ({ target }) => {
		setCred({ ...cred, [target.name]: target.value });
		setErrors({ ...errors, [target.name]: null });
	};

	const handleLogin = async () => {
		try {
			await authService.login(cred);
			setIsAuthenticated(authService.isAuthenticated());
			props.history.push("/");
			toast.success("Sign in success");
		} catch (_errors) {
			console.error(_errors);
			toast.error("Error occurred");
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!formIsValid()) return;

		handleLogin();
	};

	const formIsValid = () => {
		const _errors = {};

		if (!cred.username) _errors.username = "Username is required";

		if (!cred.password) _errors.password = "Password is required";

		setErrors(_errors);
		return Object.keys(_errors).length === 0;
	};

	return (
		<div className="container-fluid">
			<div className="row justify-content-center align-items-center">
				<div className="col-md-4">
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="username">Username</label>
							<input
								id="username"
								type="text"
								name="username"
								value={cred.username}
								onChange={handleChange}
								error={errors.username}
								placeholder="Username"
								className="form-control"
							/>
							{errors.username && (
								<div className="alert alert-danger">
									{errors.username}
								</div>
							)}
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input
								id="password"
								type="password"
								name="password"
								value={cred.password}
								onChange={handleChange}
								error={errors.password}
								placeholder="Password"
								className="form-control"
							/>
							{errors.password && (
								<div className="alert alert-danger">
									{errors.password}
								</div>
							)}
						</div>
						<button type="submit" className="btn btn-primary">
							Sign in
						</button>
						<Link to="/" className="btn btn-secondary btn-cancel">
							Cancel
						</Link>
						<Link to="/register" className="btn btn-primary btn-signup">
							Sign up
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
