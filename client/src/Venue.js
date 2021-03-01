import { useState, useEffect } from "react";
import axios from "./Axios";
import Comments from "./comments";

export default function Venue(props) {
    // console.log("props in venue", props);
    // console.log("i am Venue");

    const [venueId, setVenueId] = useState("");
    // const [first, setFirst] = useState("");
    const [venueName, setVenueName] = useState("");
    const [description, setDescription] = useState("");
    const [venuePic, setVenuePic] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        // console.log("props: ", props);
        // console.log("venueName", venueName);

        axios
            .get(`/api-venue/${props.match.params.id}`)
            .then((res) => {
                setVenueId(res.data.rows[0].id);
                setVenuePic(res.data.rows[0].image);
                setVenueName(res.data.rows[0].name);
                setDescription(res.data.rows[0].description);
                setError(false);
            })
            .catch((err) => {
                console.log("error in axios GET users", err);
            });
    }, []);

    return (
        <>
            <div className="overlay">
                <div className="venue-box">
                    {venueId && (
                        <>
                            <div
                                onClick={props.togglePopup}
                                className="back-box"
                            >
                                <img
                                    className="icon back"
                                    src="/images/back.svg"
                                />
                                <p className="back">Back</p>
                            </div>
                            <h1>{venueName}</h1>
                            <p>{description}</p>

                            <img
                                className="popup-pic"
                                src={venuePic || "/images/ven-avatar.jpg"}
                            />
                            <Comments id={props.id} venueId={venueId} />
                        </>
                    )}
                    {error && <p>Oops something went wrong.</p>}
                </div>
            </div>
        </>
    );
}
