import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./header";
import axios from "./Axios";
import Profile from "./profile";
import Maps from "./maps";
import AddVenue from "./addVenue";
import Venue from "./venue";

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
    const [venDescription, setVenDescription] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");

    const updateProfileData = (info) => {
        // console.log(info);
        setFirst(info.first);
        setLast(info.last);
        setEmail(info.email);
    };

    const updateNewVen = (info) => {
        console.log(info);
        setLat(info.lat);
        setLng(info.lng);
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
                console.log("axios all venues", resp);
                console.log("lat", resp.data.rows.name);

                setVenId(resp.data.rows[0].id);
                setVenName(resp.data.rows[0].name);
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
                            <Maps
                                id={id}
                                first={first}
                                last={last}
                                email={email}
                                pic={pic}
                                updateProfileData={updateProfileData}
                                setProfilePicUrl={setProfilePicUrl}
                                updateNewVen={updateNewVen}
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

                    <Route path="/upload-venue" render={() => <AddVenue />} />

                    <Route
                        path="/venue/:id"
                        render={(props) => (
                            <Venue
                                key={props.match.url}
                                match={props.match} // must be passed down when we work with match
                                history={props.history}
                            />
                        )}
                    />
                </Switch>
            </div>
        </BrowserRouter>
    );
}
