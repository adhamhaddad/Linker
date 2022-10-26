CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS messages (
    message_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    timedate text NOT NULL,
    sender_id uuid,
    receiver_id uuid,
    content text NOT NULL,
    isSeen BIT NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);