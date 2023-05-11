DROP TABLE IF EXISTS infoMovies;

CREATE TABLE IF NOT EXISTS infoMovies(

    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    overView VARCHAR(255),
    poster_path VARCHAR(255)
 
);