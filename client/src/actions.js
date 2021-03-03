import axios from "./Axios";

export async function showAllVenues() {
    const { data } = await axios.get("/api/all-venues");
    // console.log("data.rows in axios all venues: ", data.rows);
    return {
        type: "SHOW_ALL_VENUES",
        allVenues: data.rows,
    };
}

export async function newThreeVens() {
    const { data } = await axios.get("/new-venues");
    // console.log("data.rows in axios all venues: ", data.rows);
    return {
        type: "NEW_VENUES",
        newVenues: data.rows,
    };
}

export async function myLastV() {
    const { data } = await axios.get("/api-last-ven");
    console.log("rowVen: rowVen, rowUser: rows: ", data.rowVen, data.rowUser);
    // console.log("data in axios all venues: ", data);
    return {
        type: "LAST-VEN",
        lastVen: data.rowVen,
        uploader: data.rowUser,
    };
}

export async function addVen(newVen) {
    // const { data } = await axios.post("/add-venue");
    // console.log(("newVen: ", newVen));
    return {
        type: "NEW_VEN",
        newVen,
    };
}

export async function updateVen(updateVen) {
    return {
        type: "UPDATE_VEN",
        updateVen,
    };
}

export function sendComment(comment) {
    return {
        type: "SEND_COMMENT",
        comment,
    };
}

export function showComments(comments) {
    // console.log("messages", messages);
    return {
        type: "SHOW_MESSAGES",
        comments,
    };
}

export function showNewComments(newComment) {
    // console.log("newMessage", newMessage);
    return {
        type: "NEW_MESSAGE",
        newComment,
    };
}

// export function like(review) {
//     console.log("review", review);
//     return {
//         type: "NEW_RATE",
//         review,
//     };
// }

export async function addRating(id) {
    const { data } = await axios.post(`/reviews/${id}`);
    console.log("data receive rating: ", data.rows);
    console.log("addRating data: ", data.rows.id);
    console.log("addRating data: ", id);

    return {
        type: "ADD_RATING",
        newReview: id,
    };
}

export async function receiveRatings(id) {
    const { data } = await axios.get(`/reviews/${id}`);
    console.log("data receive rating: ", data.rows);
    console.log("addRating data: ", data.rows.id);
    console.log("addRating data: ", data.rows[0]);
    console.log("addRating id: ", id);
    return {
        type: "SHOW_RATINGS",
        allReviews: data.rows,
    };
}

export async function delVen(id) {
    try {
        const { data } = await axios.post("/delete-venue", { id });
        console.log("data delVen: ", data.rows);
        console.log("delVen data: ", data.rows.id);
        return {
            type: "DEL_VEN",
            id: id,
        };
    } catch (err) {
        console.log("err accepting friend: ", err);
    }
}
