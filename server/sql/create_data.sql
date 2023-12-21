insert into ItemType (name) values
    ('Film'),
    ('TV Series'),
    ('Book Series'),
    ('Anime Series'),
    ('Manga');

insert into Item (name, item_type_id, properties) values
    (
        'Inception',
        (select id from ItemType where name='Film'),
        '{ "director": "Christopher Nolan", "genre": "Thriller" }'
    ),
    (
        'Jurassic Park',
        (select id from ItemType where name='Film'),
        '{ "director": "Steven Spielberg", "genre": "Action" }'
    ),
    (
        'Avatar',
        (select id from ItemType where name='Film'),
        '{ "director": "James Cameron", "genre": "Sci-fi" }'
    ),
    (
        'The Departed',
        (select id from ItemType where name='Film'),
        '{ "director": "Martin Scorsese", "genre": "Thriller" }'
    ),
    (
        'Fight Club',
        (select id from ItemType where name='Film'),
        '{ "director": "David Fincher", "genre": "Thriller" }'
    ),
    (
        'Shaun of the Dead',
        (select id from ItemType where name='Film'),
        '{ "director": "Edgar Wright", "genre": "Comedy" }'
    ),
    (
        'Lost',
        (select id from ItemType where name='TV Series'),
        '{ "seasons": 5 }'
    ),
    (
        'Fringe',
        (select id from ItemType where name='TV Series'),
        '{ "seasons": 5 }'
    ),
    (
        'The Office (US)',
        (select id from ItemType where name='TV Series'),
        '{ "seasons": 7 }'
    ),
    (
        'Peep Show',
        (select id from Itemtype where name='TV Series'),
        '{ "seasons": 9 }'
    ),
    (
        'The Hunger Games',
        (select id from Itemtype where name='Book Series'),
        '{ "author": "Suzanne Collins", "genre": "Young Adult" }'
    ),
    (
        'Harry Potter',
        (select id from Itemtype where name='Book Series'),
        '{ "author": "JK Rowling", "genre": "Fantasy" }'
    ),
    (
        'Alex Rider',
        (select id from Itemtype where name='Book Series'),
        '{ "author": "Anothony Horowitz", "genre": "Thriller" }'
    ),
    (
        'The Stormlight Archive',
        (select id from Itemtype where name='Book Series'),
        '{ "author": "Brandon Sanderson", "genre": "Fantasy" }'
    ),
    (
        'The First Law',
        (select id from Itemtype where name='Book Series'),
        '{ "author": "Joe Abercrombie", "genre": "Fantasy" }'
    ),
    (
        'Attack on Titan',
        (select id from Itemtype where name='Anime Series'),
        '{ "source": "Manga", "genre": "Action" }'
    ),
    (
        'Gintama',
        (select id from Itemtype where name='Anime Series'),
        '{ "source": "Manga", "genre": "Comedy" }'
    ),
    (
        'Death Note',
        (select id from Itemtype where name='Anime Series'),
        '{ "source": "Manga", "genre": "Thriller" }'
    ),
    (
        'Steins; Gate',
        (select id from Itemtype where name='Anime Series'),
        '{ "source": "Visual Novel", "genre": "Thriller" }'
    ),
    (
        'Berserk',
        (select id from Itemtype where name='Manga'),
        '{ "author": "Kentaro Miura" }'
    ),
    (
        'Attack on Titan',
        (select id from Itemtype where name='Manga'),
        '{ "author": "Hajime Isayama" }'
    ),
    (
        'Yotsuba&!',
        (select id from Itemtype where name='Manga'),
        '{ "author": "Kiyohiko Azuma" }'
    );
