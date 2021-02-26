import { NavLink } from "react-router-dom";

export default function MenuCon({ toggleBurgerMenu }) {
    return (
        <nav className="menu-con open">
            <div className="nav-con">
                <NavLink
                    className="nav-icon"
                    activeClassName="active-b"
                    onClick={toggleBurgerMenu}
                    exact
                    to="/"
                >
                    Home
                </NavLink>

                <NavLink
                    className="nav-icon"
                    activeClassName="active-b"
                    onClick={toggleBurgerMenu}
                    to="/"
                >
                    Profile
                </NavLink>

                <NavLink
                    className="nav-icon"
                    activeClassName="active-b"
                    onClick={toggleBurgerMenu}
                    to="/edit-profile"
                >
                    Edit Profile
                </NavLink>

                <NavLink
                    className="nav-icon"
                    activeClassName="active-b"
                    onClick={toggleBurgerMenu}
                    to="/"
                >
                    Venues
                </NavLink>

                <NavLink
                    className="nav-icon"
                    activeClassName="active-b"
                    onClick={toggleBurgerMenu}
                    to="/"
                >
                    Feed
                </NavLink>

                <a className="nav-icon" href="/logout">
                    Logout
                </a>
            </div>
        </nav>
    );
}
