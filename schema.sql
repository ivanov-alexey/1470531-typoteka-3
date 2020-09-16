CREATE DATABASE typoteka
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    TEMPLATE = template0
    CONNECTION LIMIT = -1;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS categories_articles CASCADE;

CREATE TABLE users
(
    id INTEGER PRIMARY KEY,
    avatar TEXT,
    email TEXT NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    password TEXT NOT NULL ,
    created_at timestamptz NOT NULL
);

CREATE TABLE articles
(
    id INTEGER PRIMARY KEY,
    announce TEXT NOT NULL,
    full_text TEXT NOT NULL,
    picture TEXT,
    title TEXT NOT NULL,
    publication_date timestamptz NOT NULL,
    created_at timestamptz NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE SET NULL
        ON UPDATE SET NULL
);

CREATE TABLE categories
(
    id INTEGER PRIMARY KEY,
    title TEXT,
    created_at timestamptz
);

CREATE TABLE comments
(
    id INTEGER PRIMARY KEY,
    text TEXT,
    publication_date timestamptz,
    created_at timestamptz,
    user_id INTEGER,
    article_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE SET NULL
        ON UPDATE SET NULL,
    FOREIGN KEY (article_id) REFERENCES articles (id)
        ON DELETE SET NULL
        ON UPDATE SET NULL
);

CREATE TABLE categories_articles
(
    id INTEGER PRIMARY KEY,
    category_id INTEGER NOT NULL,
    article_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (article_id) REFERENCES articles (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
