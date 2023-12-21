-- Run as role postgres

create role admin with login password 'admin';
alter role admin createdb;
alter role admin createrole;
