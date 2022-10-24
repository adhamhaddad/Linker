CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS reply_likes (
    like_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    reply_id uuid,
    user_id uuid,
    timedate text NOT NULL,
    FOREIGN KEY (reply_id) REFERENCES comment_replies(reply_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);