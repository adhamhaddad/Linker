CREATE TABLE messages (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    time VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    user_id uuid,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);