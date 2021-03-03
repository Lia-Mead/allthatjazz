import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "./Axios";
import Comments from "./comments";
import Ratings from "./ratings";
import { myLastV } from "./actions";

export default function Venue(props) {
    const dispatch = useDispatch();
    // console.log("props in venue", props);
    // console.log("i am Venue");

    const [venueId, setVenueId] = useState("");
    // const [first, setFirst] = useState("");
    const [venueName, setVenueName] = useState("");
    const [description, setDescription] = useState("");
    const [venuePic, setVenuePic] = useState("");
    const [error, setError] = useState(false);

    const showLast = useSelector((state) => state.lastVen);
    console.log("showLast[0].lat", showLast[0].lat);
    console.log("showLast[0].id", showLast[0].id);

    useEffect(() => {
        // console.log("props: ", props);
        // console.log("venueName", venueName);

        // dispatch(myLastV(res.data.rows[0]));

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
                            <img
                                onClick={() => props.history.goBack()}
                                className="icon-close"
                                src="/images/close.svg"
                            />
                            <h1>{venueName}</h1>
                            <p>{description}</p>
                            <Ratings />
                            <img
                                className="popup-pic ven"
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

//    <div className="my-ven-box">
//        <button onClick={() => toggleEditVenue()} className="btn edit">
//            Edit Venue
//        </button>
//    </div>;

//    {
//        editVenue && (
//            <EditVenue
//                id={props.id}
//                venId={props.venId}
//                first={props.first}
//                last={props.last}
//                lat={props.lat}
//                lng={props.lng}
//                updateNewVen={props.updateNewVen}
//                editVenue={editVenue}
//                toggleEditVenue={toggleEditVenue}
//            />
//        );
//    }
