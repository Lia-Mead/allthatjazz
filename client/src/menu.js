import { NavLink } from "react-router-dom";

export default function Menu({ toggleBurgerMenu }) {
    return (
        <div className="overlay">
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
                            src="/images/sax-w.svg"
                            className="icon"
                            alt="home-icon"
                        />
                        Home
                    </NavLink>

                    <NavLink
                        className="nav-icon"
                        activeClassName="active-b"
                        onClick={toggleBurgerMenu}
                        to="/account"
                    >
                        <img
                            src="/images/user-w.svg"
                            className="icon"
                            alt="profile-icon"
                        />
                        Account
                    </NavLink>

                    <NavLink
                        className="nav-icon"
                        activeClassName="active-b"
                        onClick={toggleBurgerMenu}
                        to="/my-posts"
                    >
                        <img
                            src="/images/my-pins.svg"
                            className="icon"
                            alt="my-posts-icon"
                        />
                        My Posts
                    </NavLink>

                    <NavLink
                        className="nav-icon"
                        activeClassName="active-b"
                        onClick={toggleBurgerMenu}
                        to="/venues"
                    >
                        <img
                            src="/images/location-w.svg"
                            className="icon"
                            alt="venues-icon"
                        />
                        Venues
                    </NavLink>

                    <NavLink
                        className="nav-icon"
                        activeClassName="active-b"
                        onClick={toggleBurgerMenu}
                        to="/feed"
                    >
                        <img
                            src="/images/feed-w.svg"
                            className="icon"
                            alt="feed-icon"
                        />
                        Feed
                    </NavLink>

                    <a
                        style={{ marginTop: "70px", color: "#b4aeae" }}
                        className="nav-icon"
                        href="/logout"
                    >
                        <img
                            src="/images/logout-w.svg"
                            className="icon"
                            alt="logout-icon"
                        />
                        Logout
                    </a>
                </div>
            </nav>
        </div>
    );
}
