CREATE TABLE posts (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    timedate text NOT NULL,
    content text NOT NULL,
    user_id uuid,
    FOREIGN KEY (user_id) REFERENCES person(id)
);