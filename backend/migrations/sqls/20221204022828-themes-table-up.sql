CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS themes (
    user_id uuid NOT NULL,
    profile_cover VARCHAR(50),
    home_color VARCHAR(50),
    header_color VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);