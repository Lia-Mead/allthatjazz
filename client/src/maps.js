import { useState, useEffect, useRef, useCallback } from "react";
import axios from "./Axios";

import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

import AddVenue from "./addVenue";

const containerStyle = {
    width: "100vw",
    height: "400px",
};

function Maps() {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: apiKey,
    });

    const [location, setLocation] = useState(0);
    const [pinLocation, setPinLocation] = useState([]);
    const [userLat, setUserLat] = useState(0);
    const [userLng, setUserLng] = useState(0);
    // const [newLocation, setNewLocation] = useState({});
    const [markers, setMarkers] = useState(false);
    // const [createdLoc, setCreatedLoc] = useState(false);

    const [map, setMap] = React.useState(null);

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const onMapMount = useCallback((map) => {
        mapRef.current = map;
    }, []);

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

    const addMarker = (e) => {
        setPinLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
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

    const userLocation = {
        lat: userLat,
        lng: userLng,
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
                />
                {newVen && (
                    <AddVenue
                        togglePopup={togglePopup}
                        pinLocation={pinLocation}
                    />
                )}
            </>
        </GoogleMap>
    ) : (
        <></>
    );
}

// <Locate panTo={pinLocation} />;
// {
//     pinLocation && <Marker position={{ lat: lat, lng: lng }} />;
// }
// return isLoaded ? (
//     <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={userPos}
//         zoom={10}
//         onLoad={onLoad}
//         onUnmount={onUnmount}
//     >
//         {/* Child components, such as markers, info windows, etc. */}
//         <>
//             <Marker onLoad={loadMark} venPos={venPos} />
//         </>
//     </GoogleMap>
// ) : (
//     <></>
// );
// }

export default React.memo(Maps);

//  <Marker onLoad={onLoad} position={position} />;

//    <Marker
//        {...marker}
//        onRightClick={() => props.onMarkerRightClick(marker)}
//    />;

//   ref={(map) => {
//                 if (map && lat && lng) {
//                     console.log(bounds);
//                     const bounds = new google.maps.LatLngBounds({ lat, lng });
//                     //map.fitBounds(bounds);
//                     map.panTo({ lat, lng });
//                 }
//             }}
