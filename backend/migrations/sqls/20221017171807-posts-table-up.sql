CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS posts (
    post_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid,
    timedate text,
    post_caption text,
    post_img text,
    post_video text,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);