CREATE TABLE photos (
    id SERIAL PRIMARY KEY,
    cover text,
    profile text,
    user_id BIGINT REFERENCES person(id)
);