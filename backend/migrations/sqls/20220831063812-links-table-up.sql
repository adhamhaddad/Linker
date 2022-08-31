CREATE TABLE links (
    id uuid DEFAULT uuid_generate_v4(),
    facebook VARCHAR(255),
    instagram VARCHAR(255),
    whatsapp VARCHAR(255),
    twitter VARCHAR(255),
    linkedin VARCHAR(255),
    telegram VARCHAR(255),
    info_id uuid,
    FOREIGN KEY (info_id) REFERENCES information(id) ON DELETE CASCADE ON UPDATE CASCADE
);