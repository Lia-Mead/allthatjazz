import axios from "./Axios";
import { useState } from "react";

export default function DeleteVenue(props) {
    const [toggleDel, setToggleDel] = useState(false);

    const toggleDelVenue = () => {
        setToggleDel(!toggleDel);
    };

    // console.log("props.id", props.id);

    const delVen = () => {
        const venueId = props.venId;
        console.log("venueId", venueId);
        axios
            .post(`/delete-venue`, { venueId })
            .then((res) => {
                // console.log("res del ven", res);
                window.location.replace("/venues");
                // props.delVenFn(res.data.rows[0]);
            })
            .catch((err) => {
                console.log("err in axios delete venue: ", err);
            });
    };
    return (
        <>
            <img
                className="icon"
                src="/images/delete.svg"
                onClick={() => toggleDelVenue()}
            />
            {toggleDel && (
                <div className="del-con">
                    <p>Are you sure?</p>
                    <div className="">
                        <button onClick={() => delVen()} className="btn del">
                            Yes, Delete
                        </button>
                        <button
                            onClick={() => toggleDelVenue()}
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
