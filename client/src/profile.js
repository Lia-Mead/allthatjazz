import { useState } from "react";
// import axios from "./Axios";
import EditProfile from "./editProfile";
import ProPicUploader from "./proPicUploader";

export default function Profile(props) {
    // console.log("props in profile", props);

    const [edit, setEdit] = useState(false);
    const [error, setError] = useState(false);
    const [editPic, setEditPic] = useState(false);

    const toggleEdit = () => {
        setEdit(!edit);
    };

    const toggleEditPic = () => {
        setEditPic(!editPic);
    };

    return (
        <>
            <div className="profile-con border-green">
                <h1>
                    <span className="orange">Welcome</span>
                    <span>
                        {" "}
                        {props.first} {props.last}
                    </span>
                </h1>
                <p className="handwrite">and all that jazz</p>
                <img
                    className="pro-pic"
                    src={props.pic || "/images/avatar.jpg"}
                />
            </div>

            <EditProfile
                first={props.first}
                last={props.last}
                email={props.email}
                editProfile={props.editProfile}
                updateProfileData={props.updateProfileData}
                edit={edit}
                toggleEdit={toggleEdit}
            />

            <ProPicUploader
                toggleEditPic={toggleEditPic}
                editPic={editPic}
                setProfilePicUrl={props.setProfilePicUrl}
            />
        </>
    );
}
