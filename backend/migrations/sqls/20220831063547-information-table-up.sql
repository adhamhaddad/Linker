CREATE TABLE information (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    fname VARCHAR(255),
    lname VARCHAR(255),
    phone VARCHAR UNIQUE,
    birthday Date,
    work VARCHAR(255),
    relation VARCHAR(255),
    education VARCHAR(255),
    lives VARCHAR(255),
    story text,
    user_id uuid,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);