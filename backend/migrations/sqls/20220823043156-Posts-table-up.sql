CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    timedate Date NOT NULL,
    content text,
    user_id BIGINT REFERENCES person(id)
);