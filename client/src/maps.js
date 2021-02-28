import { useState, useEffect, useRef, useCallback } from "react";
import axios from "./Axios";
// import { Link } from "react-router-dom";
import NewVenues from "./newVenues";
import Venue from "./Venue";

import { useSelector, useDispatch } from "react-redux";
import { showAllVenues } from "./actions";

import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

import AddVenue from "./addVenue";

const containerStyle = {
    width: "100vw",
    height: "400px",
};

function Maps(props) {
    // console.log("props in maps: ", props);
    const dispatch = useDispatch();

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: apiKey,
    });

    // const [location, setLocation] = useState(0);
    const [pinLocation, setPinLocation] = useState([]);
    const [userLat, setUserLat] = useState(0);
    const [userLng, setUserLng] = useState(0);
    // const [newLocation, setNewLocation] = useState({});
    const [markers, setMarkers] = useState([]);

    const [selected, setSelected] = useState({});

    const [map, setMap] = React.useState(null);

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const onMapMount = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const all = useSelector(
        (state) =>
            state.allVenues && state.allVenues.filter((venue) => venue.id)
    );

    // console.log("all", all);

    // const onLoad = React.useCallback(function callback(map) {
    //     const bounds = new window.google.maps.LatLngBounds();
    //     map.fitBounds(bounds);
    //     setMap(map);
    // }, []);

    // const onUnmount = React.useCallback(function callback(map) {
    //     setMap(null);
    // }, []);

    const [newVen, setNewVen] = useState(false);
    const togglePopup = () => {
        setNewVen(!newVen);
    };

    const [active, setActive] = useState(false);
    const toggleVen = () => {
        setActive(!active);
    };

    const addMarker = (e) => {
        setPinLocation({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            // creator: props.id,
        });
        togglePopup();
    };

    const loadMarker = (marker) => {
        console.log("marker: ", marker);
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    setUserLat(position.coords.latitude);
                    setUserLng(position.coords.longitude);
                },
                (err) => console.log(err),
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 10000,
                }
            );
        } else {
            alert("This browswer doesn't support your location,");
        }
    }, []);

    useEffect(() => {
        dispatch(showAllVenues());
    }, []);

    const userLocation = {
        lat: userLat,
        lng: userLng,
    };

    const venPin = (marker) => {
        console.log("marker: ", marker);
        setSelected({
            id: marker.id,
            user_id: marker.user_id,
            name: marker.name,
            description: marker.description,
            img: marker.image,
            lat: marker.lat,
            lng: marker.lng,
            created: marker.created_at,
        });

        toggleVen();
    };

    // function Locate({ panTo }) {
    //     return (
    //         <button
    //             className=""
    //             onClick={() => {
    //                 panTo({
    //                     lat: location.pinLocation.lat,
    //                     lng: location.pinLocation.lng,
    //                 });
    //             }}
    //         >
    //             <img src="/images/pin.svg" alt="" />
    //         </button>
    //     );
    // }

    return isLoaded ? (
        <>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={userLocation}
                zoom={15}
                onUnmount={onMapMount}
                onLoad={onMapLoad}
                onClick={(e) => addMarker(e)}
            >
                {/* Child components, such as markers, info windows, etc. */}
                <>
                    <Marker
                        onLoad={loadMarker}
                        position={{
                            lat: parseFloat(pinLocation.lat),
                            lng: parseFloat(pinLocation.lng),
                        }}
                        icon={{
                            url: "/images/pin-new.svg",
                            scaledSize: new window.google.maps.Size(30, 30),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15),
                        }}
                    />

                    {all &&
                        all.map((marker) => (
                            <Marker
                                key={marker.id}
                                position={{
                                    lat: parseFloat(marker.lat),
                                    lng: parseFloat(marker.lng),
                                }}
                                icon={{
                                    url: "/images/pin.svg",
                                    scaledSize: new window.google.maps.Size(
                                        30,
                                        30
                                    ),
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(
                                        15,
                                        15
                                    ),
                                }}
                                onClick={() => venPin(marker)}
                            />
                        ))}

                    {newVen && (
                        <AddVenue
                            togglePopup={togglePopup}
                            pinLocation={pinLocation}
                            updateNewVen={props.updateNewVen}
                        />
                    )}

                    {active && (
                        <div className="overlay">
                            <div className="add-venue">
                                <>
                                    <img
                                        onClick={toggleVen}
                                        className="icon-close"
                                        src="/images/close.svg"
                                    />
                                    <h1>{selected.name}</h1>
                                    <p>{selected.description}</p>

                                    <img
                                        className="venue-pic"
                                        src={
                                            selected.img ||
                                            "/images/ven-avatar.jpg"
                                        }
                                    />
                                </>
                            </div>
                        </div>
                    )}
                </>
            </GoogleMap>
        </>
    ) : (
        <></>
    );
}

export default React.memo(Maps);

//    icon={{
//                             url: "/surfspot2.png",
//                             scaledSize: new window.google.maps.Size(30, 30),
//                             origin: new window.google.maps.Point(0, 0),
//                             anchor: new window.google.maps.Point(15, 15),
//                         }}

// <Marker
//     onLoad={loadMarker}
//     position={{
//         lat: parseFloat(52.58811588459525),
//         lng: parseFloat(13.27429442962495),
//     }}
// />;

// <NewVenues />;
