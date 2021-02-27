import { useState } from "react";
import axios from "./Axios";

export default function EditProfile(props) {
    // console.log("props in edit pro", props);
    // const [edit, setEdit] = useState(false);

    let [first, setFirst] = useState("");
    let [last, setLast] = useState("");
    let [pass, setPass] = useState("");
    let [email, setEmail] = useState("");
    const [error, setError] = useState(false);

    const editProfile = (e) => {
        e.preventDefault();
        first = first.length == 0 ? props.first : first;
        last = last.length == 0 ? props.last : last;
        email = email == false ? props.email : email;

        axios
            .post("/edit-profile", { first, email, last, pass })
            .then((res) => {
                props.updateProfileData(res.data.rows);
                props.toggleEdit(!props.toggleEdit);
                setError(false);
            })
            .catch((err) => {
                console.log("error in axios api/user: ", err);
                setError(true);
            });
    };

    return (
        <>
            <button onClick={() => props.toggleEdit()} className="btn">
                Edit Account
            </button>
            {props.edit && (
                <div className="pro-fields">
                    <h3>Edit Mode</h3>
                    <input
                        onChange={(e) => setFirst(e.target.value)}
                        name="first"
                        type="text"
                        placeholder="First Name"
                        autoComplete="off"
                        defaultValue={props.first}
                    ></input>
                    <input
                        onChange={(e) => setLast(e.target.value)}
                        name="last"
                        type="text"
                        placeholder="Last Name"
                        autoComplete="off"
                        defaultValue={props.last}
                    ></input>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="off"
                        defaultValue={props.email}
                    ></input>
                    <input
                        onChange={(e) => setPass(e.target.value)}
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="off"
                    ></input>
                    <button className="btn" onClick={(e) => editProfile(e)}>
                        Submit
                    </button>
                </div>
            )}
        </>
    );
}
