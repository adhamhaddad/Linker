CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS Posts (
    post_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid,
    timedate text NOT NULL,
    caption text,
    img text,
    video text,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);