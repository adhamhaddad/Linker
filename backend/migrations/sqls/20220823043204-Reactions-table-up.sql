CREATE TABLE reactions (
    id SERIAL PRIMARY KEY,
    likes INTEGER,
    comments text,
    shares INTEGER,
    user_id BIGINT REFERENCES person(id)
);