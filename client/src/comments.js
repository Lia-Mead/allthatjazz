import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";

export default function Comments(props) {
    // console.log("props.id in comments", props.id);
    const inputRef = useRef("");
    let scrollRef = useRef();

    const commentsPerPost = useSelector(
        (state) =>
            state.comments &&
            state.comments.filter(
                (comment) => comment.venue_id == props.venueId
            )
    );

    const messageHandleChange = (e) => {
        // console.log("e.target.value", e.target.value);
        inputRef.current.value = e.target.value;
    };

    const scrollToBottom = () => {
        scrollRef.current.scrollTop =
            scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
    };

    useEffect(() => {
        scrollToBottom();
    });

    const enterSend = (e) => {
        if (e.keyCode === 13) {
            newComment();
            e.preventDefault();
        }
    };

    const newComment = () => {
        if (inputRef.current.value != 0) {
            socket.emit("sendComment", {
                venueId: props.venueId,
                text: inputRef.current.value,
            });
            inputRef.current.value = "";
        }
    };

    return (
        <div className="comments">
            <p className="handwrite">Spread your love</p>

            <div className="comments-display" ref={scrollRef}>
                {commentsPerPost &&
                    commentsPerPost.map((com) => (
                        <div
                            className={
                                com.user_id == props.id
                                    ? "comment my"
                                    : "comment"
                            }
                            key={com.id}
                        >
                            <div className="comment-user">
                                <img
                                    className="pro-pic small"
                                    src={com.image || "/images/avatar.svg"}
                                />
                                <div className="comment">
                                    <p className="gray">
                                        {com.first} {com.last} on{" "}
                                        {com.created_at
                                            .slice(0, 16)
                                            .replace("T", " at ")}
                                    </p>
                                    <p>{com.comment}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            <textarea
                name="comment"
                placeholder="Type your review"
                className="text-area"
                onChange={(e) => messageHandleChange(e)}
                onKeyDown={(e) => enterSend(e)}
                ref={inputRef}
            />
            <button onClick={() => newComment()} className="btn upload">
                Send
            </button>
        </div>
    );
}

// <h1>Comments</h1>;
