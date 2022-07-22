CREATE TABLE Person (
    id SERIAL PRIMARY KEY,
    fname VARCHAR(255),
    lname VARCHAR(255),
    gender VARCHAR(255),
    birthdate VARCHAR(255),
    username VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    passwd VARCHAR(255),
    joined VARCHAR(255)
);

CREATE TABLE Informations (
    id SERIAL PRIMARY KEY,
    work VARCHAR(255),
    relation VARCHAR(255),
    education VARCHAR(255),
    lives VARCHAR(255)
);

CREATE TABLE Posts (
    id SERIAL PRIMARY KEY,
    timedate VARCHAR(255),
    content VARCHAR(255)
);

CREATE TABLE Reactions (
    id SERIAL PRIMARY KEY,
    likes INTEGER,
    comments VARCHAR(255),
    shares INTEGER
);