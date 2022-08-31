CREATE TABLE reactions (
    id uuid DEFAULT uuid_generate_v4(),
    likes text,
    comments text,
    shares text,
    post_id uuid,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE
);