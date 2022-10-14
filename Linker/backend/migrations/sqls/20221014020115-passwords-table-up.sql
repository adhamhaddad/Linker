CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS passwords (
    password_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    password text,
    history text,
    user_id uuid,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);