CREATE TABLE reactions (
    id SERIAL PRIMARY KEY,
    likes INTEGER,
    comments VARCHAR(255),
    shares INTEGER
);