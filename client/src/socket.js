import { io } from "socket.io-client";
import { sendComment, showComments, showNewComments } from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("sendComment", (comments) =>
            store.dispatch(sendComment(comments))
        );

        socket.on("showComments", (com) => store.dispatch(showComments(com)));

        socket.on("showNewComments", (com) =>
            store.dispatch(showNewComments(com))
        );
    }
};
