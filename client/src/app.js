import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./header";
import axios from "./Axios";
import Profile from "./profile";

export default function App(props) {
    console.log("props in app", props);
    const [id, setId] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [pic, setPic] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get("/api/user")
            .then((resp) => {
                console.log("axios api-user");
                setId(resp.data.rows.id);
                setFirst(resp.data.rows.first);
                setLast(resp.data.rows.last);
                setPic(resp.data.rows.pic);
                setEmail(resp.data.rows.email);
                setError(false);
            })
            .catch((err) => {
                console.log("error in POST componentDidMount", err);
            });
    });

    return (
        <BrowserRouter>
            <div className="app">
                <Header
                    pic={pic}
                    toggleUploader={() => this.toggleUploader()}
                    size="small"
                />

                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                id={id}
                                first={first}
                                last={last}
                                email={email}
                                pic={pic}
                            />
                        )}
                    />
                </Switch>
            </div>
        </BrowserRouter>
    );
}
