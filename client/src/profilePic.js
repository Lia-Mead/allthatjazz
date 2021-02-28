import { Link } from "react-router-dom";

export default function ProfilePic({ ...props }) {
    return (
        <Link className="zi" to={"/profile"}>
            <img
                src={props.pic || "/images/ven-avatar.jpg"}
                alt={`${props.first} ${props.last}`}
                className={`${props.size} pro-pic`}
            />
        </Link>
    );
}
