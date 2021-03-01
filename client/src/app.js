import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "./Axios";
import Home from "./home";
import Header from "./header";
import Profile from "./profile";
import Maps from "./maps";
import AddVenue from "./addVenue";
import AllVenues from "./allVenues";
// import Venue from "./venue";
import NewVenues from "./newVenues";

export default function App() {
    // console.log("props in app", props);
    const [id, setId] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [pic, setPic] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);

    const [venId, setVenId] = useState("");
    const [venName, setVenName] = useState("");
    const [venImage, setVenImage] = useState("");
    const [venDescription, setVenDescription] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");

    const updateProfileData = (info) => {
        // console.log(info);
        setId(info.id);
        setFirst(info.first);
        setLast(info.last);
        setEmail(info.email);
    };

    const updateNewVen = (info) => {
        // console.log(info);
        setLat(info.lat);
        setLng(info.lng);
        setVenId(info.id);
        setVenName(info.name);
        setVenDescription(info.description);
    };

    const setProfilePicUrl = (image) => {
        setPic(image);
    };

    useEffect(() => {
        axios
            .get("/api/user")
            .then((resp) => {
                // console.log("axios api-user", resp);
                // console.log("resp.data.rows.id", resp.data.rows.id);
                setId(resp.data.rows.id);
                setFirst(resp.data.rows.first);
                setLast(resp.data.rows.last);
                setPic(resp.data.rows.image);
                setEmail(resp.data.rows.email);
                setError(false);
            })
            .catch((err) => {
                console.log("error in get use effect api/user", err);
            });

        axios
            .get("/api/all-venues")
            .then((resp) => {
                // console.log("axios all venues", resp);
                // console.log("lat", resp.data.rows.name);
                // console.log("rows in all venues app", resp.data.rows);

                setVenId(resp.data.rows[0].id);
                setVenName(resp.data.rows[0].name);
                setVenImage(resp.data.rows[0].image);
                setVenDescription(resp.data.rows[0].description);
                setLat(resp.data.rows[0].lat);
                setLng(resp.data.rows[0].lng);
                setError(false);
            })
            .catch((err) => {
                console.log("error in get use effect api/all-venues", err);
            });

        // create another axios
    });

    return (
        <BrowserRouter>
            <div className="app">
                <Header pic={pic} size="small" />

                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Home
                                id={id}
                                first={first}
                                last={last}
                                email={email}
                                pic={pic}
                                updateProfileData={updateProfileData}
                                setProfilePicUrl={setProfilePicUrl}
                                updateNewVen={updateNewVen}
                                venId={venId}
                                venName={venName}
                                lat={lat}
                                lng={lng}
                                venDescription={venDescription}
                            />
                        )}
                    />
                    <Route
                        path="/map"
                        render={() => (
                            <Maps
                                id={id}
                                first={first}
                                last={last}
                                email={email}
                                pic={pic}
                                updateProfileData={updateProfileData}
                                setProfilePicUrl={setProfilePicUrl}
                                updateNewVen={updateNewVen}
                                venId={venId}
                                venName={venName}
                                lat={lat}
                                lng={lng}
                                venDescription={venDescription}
                            />
                        )}
                    />
                    <Route
                        path="/profile"
                        render={() => (
                            <Profile
                                id={id}
                                first={first}
                                last={last}
                                email={email}
                                pic={pic}
                                updateProfileData={updateProfileData}
                                setProfilePicUrl={setProfilePicUrl}
                            />
                        )}
                    />
                    <Route
                        path="/venues"
                        render={() => (
                            <AllVenues
                                venId={venId}
                                venName={venName}
                                venDescription={venDescription}
                                venImage={venImage}
                                updateNewVen={updateNewVen}
                            />
                        )}
                    />
                    <Route
                        path="/new-vens"
                        render={() => (
                            <NewVenues
                                venId={venId}
                                venName={venName}
                                venDescription={venDescription}
                                venImage={venImage}
                                updateNewVen={updateNewVen}
                            />
                        )}
                    />

                    <Route path="/upload-venue" render={() => <AddVenue />} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}
