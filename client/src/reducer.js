export function reducer(state = {}, action) {
    // if (action.type === "SHOW_ALL_VENUES") {
    //     state = {
    //         ...state,
    //         allVenues: state.allVenues.map((venue) => {
    //             if (venue.id === action.id) {
    //                 return {
    //                     ...venue,
    //                 };
    //             } else {
    //                 return venue;
    //             }
    //         }),
    //     };
    // }

    if (action.type === "SHOW_ALL_VENUES") {
        state = {
            ...state,
            allVenues: action.allVenues,
        };
    }

    if (action.type === "NEW_VEN") {
        state = {
            ...state,
            allVenues: [...state.allVenues, action.newVen],
        };
    }

    return state;
}
