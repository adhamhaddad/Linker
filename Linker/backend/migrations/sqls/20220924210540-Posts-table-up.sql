CREATE TABLE Posts (
    post_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    timedate text NOT NULL,
    caption text,
    img text,
    video text,
    user_id uuid,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);