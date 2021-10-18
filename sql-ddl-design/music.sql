-- from the terminal run:
-- psql < music.sql

DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

CREATE TABLE artists
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE producers
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE albums
(
  id SERIAL PRIMARY KEY,
  title VARCHAR(20) NOT NULL
);

CREATE TABLE songs
(
  id SERIAL PRIMARY KEY,
  title VARCHAR(20) NOT NULL,
  duration_in_seconds INTEGER NOT NULL,
  release_date DATE NOT NULL,
  album_id INT REFERENCES albums ON DELETE CASCADE
);

CREATE TABLE artists_songs
(
  id SERIAL PRIMARY KEY,
  artist_id INT REFERENCES artists ON DELETE CASCADE,
  song_id INT REFERENCES songs ON DELETE CASCADE
);

CREATE TABLE producers_songs
(
  id SERIAL PRIMARY KEY,
  producer_id INT REFERENCES producers ON DELETE CASCADE,
  song_id INT REFERENCES songs ON DELETE CASCADE
);

