CREATE TABLE reactions (
    id uuid DEFAULT uuid_generate_v4(),
    likes INTEGER,
    comments text,
    shares INTEGER,
    user_id uuid,
    FOREIGN KEY (user_id) REFERENCES person(id)
);