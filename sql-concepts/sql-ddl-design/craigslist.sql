DROP DATABASE IF EXISTS craigslist_db;

CREATE DATABASE craigslist_db;

\c craigslist_db

CREATE TABLE regions (
	id SERIAL PRIMARY KEY,
	name VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE categories (
	id SERIAL PRIMARY KEY,
	name VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(20) UNIQUE NOT NULL,
	password VARCHAR(30) NOT NULL,
	pref_region INT REFERENCES regions ON DELETE SET NULL
);

CREATE TABLE posts (
	id SERIAL PRIMARY KEY,
	title VARCHAR(20) NOT NULL,
	body TEXT,
	author INT REFERENCES users ON DELETE CASCADE,
	location VARCHAR(20)
	region INT REFERENCES regions ON DELETE SET NULL,
	category INT REFERENCES categories ON DELETE SET NULL
);