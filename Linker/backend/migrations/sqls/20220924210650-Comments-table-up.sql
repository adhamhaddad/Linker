CREATE TABLE Comments (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    timedate text NOT NULL,
    username VARCHAR(255),
    comment text,
    user_id uuid,
    post_id uuid,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE ON UPDATE CASCADE
);