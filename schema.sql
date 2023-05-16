DROP TABLE IF EXISTS infoMovies;

CREATE TABLE IF NOT EXISTS infoMovies(

    id INT PRIMARY KEY,
    title VARCHAR(255),
    overview VARCHAR(255),
    poster_path VARCHAR(255),
    comment VARCHAR(255)
);