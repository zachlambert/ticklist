-- TODO: Use proper passwords
-- TODO: Add reader and writer roles
CREATE ROLE admin WITH LOGIN PASSWORD 'admin';
ALTER ROLE admin CREATEDB;

-- TODO: Grant permissions to admin

CREATE DATABASE data
