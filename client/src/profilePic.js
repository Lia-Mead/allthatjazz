export default function ProfilePic({ ...props }) {
    return (
        <img
            src={props.pic || "/images/avatar.jpg"}
            alt={`${props.first} ${props.last}`}
            className={`${props.size} pro-pic`}
            onClick={props.toggleUploader}
        />
    );
}
