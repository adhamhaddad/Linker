CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS Information (
    info_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid,
    fname VARCHAR(255),
    lname VARCHAR(255),
    phone VARCHAR(50) UNIQUE,
    profile text,
    birthday text,
    work text,
    relation VARCHAR(100),
    education VARCHAR(255),
    lives VARCHAR(255),
    story text,
    twitter VARCHAR(255),
    linkedin VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);