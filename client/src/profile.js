import { useState, useEffect } from "react";
import axios from "./Axios";
import ProfilePic from "./profilePic";
import EditProfile from "./editProfile";

export default function Profile(props) {
    console.log("props in profile", props);
    // const [edit, setEdit] = useState(false);

    // const [id, setId] = useState("");
    // let [first, setFirst] = useState("");
    // let [last, setLast] = useState("");
    // let [pic, setPic] = useState("");
    // let [pass, setPass] = useState("");
    // let [email, setEmail] = useState("");
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState(false);

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
                <img
                    className="pro-pic"
                    src={props.pic || "/images/avatar.jpg"}
                />
            </div>

            <EditProfile
                first={props.first}
                last={props.last}
                email={props.email}
                toggleEdit={props.toggleEdit}
                editProfile={props.editProfile}
            />
        </>
    );
}
