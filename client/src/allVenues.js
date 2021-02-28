import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showAllVenues } from "./actions";
import { Link } from "react-router-dom";

export default function AllVenues() {
    const dispatch = useDispatch();

    // const all = useSelector(
    //     (state) => state.allVenues && state.allVenues.map((venue) => venue.id)
    // );
    // const allv = useSelector((state) => state.allVenues && state.allVenues());

    // console.log("state.allvenues"), state.allvenues;

    // const all = useSelector((state) => state.allvenues);

    const all = useSelector(
        (state) =>
            state.allVenues && state.allVenues.filter((venue) => venue.id)
    );

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
                                    <p>{venue.description}</p>
                                </div>

                                <Link to={`/venue/${venue.id}`}>
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
