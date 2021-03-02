import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "./Axios";
import { addVen, myLastV } from "./actions";

export default function EditVenue(props) {
    // console.log("props in edit pro", props);
    const dispatch = useDispatch();

    let [venueName, setVenueName] = useState("");
    let [description, setDescription] = useState("");
    let [venuePic, setVenuePic] = useState("");
    // let [lat, setLat] = useState("");
    // let [lng, setLng] = useState("");

    const [error, setError] = useState(false);
    const [errorNoname, setErrorNoname] = useState(false);
    const [errorPic, setErrorPic] = useState(false);

    const submitVenue = (e) => {
        e.preventDefault();
        // let formData = new FormData();
        let formDataPic = new FormData();
        let lat = props.lat;
        let lng = props.lng;

        formDataPic.append("venueName", venueName);
        formDataPic.append("description", description);
        formDataPic.append("file", venuePic);
        formDataPic.append("lat", props.lat);
        formDataPic.append("lng", props.lng);

        if (venueName.length == 0) {
            setErrorNoname(true);
        } else if (venuePic != 0) {
            axios
                .post("/edit-venue-pic", formDataPic)
                .then((res) => {
                    console.log(
                        "resp in edit-venue-pic axios POST",
                        res.data.rows
                    );

                    props.updateNewVen(res.data.rows[0]);

                    dispatch(addVen(res.data.rows[0]));
                    dispatch(myLastV(res.data.rows[0]));

                    setError(false);

                    props.togglePopup(!props.newVen);
                })
                .catch((err) => {
                    console.log("error in POST edit venue pic submit", err);
                    setErrorPic(true);
                    setErrorNoname(false);
                });
        } else {
            axios
                .post("/edit-venue", { venueName, description, lat, lng })
                .then((res) => {
                    // console.log(
                    //     "resp in add-venue no pic axios POST",
                    //     res.data.rows[0]
                    // );
                    props.updateNewVen(res.data.rows[0]);

                    dispatch(addVen(res.data.rows[0]));
                    dispatch(myLastV(res.data.rows[0]));

                    setError(false);
                    props.togglePopup(!props.newVen);
                })
                .catch((err) => {
                    console.log("error in POST add bar submit", err);
                    setError(true);
                });
        }
    };

    // const editVenue = (e) => {
    //     e.preventDefault();
    //     venueName = venueName.length == 0 ? props.venueName : venueName;
    //     description = description.length == 0 ? props.description : description;
    //     venuePic = venuePic == false ? props.venuePic : venuePic;

    //     axios
    //         .post("/edit-venue", { venueName, description, venuePic })
    //         .then((res) => {
    //             props.updateVenuePost(res.data.rows);
    //             props.toggleEditVen(!props.toggleEditVen);
    //             setError(false);
    //         })
    //         .catch((err) => {
    //             console.log("error in axios api/edit-venue: ", err);
    //             setError(true);
    //         });
    // };

    return (
        <>
            <div className="pro-fields">
                <h3>Edit Mode</h3>
                <input
                    onChange={(e) => setVenueName(e.target.value)}
                    name="name"
                    type="text"
                    placeholder="Venue Name"
                    autoComplete="off"
                    defaultValue={props.venueName}
                ></input>
                <input
                    onChange={(e) => setDescription(e.target.value)}
                    name="text-area"
                    type="text"
                    placeholder="Description"
                    autoComplete="off"
                    defaultValue={props.description}
                ></input>

                <input
                    className="input-file"
                    onChange={(e) => setVenuePic(e.target.files[0])}
                    name="file"
                    type="file"
                    accept="image/*"
                />

                <button className="btn upload" onClick={(e) => submitVenue(e)}>
                    Submit
                </button>
            </div>
        </>
    );
}

// from add venue

// <div className="add-venue">
//     <img
//         onClick={props.togglePopup}
//         className="icon-close"
//         src="/images/close.svg"
//     />
//     <h3>Pin your Jazzy Experience</h3>
//     <input
//         className="input"
//         onChange={(e) => setVenueName(e.target.value)}
//         name="name"
//         type="text"
//         placeholder="Insert Venue Name"
//         autoComplete="off"
//     />
//     <textarea
//         name="description"
//         placeholder="Share your experience at this venue"
//         className="text-area"
//         onChange={(e) => setDescription(e.target.value)}
//     />
//     <p className="handwrite">Insert your venue picture</p>
// <input
//     className="input-file"
//     onChange={(e) => setVenuePic(e.target.files[0])}
//     name="file"
//     type="file"
//     accept="image/*"
// />

//     <button className="btn upload" onClick={(e) => submitVenue(e)}>
//         Upload
//     </button>
//     {error && <p className="error">Oops something went wrong.</p>}
//     {errorNoname && <p className="error">Please add a venue name.</p>}
//     {errorPic && <p className="error">Your file is too large. Max 2MB</p>}
// </div>;
