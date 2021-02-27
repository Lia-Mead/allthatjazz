import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./resetPassword";
// import Logo from "./logo";

export default function Welcome() {
    return (
        <>
            <div className="welcome">
                <div className="intro">
                    <img
                        className="logo"
                        src="/logo-w.svg"
                        alt="all-that-jazz-logo"
                    />
                    <h1>Welcome</h1>
                    <h2>We Jazz</h2>
                </div>
                <HashRouter>
                    <>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                        <Route
                            path="/password/reset/start"
                            component={ResetPassword}
                        />
                    </>
                </HashRouter>
            </div>
        </>
    );
}
