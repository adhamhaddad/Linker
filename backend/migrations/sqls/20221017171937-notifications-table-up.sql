CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS notifications (
    notification_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid,
    timedate text NOT NULL,
    caption text NOT NULL,
    isSeen BIT NOT NULL
);