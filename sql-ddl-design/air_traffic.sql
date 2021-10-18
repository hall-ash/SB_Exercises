-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

CREATE TABLE passengers
(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(20) NOT NULL
);

CREATE TABLE airlines 
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE countries
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE cities
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  country_id INT REFERENCES countries ON DELETE CASCADE
);

CREATE TABLE flights
(
  id SERIAL PRIMARY KEY,
  departure TIMESTAMP NOT NULL,
  arrival TIMESTAMP NOT NULL,
  airline_id INT REFERENCES airlines ON DELETE CASCADE,
  dest_location_id INT REFERENCES cities ON DELETE SET NULL,
  arrival_location_id INT REFERENCES cities ON DELETE SET NULL
);

CREATE TABLE tickets
(
  id SERIAL PRIMARY KEY,
  passenger_id INT REFERENCES passengers ON DELETE CASCADE,
  seat VARCHAR(10) NOT NULL,
  flight_id INT REFERENCES flights ON DELETE CASCADE
);

