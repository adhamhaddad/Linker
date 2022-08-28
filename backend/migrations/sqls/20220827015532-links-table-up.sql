CREATE TABLE links (
    id uuid DEFAULT uuid_generate_v4(),
    facebook VARCHAR(255),
    instagram VARCHAR(255),
    whatsapp VARCHAR(255),
    twitter VARCHAR(255),
    linkedin VARCHAR(255),
    telegram VARCHAR(255),
    user_id uuid,
    FOREIGN KEY (user_id) REFERENCES person(id)
);