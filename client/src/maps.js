import { useState, useEffect, useRef, useCallback } from "react";
// import axios from "./Axios";
import { Link, Route } from "react-router-dom";
// import PlacesAutoComplete from "./placesAutoComplete";
// import mapstyle from "./mapstyle";

import { useSelector, useDispatch } from "react-redux";
import { showAllVenues } from "./actions";

import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

import AddVenue from "./addVenue";

const containerStyle = {
    width: "100vw",
    height: "500px",
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
    const [selected, setSelected] = useState({});
    // const [userId, setUserId] = useState();

    // const [markers, setMarkers] = useState([]);
    // const [map, setMap] = React.useState(null);

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    // const onMapMount = useCallback((map) => {
    //     mapRef.current = map;
    // }, []);

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

    const userLocation = {
        lat: userLat,
        lng: userLng,
    };

    let options = {
        // styles: mapStyle,
        disableDefaultUI: true,
        zoomControl: true,
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 5000,
    };

    let watchId;

    useEffect(() => {
        // console.log("i am use effect maps");
        // console.log("userLocation", userLocation);

        if (navigator.geolocation) {
            watchId = navigator.geolocation.watchPosition(
                (position) => {
                    setUserLat(position.coords.latitude);
                    setUserLng(position.coords.longitude);
                },
                (err) => console.log(err, "err useEffect maps"),
                {
                    enableHighAccuracy: false,
                    timeout: 10000,
                    maximumAge: 10000,
                }
            );
            return () => {
                console.log("running cleanup fn");
                navigator.geolocation.clearWatch(watchId);
            };
        } else {
            alert("This browser doesn't support your location,");
        }
    }, [userLat]);

    useEffect(() => {
        dispatch(showAllVenues());
    }, []);

    const venPin = (marker) => {
        // console.log("marker: ", marker);
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
            <section className="maps">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={userLocation}
                    zoom={12}
                    options={options}
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
                                        origin: new window.google.maps.Point(
                                            0,
                                            0
                                        ),
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
                                <div className="show-venue">
                                    <>
                                        <img
                                            onClick={toggleVen}
                                            className="icon-close"
                                            src="/images/close.svg"
                                        />
                                        <h2>{selected.name}</h2>

                                        <p>{selected.description}</p>

                                        <img
                                            className="popup-pic"
                                            src={
                                                selected.img ||
                                                "/images/ven-avatar.jpg"
                                            }
                                        />
                                        <Link
                                            to={`/venues/${selected.id}`}
                                            onClick={togglePopup}
                                        >
                                            <button className="btn upload">
                                                Go to Venue
                                            </button>
                                        </Link>
                                    </>
                                </div>
                            </div>
                        )}
                    </>
                </GoogleMap>
            </section>
        </>
    ) : (
        <></>
    );
}

export default React.memo(Maps);
