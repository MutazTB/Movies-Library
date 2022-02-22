-- Drop TABLE movieslibrary;
-- Drop TABLE moviestable;

CREATE TABLE movieslibrary(
id serial primary key,
title varchar(255),
poster_path varchar(10000),
overview varchar(10000),
comment varchar(255)
);