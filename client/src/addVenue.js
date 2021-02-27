import { useState, useEffect, useRef } from "react";
import axios from "./Axios";

export default function AddVenue(props) {
    console.log("props in add venue", props);
    console.log("pinLocation", props.pinLocation);
    // const inputRef = useRef("");

    const [venueName, setVenueName] = useState("");
    const [description, setDescription] = useState("");
    const [venuePic, setVenuePic] = useState("");
    const [error, setError] = useState(false);

    const submitVenue = (e) => {
        e.preventDefault();
        let formData = new FormData();
        // console.log("file in submit", this.state.file);
        formData.append("venueName", venueName);
        formData.append("description", description);
        formData.append("file", venuePic);
        formData.append("lat", props.pinLocation.lat);
        formData.append("lng", props.pinLocation.lng);

        axios
            .post("/add-venue", formData)
            .then((res) => {
                // console.log("resp in add-venue axios POST", res.data.rows);
                console.log("address: ", res.data.rows[0].address);
                console.log("lat: ", res.data.rows[0].lat);
                console.log("lng: ", res.data.rows[0].lng);
                // props.updateNewVen(res.data.rows[0].address);

                props.togglePopup(!props.newVen);
                setError(false);
            })
            .catch((err) => {
                console.log("error in POST upload profile pic submit", err);
                setError(true);
            });
    };

    return (
        <div className="overlay">
            <div className="add-venue">
                <img
                    onClick={props.togglePopup}
                    className="icon-close"
                    src="/images/close.svg"
                />
                <input
                    className="input-file"
                    onChange={(e) => setVenueName(e.target.value)}
                    name="name"
                    type="text"
                    placeholder="Venue Name"
                    autoComplete="off"
                />
                <textarea
                    name="description"
                    placeholder="Share your experience at this venue"
                    className="chat-area"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <p>Share your venue image</p>
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
                {error && <p>Oops something went wrong.</p>}
            </div>
        </div>
    );
}
