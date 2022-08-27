CREATE TABLE information (
    id SERIAL PRIMARY KEY,
    work VARCHAR(255),
    relation VARCHAR(255),
    education VARCHAR(255),
    lives VARCHAR(255),
    story text,
    user_id BIGINT REFERENCES person(id)
);