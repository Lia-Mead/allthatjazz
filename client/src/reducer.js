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
            newVenues: [action.newVen, ...state.newVenues].slice(0, 3),
        };
    }

    if (action.type === "MY_POSTS") {
        state = {
            ...state,
            allMyPosts: action.allMyPosts,
        };
    }

    if (action.type === "UPDATE_VEN") {
        state = {
            ...state,
            newVenues: state.newVenues.map(function (ven) {
                if (ven.id == action.updateVen.id) {
                    return action.updateVen;
                } else {
                    return ven;
                }
            }),
        };
    }

    if (action.type === "LAST_VEN") {
        state = {
            ...state,
            lastVen: action.lastVen,
            uploader: action.uploader,
        };
    }
    // if (action.type === "LAST-VEN") {
    //     state = {
    //         ...state,
    //         lastVen: action.lastVen,
    //     };
    // }

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

    // if (action.type === "SHOW_RATINGS") {
    //     state = {
    //         ...state,
    //         allReviews: action.allReviews,
    //     };
    // }

    // if (action.type === "ADD_RATING") {
    //     state = {
    //         ...state,
    //         allReviews: [...state.allReviews, action.newReview],
    //     };
    // }

    return state;
}
