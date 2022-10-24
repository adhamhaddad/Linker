CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS comment_likes (
    like_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    comment_id uuid,
    user_id uuid,
    timedate text NOT NULL,
    FOREIGN KEY (comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);