CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS comments (
    comment_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    post_id uuid,
    user_id uuid,
    timedate text NOT NULL,
    comment_caption text,
    comment_img text,
    comment_video text,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);