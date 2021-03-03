import axios from "./Axios";
import { useState } from "react";

export default function DeleteVenue(props) {
    const [toggleDel, setToggleDel] = useState(false);

    const toggleDelete = () => {
        setToggleDel(!toggleDel);
    };

    const delVen = () => {
        axios
            .post(`/delete-venue`)
            .then((res) => {
                // window.location.reload();
                props.updateNewVen(res.data.rows[0]);
            })
            .catch((err) => {
                console.log("err in axios delete venue: ", err);
            });
    };
    return (
        <>
            {toggleDelete && (
                <div className="del-con">
                    <p>Are you sure?</p>
                    <div className="">
                        <button onClick={() => delVen()} className="btn del">
                            Yes, Delete
                        </button>
                        <button
                            onClick={() => props.toggleDelete()}
                            className="btn upload"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

// <a onClick={() => toggleDelete()} className="del-link">
//     Delete Account
// </a>
