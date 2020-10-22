import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as authService from "../../services/AuthService";
import { toast } from "react-toastify";

const Register = (props) => {
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [errors, setErrors] = useState({});

	const handleChange = ({ target }) => {
		setUser({ ...user, [target.name]: target.value });
		setErrors({ ...errors, [target.name]: null });
	};

	const handleRegister = async () => {
		try {
			await authService.register(user);
			props.history.push("/login");
			toast.success("Sign up success");
		} catch (_errors) {
			console.error(_errors);
			toast.error("Error occurred");
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!formIsValid()) return;

		handleRegister();
	};

	const formIsValid = () => {
		const _errors = {};

		if (!user.firstName) _errors.firstName = "FirstName is required";

		if (!user.lastName) _errors.lastName = "LastName is required";

		if (!user.email) _errors.email = "Email is required";

		if (!user.password) _errors.password = "Password is required";

		if (!user.confirmPassword)
			_errors.confirmPassword = "ConfirmPassword is required";

		if (
			user.password &&
			user.confirmPassword &&
			user.confirmPassword !== user.password
		)
			_errors.confirmPassword = "Password and confirmPassword are not equal";

		setErrors(_errors);
		return Object.keys(_errors).length === 0;
	};

	return (
		<div className="container-fluid">
			<div className="row justify-content-center align-items-center">
				<div className="col-md-4">
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="firstName">First Name</label>
							<input
								id="firstName"
								type="text"
								name="firstName"
								value={user.firstName}
								onChange={handleChange}
								error={errors.firstName}
								placeholder="FirstName"
								className="form-control"
							/>
							{errors.firstName && (
								<div className="alert alert-danger">
									{errors.firstName}
								</div>
							)}
						</div>
						<div className="form-group">
							<label htmlFor="lastName">Last Name</label>
							<input
								id="lastName"
								type="text"
								name="lastName"
								value={user.lastName}
								onChange={handleChange}
								error={errors.lastName}
								placeholder="LastName"
								className="form-control"
							/>
							{errors.lastName && (
								<div className="alert alert-danger">
									{errors.lastName}
								</div>
							)}
						</div>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input
								id="email"
								type="text"
								name="email"
								value={user.email}
								onChange={handleChange}
								error={errors.email}
								placeholder="Email"
								className="form-control"
							/>
							{errors.email && (
								<div className="alert alert-danger">{errors.email}</div>
							)}
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input
								id="password"
								type="password"
								name="password"
								value={user.password}
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
						<div className="form-group">
							<label htmlFor="confirmPassword">Confirm Password</label>
							<input
								id="confirmPassword"
								type="password"
								name="confirmPassword"
								value={user.confirmPassword}
								onChange={handleChange}
								error={errors.confirmPassword}
								placeholder="Password"
								className="form-control"
							/>
							{errors.confirmPassword && (
								<div className="alert alert-danger">
									{errors.confirmPassword}
								</div>
							)}
						</div>
						<button type="submit" className="btn btn-primary">
							Sign up
						</button>
						<Link to="/" className="btn btn-secondary btn-cancel">
							Cancel
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
