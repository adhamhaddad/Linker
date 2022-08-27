CREATE TABLE information (
    id SERIAL PRIMARY KEY,
    fname VARCHAR(255),
    lname VARCHAR(255),
    phone integer UNIQUE,
    birthday Date,
    work VARCHAR(255),
    relation VARCHAR(255),
    education VARCHAR(255),
    lives VARCHAR(255),
    story text,
    user_id BIGINT REFERENCES person(id)
);