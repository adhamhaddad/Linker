CREATE TABLE Users (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    joined text NOT NULL
);
DROP TABLE Users;

CREATE TABLE Information (
    info_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile text,
    fname VARCHAR(255),
    lname VARCHAR(255),
    phone VARCHAR(50) UNIQUE,
    birthday text,
    work VARCHAR(255),
    relation VARCHAR(100),
    education VARCHAR(255),
    lives VARCHAR(255),
    story text,
    facebook VARCHAR(255),
    instagram VARCHAR(255),
    whatsapp VARCHAR(255),
    twitter VARCHAR(255),
    linkedin VARCHAR(255),
    telegram VARCHAR(255),
    user_id uuid,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
DROP TABLE Information;

CREATE TABLE Posts (
    post_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    timedate text NOT NULL,
    caption text,
    img text,
    video text,
    user_id uuid,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
DROP TABLE Posts;

CREATE TABLE Likes (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    timedate text NOT NULL,
    username VARCHAR(255),
    post_id uuid,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE Comments (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    timedate text NOT NULL,
    username VARCHAR(255),
    post_id uuid,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- select * from users where username=$1
CREATE TABLE Shares (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    timedate text NOT NULL,
    username VARCHAR(255),
    post_id uuid,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE ON UPDATE CASCADE
);
DROP TABLE Likes;
DROP TABLE Comments;
DROP TABLE Shares;


CREATE TABLE Messages (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    timedate text NOT NULL,
    content TEXT NOT NULL,
    user_id uuid,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
DROP TABLE Messages;