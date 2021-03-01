import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showAllVenues } from "./actions";
import { Link, Route } from "react-router-dom";
import Venue from "./venue";

export default function AllVenues() {
    const dispatch = useDispatch();

    const all = useSelector(
        (state) =>
            state.allVenues && state.allVenues.filter((venue) => venue.id)
    );

    const [openVen, setOpenVen] = useState(false);

    const togglePopup = () => {
        setOpenVen(!openVen);
    };

    // console.log("all venues", all);

    useEffect(() => {
        dispatch(showAllVenues());
    }, []);

    if (!all) {
        return null;
    }

    return (
        <div className="container">
            <h1>All Venues</h1>
            <div className="flex">
                {all.length === 0 && <h3>No Venues found</h3>}
                {all &&
                    all.map((venue) => (
                        <div key={venue.id}>
                            <div className="ven-con">
                                <img
                                    className="ven-icon"
                                    src="/images/pin.svg"
                                />
                                <div className="ven-text">
                                    <h2>{venue.name}</h2>
                                    <p className="gray">
                                        Added on{" "}
                                        {venue.created_at
                                            .slice(0, 16)
                                            .replace("T", " at ")}
                                    </p>
                                    <p>{venue.description}</p>
                                </div>

                                <Link
                                    to={`/venues/${venue.id}`}
                                    onClick={togglePopup}
                                >
                                    <div className="ven-pic">
                                        <img
                                            src={
                                                venue.image ||
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
    );
}

// {
//     openVen && (
//         <Route
//             path="/venues/:id"
//             render={(props) => (
//                 <Venue
//                     key={props.match.url}
//                     match={props.match}
//                     history={props.history}
//                     togglePopup={togglePopup}
//                 />
//             )}
//         />
//     );
// }
