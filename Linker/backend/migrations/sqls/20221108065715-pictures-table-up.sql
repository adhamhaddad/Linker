CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS pictures (
    pic_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid,
    timedate TEXT NOT NULL,
    profile_picture TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);