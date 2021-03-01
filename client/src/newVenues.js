import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newThreeVens } from "./actions";
import axios from "./Axios";
// import { Link } from "react-router-dom";

export default function NewVenues(props) {
    const dispatch = useDispatch();

    // const [newV, setNewV] = useState([]);

    // const all = useSelector(
    //     (state) =>
    //         state.allVenues && state.allVenues.filter((venue) => venue.id)
    // );

    // last 3

    // const newVens = useSelector(
    //     (state) =>
    //         state.allVenues && state.allVenues.filter((venue) => venue.id)
    // );

    const showNewVens = useSelector(
        (state) =>
            state.newVenues && state.newVenues.filter((venue) => venue.id)
    );

    // const newVens = useSelector(
    //     (state) =>
    //         state.allVenues &&
    //         state.allVenues.filter((venue) => venue.venue_id == props.venueId)
    // );

    // const all = useSelector(
    //     (state) =>
    //         state.allVenues &&
    //         state.allVenues.filter(
    //             (venue) => venue[0].id && venue[1].id && venue[2].id
    //         )
    // );

    // console.log("all", all);

    // const [user, setUser] = useState("");
    // const [users, setUsers] = useState([]);
    // const [userInput, setUserInput] = useState("");
    // const [error, setError] = useState(false);

    useEffect(() => {
        dispatch(newThreeVens());
    }, []);
    // useEffect(() => {
    //     dispatch(showAllVenues());
    // }, []);

    return (
        <div className="cards-container">
            <h3>Check out the new Venues added</h3>

            <div className="new-vens">
                {showNewVens &&
                    showNewVens.map((ven) => (
                        <div key={ven.id}>
                            <div className="card">
                                <img
                                    className="card-pic"
                                    src={ven.image || "/images/ven-avatar.jpg"}
                                />
                                <div className="">
                                    <p className="gray">
                                        {ven.first} {ven.last} on{" "}
                                        {ven.created_at
                                            .slice(0, 16)
                                            .replace("T", " at ")}
                                    </p>
                                    <p>{ven.comment}</p>
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
