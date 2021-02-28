import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showAllVenues } from "./actions";
import axios from "./Axios";
// import { Link } from "react-router-dom";

export default function NewVenues() {
    const dispatch = useDispatch();

    const all = useSelector(
        (state) =>
            state.allVenues && state.allVenues.filter((venue) => venue.id)
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
