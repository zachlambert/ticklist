insert into ItemType (name) values
    ('Film'),
    ('TV Series'),
    ('Book Series'),
    ('Anime Series'),
    ('Manga');

insert into Item (name, item_type_id, slug, properties) values
    (
        'Inception',
        (select id from ItemType where name='Film'),
        'inception-film',
        '{ "director": "Christopher Nolan", "genre": "Thriller" }'
    ),
    (
        'Jurassic Park',
        (select id from ItemType where name='Film'),
        'jurassic-park-film',
        '{ "director": "Steven Spielberg", "genre": "Action" }'
    ),
    (
        'Avatar',
        (select id from ItemType where name='Film'),
        'avatar-film',
        '{ "director": "James Cameron", "genre": "Sci-fi" }'
    ),
    (
        'The Departed',
        (select id from ItemType where name='Film'),
        'the-departed-film',
        '{ "director": "Martin Scorsese", "genre": "Thriller" }'
    ),
    (
        'Fight Club',
        (select id from ItemType where name='Film'),
        'fight-club-film',
        '{ "director": "David Fincher", "genre": "Thriller" }'
    ),
    (
        'Shaun of the Dead',
        (select id from ItemType where name='Film'),
        'shaun-of-the-dead-film',
        '{ "director": "Edgar Wright", "genre": "Comedy" }'
    ),
    (
        'Lost',
        (select id from ItemType where name='TV Series'),
        'lost-tv-series',
        '{ "seasons": 5 }'
    ),
    (
        'Fringe',
        (select id from ItemType where name='TV Series'),
        'fringe-series',
        '{ "seasons": 5 }'
    ),
    (
        'The Office (US)',
        (select id from ItemType where name='TV Series'),
        'the-office-(US)-tv-series',
        '{ "seasons": 7 }'
    ),
    (
        'Peep Show',
        (select id from Itemtype where name='TV Series'),
        'peep-show-tv-series',
        '{ "seasons": 9 }'
    ),
    (
        'The Hunger Games',
        (select id from Itemtype where name='Book Series'),
        'the-hunger-games-book-series',
        '{ "author": "Suzanne Collins", "genre": "Young Adult" }'
    ),
    (
        'Harry Potter',
        (select id from Itemtype where name='Book Series'),
        'harry-potter-book-series',
        '{ "author": "JK Rowling", "genre": "Fantasy" }'
    ),
    (
        'Alex Rider',
        (select id from Itemtype where name='Book Series'),
        'alex-rider-book-series',
        '{ "author": "Anothony Horowitz", "genre": "Thriller" }'
    ),
    (
        'The Stormlight Archive',
        (select id from Itemtype where name='Book Series'),
        'the-stormlight-archive-book-series',
        '{ "author": "Brandon Sanderson", "genre": "Fantasy" }'
    ),
    (
        'The First Law',
        (select id from Itemtype where name='Book Series'),
        'the-first-law-book-series',
        '{ "author": "Joe Abercrombie", "genre": "Fantasy" }'
    ),
    (
        'Attack on Titan',
        (select id from Itemtype where name='Anime Series'),
        'attack-on-titan-anime-series',
        '{ "source": "Manga", "genre": "Action" }'
    ),
    (
        'Gintama',
        (select id from Itemtype where name='Anime Series'),
        'gintama-anime-series',
        '{ "source": "Manga", "genre": "Comedy" }'
    ),
    (
        'Death Note',
        (select id from Itemtype where name='Anime Series'),
        'death-note-anime-series',
        '{ "source": "Manga", "genre": "Thriller" }'
    ),
    (
        'Steins; Gate',
        (select id from Itemtype where name='Anime Series'),
        'steins;-gate-anime-series',
        '{ "source": "Visual Novel", "genre": "Thriller" }'
    ),
    (
        'Berserk',
        (select id from Itemtype where name='Manga'),
        'berserk-manga',
        '{ "author": "Kentaro Miura" }'
    ),
    (
        'Attack on Titan',
        (select id from Itemtype where name='Manga'),
        'attack-on-titan-manga',
        '{ "author": "Hajime Isayama" }'
    ),
    (
        'Yotsuba&!',
        (select id from Itemtype where name='Manga'),
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
        300,
        100.0
    );
insert into ItemTagVote (account_id, item_tag_id, score) values
    ((select id from Account where name='alice'), 1, 100),
    ((select id from Account where name='bob'), 1, 100),
    ((select id from Account where name='chloe'), 1, 100);

insert into ItemTag (item_id, tag_id, vote_count, vote_score_sum, vote_score_mean) values
    (
        (select id from Item where slug='inception-film'),
        (select id from Tag where name='scifi'),
        4,
        400,
        100.0
    );
insert into ItemTagVote (account_id, item_tag_id, score) values
    ((select id from Account where name='alice'), 2, 100),
    ((select id from Account where name='bob'), 2, 100),
    ((select id from Account where name='chloe'), 2, 100),
    ((select id from Account where name='daniel'), 2, 100);

insert into ItemTag (item_id, tag_id, vote_count, vote_score_sum, vote_score_mean) values
    (
        (select id from Item where slug='inception-film'),
        (select id from Tag where name='action'),
        2,
        200,
        100.0
    );
insert into ItemTagVote (account_id, item_tag_id, score) values
    ((select id from Account where name='alice'), 3, 100),
    ((select id from Account where name='bob'), 3, 100);
