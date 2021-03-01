const spicedPg = require("spiced-pg");

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbUsername, dbPass } = require("../secrets.json");
    db = spicedPg(`postgres:${dbUsername}:${dbPass}@localhost:5432/jazz`);
}

module.exports.insertUserData = (first, last, email, hashedPw) => {
    const q = `INSERT INTO users (first, last, email, password)
    VALUES ($1, $2, $3, $4) RETURNING *`;
    const params = [first, last, email, hashedPw];
    return db.query(q, params);
};

module.exports.getLoginData = (email) => {
    const q = `SELECT users.email, users.id, users.password
    FROM users
    WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.saveCode = (email, code) => {
    const q = `INSERT INTO reset_codes (email, code)
    VALUES ($1, $2) RETURNING *`;
    const params = [email, code];
    return db.query(q, params);
};

module.exports.verifyCode = () => {
    const q = `SELECT * FROM reset_codes
    WHERE CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes'`;
    return db.query(q);
};

module.exports.updatePassword = (email, hashedPw) => {
    const q = `UPDATE users
    SET password = $2
    WHERE email = $1`;
    const params = [email, hashedPw];
    return db.query(q, params);
};

module.exports.getProfile = (id) => {
    const q = `SELECT id, first, last, image, email FROM users
    WHERE id = $1`;
    const params = [id];
    return db.query(q, params);
};

module.exports.insProfUpdateWithPass = (
    userId,
    first,
    last,
    email,
    password
) => {
    const q = `UPDATE users
    SET first = $2, last = $3, email = $4, password = $5
    WHERE id = $1`;
    const params = [userId, first, last, email, password];
    return db.query(q, params);
};

module.exports.insProfUpdateNoPass = (userId, first, last, email) => {
    const q = `UPDATE users
    SET first = $2, last = $3, email = $4
    WHERE id = $1`;
    const params = [userId, first, last, email];
    return db.query(q, params);
};

module.exports.insertPic = (id, profilePic) => {
    const q = `UPDATE users
    SET image = $2
    WHERE id = $1 RETURNING image`;
    const params = [id, profilePic];
    return db.query(q, params);
};

module.exports.insertPic = (id, profilePic) => {
    const q = `UPDATE users
    SET image = $2
    WHERE id = $1 RETURNING image`;
    const params = [id, profilePic];
    return db.query(q, params);
};

module.exports.addVenue = (userId, name, description, image, lat, lng) => {
    const q = `INSERT INTO venues (user_id, name, description, image, lat, lng)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const params = [userId, name, description, image, lat, lng];
    return db.query(q, params);
};

module.exports.addVenueNoPic = (userId, name, description, lat, lng) => {
    const q = `INSERT INTO venues (user_id, name, description, lat, lng)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const params = [userId, name, description, lat, lng];
    return db.query(q, params);
};

module.exports.showVenue = (id) => {
    const q = `SELECT * FROM venues WHERE id = $1`;
    const params = [id];
    return db.query(q, params);
};

module.exports.showAllVenues = () => {
    const q = `SELECT * FROM venues ORDER BY id DESC`;
    return db.query(q);
};

module.exports.threeVens = () => {
    const q = `SELECT * FROM venues ORDER BY id DESC LIMIT 3`;
    return db.query(q);
};

module.exports.addComment = (userId, venue_id, comment) => {
    const q = `INSERT INTO comments (user_id, venue_id, comment)
    VALUES ($1, $2, $3) RETURNING *`;
    const params = [userId, venue_id, comment];
    return db.query(q, params);
};

module.exports.showComments = () => {
    const q = `SELECT comments.id, comments.user_id, comments.venue_id, comments.comment, comments.created_at, users.first, users.last, users.image
    FROM comments
    JOIN users
    ON (user_id = users.id)
    ORDER BY comments.id DESC`;
    return db.query(q);
};

module.exports.showNewComments = () => {
    const q = `SELECT comments.id, comments.user_id, comments.venue_id, comments.comment, comments.created_at, users.first, users.last, users.image
    FROM comments
    JOIN users
    ON (user_id = users.id)
    ORDER BY comments.id DESC LIMIT 10`;
    return db.query(q);
};
