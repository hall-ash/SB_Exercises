DROP DATABASE IF EXISTS soccer_league_db;

CREATE DATABASE soccer_league_db;

\c soccer_league_db

CREATE TABLE league (
	id SERIAL PRIMARY KEY,
	name VARCHAR(20) NOT NULL
);

CREATE TABLE teams (
	id SERIAL PRIMARY KEY,
	name VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE players (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(20) NOT NULL,
	last_name VARCHAR(20) NOT NULL,
	team_id INT REFERENCES teams ON DELETE SET NULL
);

CREATE TABLE referees (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(20) NOT NULL,
	last_name VARCHAR(20) NOT NULL
);

CREATE TABLE season (
	id SERIAL PRIMARY KEY,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL
);

CREATE TABLE matches (
	id SERIAL PRIMARY KEY,
	team1_id INT REFERENCES teams ON DELETE SET NULL,
	team2_id INT REFERENCES teams ON DELETE SET NULL,
	referee_id INT REFERENCES referees ON DELETE SET NULL,
	season_id INT REFERENCES season ON DELETE CASCADE,
	match_date DATE NOT NULL,
	start_time TIME NOT NULL,
	location VARCHAR(20) NOT NULL
);

CREATE TABLE goals (
	id SERIAL PRIMARY KEY,
	player_id INT REFERENCES players ON DELETE SET NULL,
	match_id INT REFERENCES matches ON DELETE CASCADE
);


CREATE TABLE results (
	id SERIAL PRIMARY KEY,
	match_id INT REFERENCES matches ON DELETE CASCADE,
	winning_team_id INT REFERENCES teams ON DELETE SET NULL
);


-- INSERT INTO teams
-- (name)
-- VALUES
-- ('team a'), ('team b'), ('team c'), ('team d');

-- INSERT INTO players
-- (first_name, last_name, team_id)
-- VALUES
-- ('John', 'Johnson', 1),
-- ('Jack', 'Jackson', 2),
-- ('Rob', 'Robson', 3),
-- ('Matt', 'Mattson', 4);

-- INSERT INTO matches
-- (team1_id, team2_id)
-- VALUES
-- (1, 2),
-- (1, 3),
-- (1, 4),
-- (2, 3),
-- (2, 4),
-- (3, 4);

-- INSERT INTO results
-- (match_id, winning_team_id)
-- VALUES
-- (1, 1),
-- (2, 1),
-- (3, 4),
-- (4, 2),
-- (5, 4),
-- (6, 3);