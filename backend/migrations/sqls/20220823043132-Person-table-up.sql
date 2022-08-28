CREATE TABLE person (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    joined VARCHAR(255) NOT NULL
);