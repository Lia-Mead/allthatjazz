export function reducer(state = {}, action) {
    if (action.type === "SHOW_ALL_VENUES") {
        state = {
            ...state,
            allVenues: action.allVenues,
        };
    }

    if (action.type === "NEW_VENUES") {
        state = {
            ...state,
            newVenues: action.newVenues,
        };
    }

    if (action.type === "NEW_VEN") {
        state = {
            ...state,
            newVenues: [...state.newVenues, action.newVen],
        };
    }

    if (action.type === "LAST-VEN") {
        state = {
            ...state,
            lastVen: action.lastVen,
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

    if (action.type === "SHOW_RATINGS") {
        state = {
            ...state,
            allReviews: action.allReviews,
        };
    }

    if (action.type === "ADD_RATING") {
        state = {
            ...state,
            allReviews: [...state.allReviews, action.newReview],
        };
    }

    return state;
}
