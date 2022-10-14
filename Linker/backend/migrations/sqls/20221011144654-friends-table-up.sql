CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS friends (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid,
    friend_id uuid,
    timedate TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);