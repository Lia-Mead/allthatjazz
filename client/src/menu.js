import { NavLink } from "react-router-dom";

export default function Menu({ toggleBurgerMenu }) {
    return (
        <nav className="menu-con slide">
            <div className="nav-con">
                <NavLink
                    style={{ textDecoration: "underline" }}
                    className="nav-icon"
                    activeClassName="active-b"
                    onClick={toggleBurgerMenu}
                    exact
                    to="/"
                >
                    <img
                        src="images/home-w.svg"
                        className="icon"
                        alt="home-icon"
                    />
                    Home
                </NavLink>

                <NavLink
                    className="nav-icon"
                    activeClassName="active-b"
                    onClick={toggleBurgerMenu}
                    to="/profile"
                >
                    <img
                        src="images/user-w.svg"
                        className="icon"
                        alt="profile-icon"
                    />
                    Profile
                </NavLink>

                <NavLink
                    className="nav-icon"
                    activeClassName="active-b"
                    onClick={toggleBurgerMenu}
                    to="/venues"
                >
                    <img
                        src="images/location-w.svg"
                        className="icon"
                        alt="venues-icon"
                    />
                    Venues
                </NavLink>

                <NavLink
                    className="nav-icon"
                    activeClassName="active-b"
                    onClick={toggleBurgerMenu}
                    to="/"
                >
                    <img
                        src="images/feed-w.svg"
                        className="icon"
                        alt="feed-icon"
                    />
                    Feed
                </NavLink>

                <a className="nav-icon" href="/logout">
                    <img
                        src="images/logout-w.svg"
                        className="icon"
                        alt="logout-icon"
                    />
                    Logout
                </a>
            </div>
        </nav>
    );
}
