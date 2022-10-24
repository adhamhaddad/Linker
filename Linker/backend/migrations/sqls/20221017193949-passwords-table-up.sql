CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS passwords (
    pass_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid,
    old_password TEXT,
    current_password TEXT NOT NULL,
    changed TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);