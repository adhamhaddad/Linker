CREATE TABLE posts (
    id uuid DEFAULT uuid_generate_v4(),
    timedate VARCHAR(255) NOT NULL,
    content text NOT NULL,
    user_id uuid,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);