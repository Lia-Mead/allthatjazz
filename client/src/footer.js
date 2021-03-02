import Playlist from "./playlist";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer>
            <p>© 2021 Made with ♡ Liat Meadows</p>
            <Playlist />
            <Link to="/">
                <img className="icon" src="/images/sax-w.svg" />
            </Link>
        </footer>
    );
}
