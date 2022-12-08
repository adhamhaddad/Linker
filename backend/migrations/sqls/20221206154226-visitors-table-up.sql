CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS visitors (
    visitor_id uuid NOT NULL,
    profile_id uuid NOT NULL,
    timedate VARCHAR(255) NOT NULL,
    FOREIGN KEY (visitor_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (profile_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);