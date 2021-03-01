import axios from "./Axios";

export async function showAllVenues() {
    const { data } = await axios.get("/api/all-venues");
    // console.log("data.rows in axios all venues: ", data.rows);
    return {
        type: "SHOW_ALL_VENUES",
        allVenues: data.rows,
    };
}

export async function addVen(newVen) {
    try {
        const { data } = await axios.post("/add-venue");
        console.log(("addVen data: ", data));
        return {
            type: "NEW_VEN",
            newVen,
        };
    } catch (err) {
        console.log("err accepting friend: ", err);
    }
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
