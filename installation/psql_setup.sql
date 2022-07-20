-- Update the username / password based on your need
CREATE USER mimock WITH PASSWORD 'ironclaw';

-- Create the database
CREATE DATABASE mimock_db OWNER mimock;

-- Create new schema for mimock
CREATE SCHEMA IF NOT EXISTS mimock_schema AUTHORIZATION mimock;