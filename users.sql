-- drop table if exists users;

create table users(
    id serial primary key,
    name text ,
    counter int 
);