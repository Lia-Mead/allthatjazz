export function reducer(state = {}, action) {
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

    if (action.type === "SEND_COMMENT") {
        state = {
            ...state,
            comment: action.comment,
        };
    }

    if (action.type === "SHOW_MESSAGES") {
        state = {
            ...state,
            comments: action.comments,
        };
    }

    if (action.type === "NEW_MESSAGE") {
        state = {
            ...state,
            comments: [...state.comments, action.newComment],
        };
    }

    return state;
}
