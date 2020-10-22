import React, { useState, useContext } from "react";
import {
	Collapse,
	Container,
	Navbar,
	NavbarBrand,
	NavbarToggler,
	NavItem,
	NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import * as authService from "../../../services/AuthService";
import * as context from "../context/Context";
import { toast } from "react-toastify";
import "./NavMenu.css";

const NavMenu = () => {
	const [collapsed, setCollapsed] = useState(true);

	const [isAuthenticated, setIsAuthenticated] = useContext(
		context.AuthContext
	);

	const toggleNavbar = () => {
		setCollapsed(!collapsed);
	};

	const handleLogout = async () => {
		try {
			await authService.logout();
			setIsAuthenticated(authService.isAuthenticated());
			toast.success("Sign out success");
		} catch (_errors) {
			console.error(_errors);
			toast.error("Error occurred");
		}
	};

	return (
		<header>
			<Navbar
				className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
				light
			>
				<Container>
					<NavbarBrand tag={Link} to="/">
						Course App
					</NavbarBrand>
					<NavbarToggler onClick={toggleNavbar} className="mr-2" />
					<Collapse
						className="d-sm-inline-flex flex-sm-row-reverse"
						isOpen={!collapsed}
						navbar
					>
						<ul className="navbar-nav flex-grow">
							<NavItem>
								<NavLink tag={Link} className="text-dark" to="/">
									Courses
								</NavLink>
							</NavItem>

							{!isAuthenticated ? (
								<NavItem>
									<NavLink
										tag={Link}
										className="text-dark"
										to="/login"
									>
										Login
									</NavLink>
								</NavItem>
							) : (
								<>
									<NavItem>
										<NavLink
											tag={Link}
											className="text-dark"
											to="/course-create"
										>
											Add Course
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink
											tag={Link}
											className="text-dark"
											to="/"
											onClick={handleLogout}
										>
											Logout
										</NavLink>
									</NavItem>
								</>
							)}
						</ul>
					</Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default NavMenu;
