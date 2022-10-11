CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE friends (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid,
    friend_id TEXT NOT NULL,
    timedate TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);