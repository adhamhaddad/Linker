CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS friends (
    friend_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    sender_id uuid,
    receiver_id uuid,
    timedate text NOT NULL,
    isFriend BIT,
    FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);