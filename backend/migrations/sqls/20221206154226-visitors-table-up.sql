CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS visitors (
    visit_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    visitor_id uuid NOT NULL,
    profile_id uuid NOT NULL,
    timedate VARCHAR(255) NOT NULL,
    FOREIGN KEY (visitor_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (profile_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);