import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allMyPosts } from "./actions";
import { Link } from "react-router-dom";
import EditVenue from "./editVenue";

export default function MyPosts(props) {
    const dispatch = useDispatch();

    const showAllMine = useSelector(
        (state) =>
            state.allMyPosts && state.allMyPosts.filter((post) => post.id)
    );

    const [editVenue, setEditVenue] = useState(false);

    const toggleEditVenue = () => {
        setEditVenue(!editVenue);
    };

    useEffect(() => {
        dispatch(allMyPosts());
    }, []);

    if (!showAllMine) {
        return null;
    }

    return (
        <>
            <h1>My Pinned Venues</h1>

            <div className="container">
                <div className="flex">
                    {showAllMine.length === 0 && (
                        <h3>I have not posted anything yet</h3>
                    )}

                    {showAllMine &&
                        showAllMine.map((post) => (
                            <div key={post.id}>
                                <div className="ven-con">
                                    <img
                                        className="ven-icon"
                                        src="/images/pin.svg"
                                    />
                                    <div className="ven-text">
                                        <h2>{post.name}</h2>
                                        <p className="gray">
                                            Added on{" "}
                                            {post.created_at
                                                .slice(0, 16)
                                                .replace("T", " at ")}
                                        </p>
                                        <p>{post.description}</p>

                                        <div className="my-edit-box">
                                            <button
                                                onClick={() =>
                                                    toggleEditVenue()
                                                }
                                                className="btn my-edit"
                                            >
                                                Edit Venue
                                            </button>
                                        </div>
                                    </div>

                                    <Link to={`/venues/${post.id}`}>
                                        <div className="ven-pic">
                                            <img
                                                src={
                                                    post.image ||
                                                    "/images/ven-avatar.jpg"
                                                }
                                            />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}

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
//                editVenue={props.editVenue}
//                toggleEditVenue={props.toggleEditVenue}
//                delVenFn={props.delVenFn}
//            />
//        );
//    }
