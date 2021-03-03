import Playlist from "./playlist";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer>
            <p className="footer-nnote">© 2021 Made with ♡ Liat Meadows</p>
            <div className="music-box">
                <Playlist />
                <Link to="/">
                    <img className="icon" src="/images/sax-w.svg" />
                </Link>
            </div>
        </footer>
    );
}
