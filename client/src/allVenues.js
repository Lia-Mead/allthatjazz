import { useEffect } from "react";

import {} from "./actions";

import { createStore } from "redux";
import { reducer } from "./reducer";

export default function AllVenues() {
    const store = createStore(reducer);
}

// const dispatch = useDispatch();

// const friends = useSelector(
//     (state) => state.users && state.users.filter((user) => user.accepted)
// );

// const pending = useSelector(
//     (state) =>
//         state.users &&
//         state.users.filter(
//             (user) => user.accepted == false && user.recipient_id === user.id
//         )
// );
