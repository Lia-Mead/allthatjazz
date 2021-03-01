import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "./Axios";
import { addVen } from "./actions";

export default function AddVenue(props) {
    // console.log("props in add venue", props);
    // console.log("pinLocation", props.pinLocation);
    // const inputRef = useRef("");
    const dispatch = useDispatch();

    const [venueName, setVenueName] = useState("");
    const [description, setDescription] = useState("");
    const [venuePic, setVenuePic] = useState("");
    const [error, setError] = useState(false);
    const [errorNoname, setErrorNoname] = useState(false);
    const [errorPic, setErrorPic] = useState(false);

    const submitVenue = (e) => {
        e.preventDefault();
        // let formData = new FormData();
        let formDataPic = new FormData();
        let lat = props.pinLocation.lat;
        let lng = props.pinLocation.lng;

        formDataPic.append("venueName", venueName);
        formDataPic.append("description", description);
        formDataPic.append("file", venuePic);
        formDataPic.append("lat", props.pinLocation.lat);
        formDataPic.append("lng", props.pinLocation.lng);

        if (venueName.length == 0) {
            setErrorNoname(true);
        } else if (venuePic != 0) {
            axios
                .post("/add-venue-pic", formDataPic)
                .then((res) => {
                    console.log(
                        "resp in add-venue-pic axios POST",
                        res.data.rows
                    );

                    props.updateNewVen(res.data.rows[0]);

                    dispatch(addVen(res.data.rows[0]));

                    setError(false);

                    props.togglePopup(!props.newVen);
                })
                .catch((err) => {
                    console.log(
                        "error in POST add bar upload venue pic submit",
                        err
                    );
                    setErrorPic(true);
                    setErrorNoname(false);
                });
        } else {
            axios
                .post("/add-venue", { venueName, description, lat, lng })
                .then((res) => {
                    // console.log(
                    //     "resp in add-venue no pic axios POST",
                    //     res.data.rows[0]
                    // );
                    props.updateNewVen(res.data.rows[0]);

                    dispatch(addVen(res.data.rows[0]));

                    setError(false);
                    props.togglePopup(!props.newVen);
                })
                .catch((err) => {
                    console.log("error in POST add bar submit", err);
                    setError(true);
                });
        }
    };

    return (
        <div className="overlay">
            <div className="add-venue">
                <img
                    onClick={props.togglePopup}
                    className="icon-close"
                    src="/images/close.svg"
                />
                <h3>Pin your Jazzy Experience</h3>
                <input
                    className="input"
                    onChange={(e) => setVenueName(e.target.value)}
                    name="name"
                    type="text"
                    placeholder="Insert Venue Name"
                    autoComplete="off"
                />
                <textarea
                    name="description"
                    placeholder="Share your experience at this venue"
                    className="text-area"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <p className="handwrite">Insert your venue picture</p>
                <input
                    className="input-file"
                    onChange={(e) => setVenuePic(e.target.files[0])}
                    name="file"
                    type="file"
                    accept="image/*"
                />

                <button className="btn upload" onClick={(e) => submitVenue(e)}>
                    Upload
                </button>
                {error && <p className="error">Oops something went wrong.</p>}
                {errorNoname && (
                    <p className="error">Please add a venue name.</p>
                )}
                {errorPic && (
                    <p className="error">Your file is too large. Max 2MB</p>
                )}
            </div>
        </div>
    );
}
