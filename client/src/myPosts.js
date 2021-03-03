import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allMyPosts } from "./actions";
import { Link } from "react-router-dom";

export default function MyPosts() {
    const dispatch = useDispatch();

    const showAllMine = useSelector(
        (state) =>
            state.allMyPosts && state.allMyPosts.filter((post) => post.id)
    );

    useEffect(() => {
        dispatch(allMyPosts());
    }, []);

    if (!showAllMine) {
        return null;
    }

    return (
        <>
            <h1>My Pinned Venues</h1>

            <div className="container">
                <div className="flex">
                    {showAllMine.length === 0 && (
                        <h3>I have not posted anything yet</h3>
                    )}

                    {showAllMine &&
                        showAllMine.map((post) => (
                            <div key={post.id}>
                                <div className="ven-con">
                                    <img
                                        className="ven-icon"
                                        src="/images/pin.svg"
                                    />
                                    <div className="ven-text">
                                        <h2>{post.name}</h2>
                                        <p className="gray">
                                            Added on{" "}
                                            {post.created_at
                                                .slice(0, 16)
                                                .replace("T", " at ")}
                                        </p>
                                        <p>{post.description}</p>
                                    </div>

                                    <Link to={`/venues/${post.id}`}>
                                        <div className="ven-pic">
                                            <img
                                                src={
                                                    post.image ||
                                                    "/images/ven-avatar.jpg"
                                                }
                                            />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
