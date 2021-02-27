import { useState, useEffect, useRef } from "react";
import axios from "./Axios";

export default function AddVenue() {
    console.log("i am the Add Venue");
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

        axios
            .post("/add-venue", formData)
            .then((resp) => {
                console.log("resp", resp.rows);
                // props.setProfilePicUrl(resp.data.rows);
                // props.toggleEditPic(!props.toggleEditPic);
                // setVenueName(venueName);
                // setDescription(description);
                // venuePic && setVenuePic(venuePic);
                // venuePic != 0;
                setError(false);
            })
            .catch((err) => {
                console.log("error in POST upload profile pic submit", err);
                setError(true);
            });
    };

    return (
        <div className="add-venue">
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
    );
}
