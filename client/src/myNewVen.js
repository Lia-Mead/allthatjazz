import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { myLastV } from "./actions";

export default function MyNewVen(props) {
    const dispatch = useDispatch();

    const showLast = useSelector((state) => state.lastVen);
    // const showNewVens = useSelector(
    //     (state) =>
    //         state.lastVenues && state.lastVenues.filter((venue) => venue.id)
    // );

    useEffect(() => {
        dispatch(myLastV());
    }, []);

    return (
        <div className="cards-container">
            <h2>Newly Added</h2>

            <div className="new-vens">
                {showLast &&
                    showLast.map((ven) => (
                        <div key={ven.id}>
                            <div className="card">
                                <h3>{ven.name}</h3>
                                <img
                                    className="card-pic"
                                    src={ven.image || "/images/ven-avatar.jpg"}
                                />
                                <div className="">
                                    <p className="gray">
                                        {props.first} {props.last} on{" "}
                                        {ven.created_at
                                            .slice(0, 16)
                                            .replace("T", " at ")}
                                    </p>
                                    <Link to={`/venues/${ven.id}`}>
                                        <button className="btn link">
                                            Go to Venue
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
