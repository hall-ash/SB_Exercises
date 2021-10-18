-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

CREATE TABLE galaxies 
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE planets
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) UNIQUE NOT NULL,
  orbital_period_in_years FLOAT NOT NULL,
  orbits_around VARCHAR(20) NOT NULL,
  galaxy_id INT REFERENCES galaxies ON DELETE SET NULL
);

CREATE TABLE moons
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) UNIQUE NOT NULL,
  planet_id INT REFERENCES planets ON DELETE CASCADE
);

