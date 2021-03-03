import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "./Axios";
import Home from "./home";
import Header from "./header";
import Profile from "./profile";
import AddVenue from "./addVenue";
import AllVenues from "./allVenues";
import Venue from "./venue";
import Ratings from "./ratings";
import Feed from "./feed";
import Footer from "./footer";
// import Maps from "./maps";
// import NewVenues from "./newVenues";

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

    const updateVenuePost = (info) => {
        // console.log(info);
        setId(info.id);
        setVenId(info.venId);
        setVenName(info.venName);
        setVenDescription(info.venDescription);
        setVenImage(info.venImage);
    };

    const updateNewVen = (info) => {
        console.log("info updateNewVen app:", info);
        setVenId(info.id);
        setLat(info.lat);
        setLng(info.lng);
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
                        path="/account"
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
                        exact
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
                        path="/venues/:id"
                        render={(props) => (
                            <Venue
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                                venId={venId}
                                togglePopup={props.togglePopup}
                                openVen={props.openVen}
                                updateVenuePost={updateVenuePost}
                                updateNewVen={updateNewVen}
                            />
                        )}
                    />

                    <Route
                        path="/ratings/:id"
                        render={(props) => (
                            <Ratings
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                                id={id}
                                venId={venId}
                            />
                        )}
                    />

                    <Route
                        exact
                        path="/feed"
                        render={(props) => (
                            <Feed id={props.id} venId={props.venId} />
                        )}
                    />

                    <Route path="/upload-venue" render={() => <AddVenue />} />
                </Switch>

                <Footer />
            </div>
        </BrowserRouter>
    );
}
