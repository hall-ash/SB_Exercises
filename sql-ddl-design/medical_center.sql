DROP DATABASE IF EXISTS medical_center_db;

CREATE DATABASE medical_center_db;

\c medical_center_db

CREATE TABLE doctors (
	id SERIAL PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	speciality TEXT
);

CREATE TABLE patients (
	id SERIAL PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	birth_date DATE NOT NULL
);

CREATE TABLE doctors_patients (
	id SERIAL PRIMARY KEY,
	patient_id INT REFERENCES patients ON DELETE CASCADE,
	doctor_id INT REFERENCES doctors ON DELETE CASCADE
);

CREATE TABLE visits (
	id SERIAL PRIMARY KEY,
	doc_patient_id INT REFERENCES doctors_patients ON DELETE CASCADE,
	visit_time TIMESTAMP NOT NULL,
	diagnosis INT REFERENCES diagnoses ON DELETE CASCADE DEFAULT NULL
);

CREATE TABLE diagnoses (
	id SERIAL PRIMARY KEY,
	-- doc_patient id INT REFERENCES doctors_patients ON DELETE CASCADE,
	visit_id INT REFERENCES visits ON DELETE CASCADE,
	notes TEXT
);

CREATE TABLE diseases (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	description TEXT
);

CREATE TABLE diagnoses_diseases (
	id SERIAL PRIMARY KEY,
	diagnosis_id INT REFERENCES diagnoses ON DELETE CASCADE,
	disease_id INT REFERENCES diseases ON DELETE CASCADE
);

INSERT INTO doctors 
(first_name, last_name, speciality)
VALUES
('John', 'Doe', 'Pediatrics'),
('Jane', 'Dow', 'Endocrinology'),
('Susan', 'Morgan', 'Surgery');

INSERT INTO patients 
(first_name, last_name, birth_date)
VALUES
('Jack', 'Smith', '1999-01-08'),
('Matt', 'Brown', '1970-03-20'),
('Debbie', 'Hall', '1980-09-10'),
('Alex', 'Nelson', '2018-02-13');

INSERT INTO doctors_patients 
(patient_id, doctor_id)
VALUES
(1, 2),
(2, 2),
(3, 3),
(3, 2),
(4, 1);

INSERT INTO visits 
(doc_patient_id, visit_time)
VALUES
(1, '2021-10-19 07:30'),
(3, '2021-10-30 09:00'),
(4, '2021-11-01 13:45'),
(5, '2021-11-04 10:30');

INSERT INTO diagnoses
(visit_id)
VALUES
(1),
(2),
(3);

INSERT INTO diseases 
(name)
VALUES
('Asthma'),
('Bronchitis'),
('Anemia'),
('Common Cold'),
('Hypertension');

INSERT INTO diagnoses_diseases
(diagnosis_id, disease_id)
VALUES
(1, 1),
(1, 2),
(1, 4),
(2, 3),
(3, 5);

-- SELECT p.first_name, p.last_name, diseases.name
-- FROM patients p
-- JOIN doctors_patients dp
-- ON p.id = dp.patient_id
-- JOIN visits  v
-- ON v.id = dp.patient_id
-- JOIN diagnoses 
-- ON v.id = diagnoses.id
-- JOIN diagnoses_diseases dd 
-- ON diagnoses.id = dd.id
-- JOIN diseases 
-- ON
-- diseases.id = dd.id
-- WHERE p.id = 1;

