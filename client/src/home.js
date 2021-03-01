import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "./Axios";
// import { Link } from "react-router-dom";
import Maps from "./maps";
import NewVenues from "./newVenues";

import { useSelector, useDispatch } from "react-redux";
import { showAllVenues } from "./actions";

export default function Home(props) {
    // console.log("props in maps: ", props);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showAllVenues());
    }, []);

    return (
        <>
            <h1>
                <span className="orange">Welcome</span>
                <span>
                    {" "}
                    {props.first} {props.last}
                </span>
            </h1>
            <p className="handwrite">and all that jazz</p>

            <Maps updateNewVen={props.updateNewVen} />
            <NewVenues />
        </>
    );
}
