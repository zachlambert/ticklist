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
    slug text not null,
    properties text not null,
    unique (name, item_type_id),
    unique (slug)
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
    tag_id serial references Tag(id),
    vote_count integer default 1,
    vote_score_sum integer default 0,
    unique (item_id, tag_id)
);

create table ItemTagVote (
    id serial primary key,
    account_id serial references Account(id),
    item_tag_id serial references ItemTag(id),
    score integer default 0,
    unique (account_id, item_tag_id)
);

-- Role permissions

grant select, insert, update, delete on all tables in schema public to api;
grant usage, select on all sequences in schema public to api;
