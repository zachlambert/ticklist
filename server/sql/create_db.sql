-- Run as admin

create database app;
create role api_read with login password 'api_read';
create role api_write with login password 'api_write';
