insert into ItemType (name, slug, schema) values
    (
        'Film',
        'film',
        '{
            "title": "Film",
            "description": "Film",
            "type": "object",
            "properties": {
                "director": {
                    "description": "Director of film",
                    "type": "string"
                }
                "duration": {
                    "description": "Film duration in minutes",
                    "type": "number",
                    "exclusiveMinimum": 0
                }
            },
            "required": [ "director", "duration" ]
        }'
    ),
    (
        'TV Series',
        'tv-series',
        '{
            "title": "TV Series",
            "description": "TV Series",
            "type": "object",
            "properties": {
                "numSeasons": {
                    "description": "Number of seasons",
                    "type": "number",
                    "exclusiveMinimum": 0
                }
            },
            "required": [ "numSeasons" ]
        }'
    ),
    (
        'Book Series',
        'book-series',
        '{
            "title": "Book Series",
            "description": "Book Series",
            "type": "object",
            "properties": {
                "author": {
                    "description": "Author",
                    "type": "string"
                }
                "numBooks": {
                    "description": "Number of books",
                    "type": "number",
                    "exclusiveMinimum": 0
                }
            },
            "required": [ "numBooks" ]
        }'
    ),
    (
        'Anime Series',
        'anime-series',
        '{
            "title": "Anime Series",
            "description": "Anime Series",
            "type": "object",
            "properties": {
                "numSeasons": {
                    "description": "Number of seasons",
                    "type": "number",
                    "exclusiveMinimum": 0
                }
            },
            "required": [ "numSeasons" ]
        }'
    ),
    (
        'Manga',
        'manga',
        '{
            "title": "Manga",
            "description": "Manga",
            "type": "object",
            "properties": {
                "author": {
                    "description": "Author",
                    "type": "string"
                },
                "artist": {
                    "description": "Artist, if different to author",
                    "type": "string"
                }
            },
            "required": [ "author" ]
        }'
    );

insert into Item (name, item_type_id, slug, properties) values
    (
        'Inception',
        (select id from ItemType where slug='film'),
        'inception-film',
        '{ "director": "Christopher Nolan" }'
    ),
    (
        'Jurassic Park',
        (select id from ItemType where slug='film'),
        'jurassic-park-film',
        '{ "director": "Steven Spielberg" }'
    ),
    (
        'Avatar',
        (select id from ItemType where slug='film'),
        'avatar-film',
        '{ "director": "James Cameron" }'
    ),
    (
        'The Departed',
        (select id from ItemType where slug='film'),
        'the-departed-film',
        '{ "director": "Martin Scorsese" }'
    ),
    (
        'Fight Club',
        (select id from ItemType where slug='film'),
        'fight-club-film',
        '{ "director": "David Fincher" }'
    ),
    (
        'Shaun of the Dead',
        (select id from ItemType where slug='film'),
        'shaun-of-the-dead-film',
        '{ "director": "Edgar Wright" }'
    ),
    (
        'Lost',
        (select id from ItemType where slug='tv-series'),
        'lost-tv-series',
        '{ "numSeasons": 5 }'
    ),
    (
        'Fringe',
        (select id from ItemType where slug='tv-series'),
        'fringe-series',
        '{ "numSeasons": 5 }'
    ),
    (
        'The Office (US)',
        (select id from ItemType where slug='tv-series'),
        'the-office-(US)-tv-series',
        '{ "numSeasons": 7 }'
    ),
    (
        'Peep Show',
        (select id from Itemtype where slug='tv-series'),
        'peep-show-tv-series',
        '{ "numSeasons": 9 }'
    ),
    (
        'The Hunger Games',
        (select id from Itemtype where slug='book-series'),
        'the-hunger-games-book-series',
        '{ "author": "Suzanne Collins", "numBooks": 3 }'
    ),
    (
        'Harry Potter',
        (select id from Itemtype where slug='book-series'),
        'harry-potter-book-series',
        '{ "author": "JK Rowling", "numBooks": 7 }'
    ),
    (
        'Alex Rider',
        (select id from Itemtype where slug='book-series'),
        'alex-rider-book-series',
        '{ "author": "Anothony Horowitz", "numBooks": 7 }'
    ),
    (
        'The Stormlight Archive',
        (select id from Itemtype where slug='book-series'),
        'the-stormlight-archive-book-series',
        '{ "author": "Brandon Sanderson", "numBooks": 4 }'
    ),
    (
        'The First Law',
        (select id from Itemtype where slug='book-series'),
        'the-first-law-book-series',
        '{ "author": "Joe Abercrombie", "numBooks": 3 }'
    ),
    (
        'Attack on Titan',
        (select id from Itemtype where slug='anime-series'),
        'attack-on-titan-anime-series',
        '{ "numSeasons": 4 }'
    ),
    (
        'Gintama',
        (select id from Itemtype where slug='anime-series'),
        'gintama-anime-series',
        '{ "numSeasons": 6 }'
    ),
    (
        'Death Note',
        (select id from Itemtype where slug='anime-series'),
        'death-note-anime-series',
        '{ "numSeasons": 1 }'
    ),
    (
        'Steins; Gate',
        (select id from Itemtype where slug='anime-series'),
        'steins;-gate-anime-series',
        '{ "numSeasons": 1 }'
    ),
    (
        'Berserk',
        (select id from Itemtype where slug='manga'),
        'berserk-manga',
        '{ "author": "Kentaro Miura" }'
    ),
    (
        'Attack on Titan',
        (select id from Itemtype where slug='manga'),
        'attack-on-titan-manga',
        '{ "author": "Hajime Isayama" }'
    ),
    (
        'Yotsuba&!',
        (select id from Itemtype where slug='manga'),
        'yotsuba&!-manga',
        '{ "author": "Kiyohiko Azuma" }'
    );

insert into Account (name) values
    ('alice'), ('bob'), ('chloe'), ('daniel'), ('erin'), ('felix');

insert into Tag (name) values
    ('action'), ('thriller'), ('comedy'), ('romance'), ('fantasy'), ('scifi');

insert into ItemTag (item_id, tag_id, vote_count, vote_score_sum, vote_score_mean) values
    (
        (select id from Item where slug='inception-film'),
        (select id from Tag where name='thriller'),
        3,
        240,
        80.0
    );
insert into ItemTagVote (account_id, item_tag_id, score) values
    ((select id from Account where name='alice'), 1, 80),
    ((select id from Account where name='bob'), 1, 80),
    ((select id from Account where name='chloe'), 1, 80);

insert into ItemTag (item_id, tag_id, vote_count, vote_score_sum, vote_score_mean) values
    (
        (select id from Item where slug='inception-film'),
        (select id from Tag where name='scifi'),
        4,
        360,
        90.0
    );
insert into ItemTagVote (account_id, item_tag_id, score) values
    ((select id from Account where name='alice'), 2, 90),
    ((select id from Account where name='bob'), 2, 90),
    ((select id from Account where name='chloe'), 2, 90),
    ((select id from Account where name='daniel'), 2, 90);

insert into ItemTag (item_id, tag_id, vote_count, vote_score_sum, vote_score_mean) values
    (
        (select id from Item where slug='inception-film'),
        (select id from Tag where name='action'),
        2,
        80,
        40.0
    );
insert into ItemTagVote (account_id, item_tag_id, score) values
    ((select id from Account where name='alice'), 3, 40),
    ((select id from Account where name='bob'), 3, 40);
