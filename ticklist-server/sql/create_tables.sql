-- Run as admin

-- Accounts

create table Account (
    id serial primary key,
    name text not null,
    unique (name)
);

create table AccountSession (
    id serial primary key,
    account_id serial references Account(id),
    token char(64) unique
);

-- Items

create table ItemType (
    id serial primary key,
    name text not null,
    unique (name)
);

create table Item (
    id serial primary key,
    name text not null,
    item_type_id serial references ItemType(id),
    properties text not null,
    unique (name, item_type_id)
);

create table ListItem (
    item_id serial references Item(id),
    account_id serial references Account(id),
    properties text not null,
    primary key (item_id, account_id)
);

-- Tags

create table Tag (
    id serial primary key,
    name text not null,
    unique (name)
);

create table ItemTag (
    id serial primary key,
    item_id serial references Item(id),
    tag_id serial references Tag(id)
);

-- Role permissions

grant select, insert, update, delete on all tables in schema public to api;
grant usage, select on all sequences in schema public to api;
