import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { newThreeVens } from "./actions";
// import axios from "./Axios";

export default function NewVenues(props) {
    const dispatch = useDispatch();

    const showNewVens = useSelector(
        (state) =>
            state.newVenues && state.newVenues.filter((venue) => venue.id)
    );

    useEffect(() => {
        dispatch(newThreeVens());
    }, []);

    return (
        <div className="cards-container">
            <h2>Newly Added</h2>

            <div className="new-vens">
                {showNewVens &&
                    showNewVens.map((ven) => (
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

//  <Link to={`/venues/${ven.id}`} key={ven.id} className="user-search">
//      <img
//          src={ven.image || "/images/ven-avatar.jpg"}
//          alt={`${ven.name}`}
//      />
//      <p>{`${ven.description} `}</p>
//  </Link>;

// {
//     all &&
//         all.map((ven) => {
//             return (
//                 <>
//                     <img
//                         key={ven.id}
//                         src={ven.image || "/images/ven-avatar.jpg"}
//                         alt={`${ven.name}`}
//                     />
//                     <p>{`${ven.description} `}</p>
//                 </>
//             );
//         });
// }
