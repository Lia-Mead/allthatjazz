DROP TABLE IF EXISTS comments;

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    comment VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    venue_id INT REFERENCES venues(id) NOT NULL,
    user_id INT REFERENCES users(id) NOT NULL
);
