CREATE TABLE messages (
    id uuid DEFAULT uuid_generate_v4(),
    time TEXT NOT NULL,
    message TEXT NOT NULL,
    user_id uuid,
    FOREIGN KEY (user_id) REFERENCES person(id)
);