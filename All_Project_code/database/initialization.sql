--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;



SET default_tablespace = '';

SET default_with_oids = false;



DROP TABLE IF EXISTS user CASCADE;
CREATE TABLE IF NOT EXISTS user (
    userid SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    posts int NOT NULL
);

DROP TABLE IF EXISTS heatmap_data CASCADE;
CREATE TABLE IF NOT EXISTS heatmap_data {
    spot VARCHAR(200) PRIMARY KEY,
    posts int NOT NULL,
    RefreshDate DATE NOT NULL
};