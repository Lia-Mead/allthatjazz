import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import axios from "./Axios";
import Comments from "./comments";
// import EditVenue from "./editVenue";
import DeleteVenue from "./deleteVenue";
import Ratings from "./ratings";

export default function Venue(props) {
    // const dispatch = useDispatch();
    // console.log("props in venue", props);

    const [createdAt, setCreatedAt] = useState("");
    const [userFirst, setUserFirst] = useState("");
    const [userLast, setUserLast] = useState("");
    const [userPic, setUserPic] = useState("");

    const [venueId, setVenueId] = useState("");
    const [userCookie, setUserCookie] = useState("");
    const [venueName, setVenueName] = useState("");
    const [description, setDescription] = useState("");
    const [venuePic, setVenuePic] = useState("");
    const [userId, setUserId] = useState("");
    const [error, setError] = useState(false);

    // console.log("p.id in venue", props.id);

    useEffect(() => {
        // dispatch(myLastV(res.data.rows[0]));

        axios
            .get(`/api-venue/${props.match.params.id}`)
            .then((res) => {
                console.log("res.data.rowsUser[0].id", res.data.rowsUser[0].id);
                setCreatedAt(res.data.rowVen[0].created_at);
                setUserFirst(res.data.rowsUser[0].first);
                setUserLast(res.data.rowsUser[0].last);
                setUserPic(res.data.rowsUser[0].image);

                setVenueId(res.data.rowVen[0].id);
                setVenuePic(res.data.rowVen[0].image);
                setVenueName(res.data.rowVen[0].name);
                setDescription(res.data.rowVen[0].description);
                setUserId(res.data.rowsUser[0].id);
                setUserCookie(res.data.cookie);

                // console.log("cookie", res.data.cookie);

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

                {userId == userCookie && (
                    <DeleteVenue
                        id={props.id}
                        venId={props.venId}
                        toggleDelete={props.toggleDelete}
                        toggleDel={props.toggleDel}
                    />
                )}

                {error && <p>Oops something went wrong.</p>}
            </div>
        </>
    );
}

//  <DeleteVenue
//      venId={props.venId}
//      toggleDelete={props.toggleDelete}
//      toggleDel={props.toggleDel}
//  />

//  <div className="my-ven-box">
//      <button onClick={() => props.toggleEditVenue()} className="btn edit">
//          Edit Venue
//      </button>
//  </div>

//  <EditVenue
//      id={props.id}
//      venId={props.venId}
//      first={props.first}
//      last={props.last}
//      lat={props.lat}
//      lng={props.lng}
//      updateNewVen={props.updateNewVen}
//      editVenue={props.editVenue}
//      toggleEditVenue={props.toggleEditVenue}
//      toggleDelete={props.toggleDelete}
//      delVenFn={props.delVenFn}
//  />

//  <img
//                             className="icon"
//                             src="/images/delete.svg"
//                             onClick={() => props.toggleDelete}
//                         />
//                         <DeleteVenue
//                             venId={props.venId}
//                             toggleDelete={props.toggleDelete}
//                             toggleDel={props.toggleDel}
//                         />

//   {
//       userId == props.id && (
//           <>
//               <EditVenue
//                   id={props.id}
//                   venId={props.venId}
//                   first={props.first}
//                   last={props.last}
//                   lat={props.lat}
//                   lng={props.lng}
//                   updateNewVen={props.updateNewVen}
//                   editVenue={props.editVenue}
//                   toggleEditVenue={props.toggleEditVenue}
//                   toggleDelete={props.toggleDelete}
//                   delVenFn={props.delVenFn}
//               />
//           </>
//       );
//   }
