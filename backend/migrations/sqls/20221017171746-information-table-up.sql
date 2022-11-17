CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS information (
    info_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid,
    job_title text,
    education text,
    relationship VARCHAR(50),
    location VARCHAR(255),
    story text,
    birthday text,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);