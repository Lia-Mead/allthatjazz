import { useState } from "react";
import axios from "./Axios";

import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: "100vw",
    height: "400px",
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

function Maps() {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: apiKey,
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    const loadMark = (marker) => {
        console.log("marker: ", marker);
    };

    const position = {
        lat: 37.772,
        lng: -122.214,
    };

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {/* Child components, such as markers, info windows, etc. */}
            <>
                <Marker onLoad={loadMark} position={position} />
            </>
        </GoogleMap>
    ) : (
        <></>
    );
}

export default React.memo(Maps);

//  <Marker onLoad={onLoad} position={position} />;

//    <Marker
//        {...marker}
//        onRightClick={() => props.onMarkerRightClick(marker)}
//    />;
