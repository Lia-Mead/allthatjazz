import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { myLastV } from "./actions";
import EditVenue from "./editVenue";

export default function MyNewVen(props) {
    const dispatch = useDispatch();

    const showLast = useSelector((state) => state.lastVen);

    const [editVenue, setEditVenue] = useState(false);
    // const [editVenPic, setEditVenPic] = useState(false);
    // const [error, setError] = useState(false);

    const toggleEditVenue = () => {
        setEditVenue(!editVenue);
    };

    // const toggleEditPic = () => {
    //     setEditVenPic(!editVenPic);
    // };

    useEffect(() => {
        dispatch(myLastV());
    }, []);

    return (
        <div className="my-ven-con">
            {showLast &&
                showLast.map((ven) => (
                    <div key={ven.id}>
                        <div className="my-ven-box">
                            <h2>
                                I just pinned {""}
                                <span className="orange">{ven.name}</span>
                            </h2>
                            <img
                                className="my-ven-pic"
                                src={ven.image || "/images/ven-avatar.jpg"}
                            />
                            <div className="">
                                <p className="gray">
                                    {props.first} {props.last} on{" "}
                                    {ven.created_at
                                        .slice(0, 16)
                                        .replace("T", " at ")}
                                </p>

                                <button
                                    onClick={() => toggleEditVenue()}
                                    className="btn edit"
                                >
                                    Edit Venue
                                </button>

                                {editVenue && (
                                    <EditVenue
                                        first={props.first}
                                        last={props.last}
                                        lat={props.lat}
                                        lng={props.lng}
                                        editVenue={props.editVenue}
                                        updateVenuePost={props.updateVenuePost}
                                        toggleEditVenue={toggleEditVenue}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}

//  <Link to={`/edit-venue`}>
//      <button className="btn edit">Edit Venue</button>
//  </Link>;
