DROP TABLE IF EXISTS ratings;

CREATE TABLE ratings(
    id SERIAL PRIMARY KEY,
    rate INT DEFAULT NULL,
    venue_id INT REFERENCES venues(id) NOT NULL,
    user_id INT REFERENCES users(id) NOT NULL
);
