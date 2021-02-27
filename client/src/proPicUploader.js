import axios from "./Axios";
import { useState } from "react";

export default function ProPicUploader(props) {
    const [file, setFile] = useState("");
    const [error, setError] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        // console.log("file in submit", this.state.file);
        formData.append("file", file);

        axios
            .post("/profile-pic", formData)
            .then((resp) => {
                // console.log("response from profile-pic", resp);
                // console.log("resp.data.data"), resp.data.rows;
                props.setProfilePicUrl(resp.data.rows);
                props.toggleEditPic(!props.toggleEditPic);
                setError(false);
            })
            .catch((err) => {
                console.log("error in POST upload profile pic submit", err);
                setError(true);
            });
    };

    return (
        // console.log("this.props in uploader", this.props);
        <div className="uploader">
            <button onClick={() => props.toggleEditPic()} className="btn edit">
                Edit Picture
            </button>

            {props.editPic && (
                <>
                    <input
                        className="input-file"
                        onChange={(e) => setFile(e.target.files[0])}
                        name="file"
                        type="file"
                        accept="image/*"
                    />
                    <button className="btn upload" onClick={(e) => submit(e)}>
                        Upload
                    </button>
                    {error && <p>Oops something went wrong.</p>}
                </>
            )}
        </div>
    );
}
