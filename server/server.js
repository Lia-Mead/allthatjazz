const express = require("express");
const app = express();
const server = require("http").Server(app);

const io = require("socket.io")(server, {
    origins: "localhost:3000 https://epic-time.herokuapp.com/:*",
});

const compression = require("compression");
const path = require("path");
const db = require("./db");
const { hash, compare } = require("./bc");
const csurf = require("csurf");
const { sendEmail } = require("./ses");
const cookieSession = require("cookie-session");
const cryptoRandomString = require("crypto-random-string");
const { uploader } = require("./upload");
const s3 = require("./s3");
const config = require("./config");

let cookie_sec;

if (process.env.sessionSecret) {
    cookie_sec = process.env.sessionSecret;
} else {
    cookie_sec = require("../secrets").sessionSecret;
}

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(express.json());

const cookieSessionMW = cookieSession({
    maxAge: 1000 * 60 * 24 * 14,
    secret: cookie_sec,
});

app.use(cookieSessionMW);
io.use(function (socket, next) {
    // console.log("socket.request.url", socket.request.url);
    cookieSessionMW(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function (req, res, next) {
    // console.log("token: ", req.csrfToken);
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.get("/welcome", function (req, res) {
    if (req.session.UserId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post("/registration", async (req, res) => {
    const { first, last, email, password } = req.body;
    if (first && last && email && password) {
        try {
            const hashedPw = await hash(password);
            const results = await db.insertUserData(
                first,
                last,
                email,
                hashedPw
            );
            req.session.userId = results.rows[0].id;
            res.json({ success: true });
        } catch (err) {
            console.log("err in POST registration", err);
            res.json({ success: false });
        }
    } else {
        res.json({ success: false });
        // please fill out all fields error
    }
});

app.post("/login", function (req, res) {
    // console.log("log in");
    const { email, password } = req.body;
    db.getLoginData(email)
        .then(({ rows }) => {
            // console.log("rows in login ", rows);
            const hashedPw = rows[0].password;
            compare(password, hashedPw)
                .then((match) => {
                    if (match) {
                        req.session.userId = rows[0].id;
                        req.session.loggedIn = rows[0].id;
                        res.json({ success: true });
                    } else {
                        res.json({ success: false });
                    }
                })
                .catch((err) => {
                    console.log("err in compare", err);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("err in login data", err);
            res.json({ success: false });
        });
});

app.post("/password/reset/start", (req, res) => {
    const { email } = req.body;

    db.getLoginData(email)
        .then(({ rows }) => {
            // console.log("rows in login ", rows);
            const secretCode = cryptoRandomString({
                length: 6,
            });
            const emailDb = rows[0].email;
            if (req.body.email === emailDb) {
                db.saveCode(email, secretCode)
                    .then(() => {
                        console.log("email was sent");
                        sendEmail(
                            email,
                            secretCode,
                            "Here is your reset password code"
                        )
                            .then(() => {
                                res.json({ success: true });
                            })
                            .catch((err) => {
                                console.log(err, "error in sendEmail");
                                res.json({ success: false });
                            });
                    })
                    .catch((err) => {
                        console.log("error in reset password", err);
                        res.json({ success: false });
                    });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("err in login data", err);
            res.json({ success: false });
        });
});

app.post("/password/reset/verify", (req, res) => {
    console.log("I am the /password/reset/verify route");
    const { code, password } = req.body;
    db.verifyCode(code)
        .then(({ rows }) => {
            const emailCode = rows[0].email;
            // const codeDB = rows[0].code;
            let currentCode = rows.find((row) => {
                return row.code === req.body.code;
            });
            if (currentCode) {
                hash(password)
                    .then((hashedPw) => {
                        db.updatePassword(emailCode, hashedPw)
                            .then(() => {
                                // console.log("rows: ", rows);
                                res.json({ success: true });
                            })
                            .catch((err) => {
                                console.log("error in insert user data", err);
                                res.json({ success: false });
                            });
                    })
                    .catch((err) => {
                        console.log("error in hashing pass: ", err);
                    });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("There was an error with verifying code: ", err);
        });
});

app.get("/api/user", (req, res) => {
    // console.log("req.session.userId", req.session.userId);
    db.getProfile(req.session.userId)
        .then(({ rows }) => {
            // console.log("get user rows in 0", rows[0]);
            res.json({ success: true, rows: rows[0] });
        })
        .catch((err) => {
            console.log(err, "error in getProfile");
            res.json({ success: false });
        });
});

app.post("/edit-profile", (req, res) => {
    // console.log("edit post made");
    let { first, last, email, pass } = req.body;

    if (pass) {
        hash(pass)
            .then((hashedPw) => {
                db.insProfUpdateWithPass(
                    req.session.userId,
                    first,
                    last,
                    email,
                    hashedPw
                )
                    .then(({ rows }) => {
                        console.log("display changes with PW");
                        res.json({ success: true, rows: rows });
                    })
                    .catch((err) => {
                        console.log("error in insProfUpdateWithPass", err);
                    });
            })
            .catch((err) => {
                console.log("error in hashing", err);
            });
    } else {
        db.insProfUpdateNoPass(req.session.userId, first, last, email)
            .then(({ rows }) => {
                console.log("display changes without password change");
                res.json({ success: true, rows: rows });
            })
            .catch((err) => {
                console.log("error in insProfUpdateWithoutPass", err);
            });
    }
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

app.get("/404", (req, res) => {
    res.json({ notFound: true });
});

//// LEAVE WHERE IT IS

app.get("*", (req, res) => {
    if (!req.session.userId && req.url != "/welcome") {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

io.on("connection", async (socket) => {
    // // console.log("socket", socket);
    // const { userId } = socket.request.session;
    // // const { chat } = req.body;
    // // console.log("userId connection socket: ", userId);
    // if (!userId) {
    //     return socket.disconnect(true);
    // }
    // socket.on("chatMessage", async (text) => {
    //     try {
    //         await db.addMessage(userId, text);
    //         const newMessage = await db.showNewMessages();
    //         io.emit("newMessage", newMessage.rows[0]);
    //     } catch (err) {
    //         console.log(err, "error in chatMessage");
    //     }
    // });
    // try {
    //     const messages = await db.showMessages();
    //     io.emit("chatMessages", messages.rows.reverse());
    // } catch (err) {
    //     console.log(err, "error in chatMessage");
    // }
});
