# Movies-Library - version 1.0

**Author Name**: Abdelrahman Shaheen

## WRRC

!["img wrrc"](./assets/wrrc%20dbms.png)

## Overview

- This page is movies libray , I used Api movies database from [The movie Database API](https://developers.themoviedb.org/3/getting-started/introduction).

## Notes

- I used Api for request and response in project.

- I used  format clean code for my code.

- I uesd postgres database server to storage my data movies .

## Getting Started

1. clone this repository;
2. run command "npm i" to install all package in dependencies .
3. create file (.env) same data information in file (env.sample).
4. add you api_key.
5. run command "npm start" in terminal;
6. go browser and write url "localhost:3000".
7. add any path in project features (localhost:3000/path) to show the pages.

## optional features

1. you can add movies (path "/AddMovies") before that please use thunder Client or postmanto add data json, first select POST then go to body and add ( title and overview for movie) then send request.

2. you can update movies (path "//updateMovies/:id") before that please use thunder Client or postmanto add data json, first select PUT then go to body and add ( title and overview for movie) then send request.
Note: don't forget add the id .

3. you can delete movies (path "/deleteMovies/:id").
Note: don't forget add the id .

## Project Features

1. in home page (path "/") you can show the movies(title and poster and overview),
 and you can add the movies to favorite with comment.

2. in favorite page (path "/favorite") you can show the favorite movies,
 and you can update and delete your comment.

3. in page trending (path "/trending") you can show the request and response  trending page from database api;

4. in page search (path "/search") you can show the request and response  search page from database api

5. in page watch (path "/watch") you can show the request and response watch page from database api

6. if you add any other path the error page not found is show .

7. in page get movies (path /getMovies) you can show the movies it will be added.
