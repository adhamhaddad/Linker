CREATE TABLE photos (
    id uuid DEFAULT uuid_generate_v4(),
    cover text,
    profile text,
    info_id uuid,
    FOREIGN KEY (info_id) REFERENCES information(id) ON DELETE CASCADE ON UPDATE CASCADE
);