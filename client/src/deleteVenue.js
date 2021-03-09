import axios from "./Axios";
import { useState } from "react";

export default function DeleteVenue(props) {
    const [toggleDel, setToggleDel] = useState(false);

    const toggleDelete = () => {
        setToggleDel(!toggleDel);
    };

    const delVen = () => {
        const venueId = props.venId;
        console.log("venueId", venueId);
        axios
            .post(`/delete-venue`, { venueId })
            .then((res) => {
                console.log("res del ven", res);
                window.location.replace("/venues");
                // props.delVenFn(res.data.rows[0]);
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
