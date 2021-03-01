import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showAllVenues } from "./actions";
import axios from "./Axios";
// import { Link } from "react-router-dom";

export default function NewVenues(props) {
    const dispatch = useDispatch();

    const all = useSelector(
        (state) =>
            state.allVenues && state.allVenues.filter((venue) => venue.id)
    );

    const newVens = useSelector(
        (state) =>
            state.venues &&
            state.venues.filter((venue) => venue.venue_id == props.venueId)
    );

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
        // axios
        //     .get("/new-venues")
        //     .then(({ data }) => {
        //         // console.log("data: ", data);
        //         setUser(data.rows);
        //     })
        //     .catch((err) => {
        //         console.log("error in axios GET new venues", err);
        //     });

        dispatch(showAllVenues());
    }, []);

    return (
        <div className="find-people">
            <h3>Check out the new Venues added</h3>

            {newVens &&
                newVens.map((ven) => (
                    <div
                        className={
                            ven.user_id == props.id ? "comment my" : "comment"
                        }
                        key={ven.id}
                    >
                        <div className="comment-user">
                            <img
                                className="pro-pic small"
                                src={ven.image || "/images/avatar.svg"}
                            />
                            <div className="comment">
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
