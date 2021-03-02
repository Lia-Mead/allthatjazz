import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import StarRatings from "react-star-ratings";
import { addRating, receiveRatings } from "./actions";

// import axios from "./Axios";

export default function Ratings() {
    const dispatch = useDispatch();

    // const receiveRatings = useSelector(
    //     (state) =>
    //         state.allReviews && state.allReviews.filter((venue) => venue.id)
    // );

    useEffect(() => {
        dispatch(receiveRatings());
    }, []);
    const [rating, setRating] = useState();

    const changeRating = (newRating) => {
        setRating(newRating);
    };

    // const changeRating = (rating) => {
    //     setRating(rating);
    // };

    // useDispatch(addRating());

    return (
        <div className="ratings">
            <StarRatings
                rating={rating}
                starRatedColor="#f9815b"
                changeRating={changeRating}
                isSelectable={true}
                numberOfStars={5}
                name="rating"
                starDimension="30px"
                starSpacing="10px"
                starHoverColor="#000000"
                svgIconViewBox="0 -28 512.00002 512"
                svgIconPath="m471.382812 44.578125c-26.503906-28.746094-62.871093-44.578125-102.410156-44.578125-29.554687 0-56.621094 9.34375-80.449218 27.769531-12.023438 9.300781-22.917969 20.679688-32.523438 33.960938-9.601562-13.277344-20.5-24.660157-32.527344-33.960938-23.824218-18.425781-50.890625-27.769531-80.445312-27.769531-39.539063 0-75.910156 15.832031-102.414063 44.578125-26.1875 28.410156-40.613281 67.222656-40.613281 109.292969 0 43.300781 16.136719 82.9375 50.78125 124.742187 30.992188 37.394531 75.535156 75.355469 127.117188 119.3125 17.613281 15.011719 37.578124 32.027344 58.308593 50.152344 5.476563 4.796875 12.503907 7.4375 19.792969 7.4375 7.285156 0 14.316406-2.640625 19.785156-7.429687 20.730469-18.128907 40.707032-35.152344 58.328125-50.171876 51.574219-43.949218 96.117188-81.90625 127.109375-119.304687 34.644532-41.800781 50.777344-81.4375 50.777344-124.742187 0-42.066407-14.425781-80.878907-40.617188-109.289063zm0 0"
                onClick={() => dispatch(addRating(rating))}
            />
        </div>
    );
}
