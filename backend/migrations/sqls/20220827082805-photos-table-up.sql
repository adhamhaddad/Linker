CREATE TABLE photos (
    id uuid DEFAULT uuid_generate_v4(),
    cover text,
    profile text,
    user_id uuid,
    FOREIGN KEY (user_id) REFERENCES person(id)
);