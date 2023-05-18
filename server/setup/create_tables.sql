-- TODO: Later add email and password
CREATE TABLE Person (
    Id serial primary key,
    Name text,
    IsAdmin boolean
);

-- Category of list item:
-- eg: book, tv show, film
-- Categories form a hierarchy
-- eg: video -> { tv, film, webseries }, book -> { novel, comic, webnovel }
CREATE TABLE Category (
    Id      serial primary key,
    Name    text
);

-- Tags are used for things like genre
-- eg: sci-fi, romance, action
-- No hierarchy
-- Items will have a given score for each tag instead of being assigned out-right
CREATE TABLE Tag (
    Id      serial primary key,
    Name    text
);

-- Items in lists (eg: a specific book)
-- Has a single category and arbitrary numbers of tags
CREATE TABLE Item (
    Id          serial primary key,
    PersonId    serial references Person(Id),
    CategoryId  serial references Category(Id)
);

CREATE TABLE ItemTag (
    Id serial primary key,
    ItemId serial references Item(Id),
    TagId serial references Tag(Id)
);
