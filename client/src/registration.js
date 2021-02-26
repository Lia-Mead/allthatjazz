import React from "react";
import axios from "./Axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state", this.state)
        );
    }

    handleClick() {
        axios
            .post("/registration", this.state)
            .then((resp) => {
                if (!resp.data.success) {
                    this.setState({
                        error: true,
                    });
                } else {
                    location.replace("/");
                }
            })
            .catch((err) => {
                console.log("err in registration: ", err);
            });
    }

    render() {
        return (
            <div className="center-box">
                <div className="reg-form">
                    <h2>Registration</h2>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="first"
                        type="text"
                        placeholder="First Name"
                        autoComplete="off"
                    ></input>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="last"
                        type="text"
                        placeholder="Last Name"
                        autoComplete="off"
                    ></input>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="off"
                    ></input>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="off"
                    ></input>
                    <button className="btn" onClick={() => this.handleClick()}>
                        Submit
                    </button>

                    {this.state.error && (
                        <p className="error">
                            Oops, something went wrong.Please fill all the
                            fields.
                        </p>
                    )}
                    <p>
                        Already have an account?
                        <Link to="/login"> Click here </Link> to Log in
                    </p>
                </div>
            </div>
        );
    }
}
