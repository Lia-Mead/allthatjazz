import { useState } from "react";
import axios from "./Axios";

export default function EditProfile(props) {
    const [edit, setEdit] = useState(false);

    let [first, setFirst] = useState("");
    let [last, setLast] = useState("");
    let [pic, setPic] = useState("");
    let [pass, setPass] = useState("");
    let [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    // const [isEditing, setEditing] = useState(false);

    const toggleEdit = () => {
        setEdit(!edit);
    };

    const editProfile = (e) => {
        e.preventDefault();
        console.log("first: ", first.length);
        console.log("last: ", last);
        console.log("email: ", email);
        console.log("pass: ", pass);
        // let origFirst = props.first;
        first = first.length == 0 ? props.first : first;
        last = last.length == 0 ? props.last : last;
        email = email == false ? props.email : email;
        // pass = pass.length == 0 ? props.pass : pass;
        // last.length == 0 ? last == props.last : last;
        // email.length == false ? email == props.email : email;
        // pass.length == 0 ? first == props.first : first;

        // useEffect(() => {
        //     dispatch(receiveFriendsWannabes());
        // }, []);

        axios
            .post("/edit-profile", { first, email, last, pass })
            .then((res) => {
                console.log("response: ", res);
                // first != null && setFirst(res.data.rows.first);
                // last != null && setLast(res.data.rows.last);
                // email != null && setEmail(res.data.rows.email);
                // pass != null && setPass(res.data.rows.password);
                // setFirst(res.data.rows.first);
                // setLast(res.data.rows.last);
                // setEmail(res.data.rows.email);
                // setPass(res.data.rows.password);
                // setFirst(first);
                // setLast(last);
                // setEmail(email);
                // setPass(pass);
                setEdit(!edit);
                setError(false);
            })
            .catch((err) => {
                console.log("error in axios api/user: ", err);
                setError(true);
            });
    };

    return (
        <>
            <button onClick={() => toggleEdit()} className="btn">
                Edit Account
            </button>
            {edit && (
                <div className="pro-fields">
                    <h2>Edit Profile</h2>
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
