CREATE TABLE Messages (
    message_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    timedate text NOT NULL,
    content TEXT NOT NULL,
    user_id uuid,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);