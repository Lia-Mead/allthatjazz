import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import axios from "./Axios";
import Comments from "./comments";
import Ratings from "./ratings";

export default function Venue(props) {
    // const dispatch = useDispatch();
    // console.log("props in venue", props);
    // console.log("i am Venue");

    const [createdAt, setCreatedAt] = useState("");
    const [userFirst, setUserFirst] = useState("");
    const [userLast, setUserLast] = useState("");
    const [userPic, setUserPic] = useState("");

    const [venueId, setVenueId] = useState("");
    // const [first, setFirst] = useState("");
    const [venueName, setVenueName] = useState("");
    const [description, setDescription] = useState("");
    const [venuePic, setVenuePic] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        // console.log("props: ", props);
        // console.log("venueName", venueName);

        // dispatch(myLastV(res.data.rows[0]));

        axios
            .get(`/api-venue/${props.match.params.id}`)
            .then((res) => {
                setCreatedAt(res.data.rowVen[0].created_at);
                setUserFirst(res.data.rowsUser[0].first);
                setUserLast(res.data.rowsUser[0].last);
                setUserPic(res.data.rowsUser[0].image);

                setVenueId(res.data.rowVen[0].id);
                setVenuePic(res.data.rowVen[0].image);
                setVenueName(res.data.rowVen[0].name);
                setDescription(res.data.rowVen[0].description);
                setError(false);
            })
            .catch((err) => {
                console.log("error in axios GET venues", err);
            });
    }, []);

    return (
        <>
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

                        <div className="ven-creator">
                            <img
                                className="pro-pic small"
                                src={userPic || "/images/avatar.svg"}
                            />
                            <div className="user-box">
                                <p className="gray">
                                    Created by {userFirst} {userLast} on{" "}
                                    {createdAt
                                        .slice(0, 16)
                                        .replace("T", " at ")}
                                </p>
                            </div>
                        </div>

                        <img
                            className="ven-image"
                            src={venuePic || "/images/ven-avatar.jpg"}
                        />
                        <Comments id={props.id} venueId={venueId} />
                    </>
                )}

                {error && <p>Oops something went wrong.</p>}
            </div>
        </>
    );
}
// return (
//     <>
//         <div className="overlay">
//             <div className="venue-box">
//                 {venueId && (
//                     <>
//                         <img
//                             onClick={() => props.history.goBack()}
//                             className="icon-close"
//                             src="/images/close.svg"
//                         />
//                         <h1>{venueName}</h1>
//                         <p>{description}</p>
//                         <Ratings />

//                         <div className="comment-user">
//                             <img
//                                 className="pro-pic small"
//                                 src={userPic || "/images/avatar.svg"}
//                             />
//                             <div className="user-box">
//                                 <p className="gray">
//                                     Created by {userFirst} {userLast} on{" "}
//                                     {createdAt
//                                         .slice(0, 16)
//                                         .replace("T", " at ")}
//                                 </p>
//                             </div>
//                         </div>

//                         <img
//                             className="popup-pic ven"
//                             src={venuePic || "/images/ven-avatar.jpg"}
//                         />
//                         <Comments id={props.id} venueId={venueId} />
//                     </>
//                 )}

//                 {error && <p>Oops something went wrong.</p>}
//             </div>
//         </div>
//     </>
// );
