const express = require("express");
const server = express();
const cors = require("cors");
const dataMovie = require("./Movie Data/data.json");
server.use(cors());
require('dotenv').config();
const axios = require('axios');
const pg = require("pg")

const apiKey=process.env.api_key;
const PORT = process.env.PORT||3000;
const DATABASE_URL=process.env.DATABASE_URL;
let movies = [];

// console.log("this "+" " +apiKey);


// let movie1 = new Format(datas.title, datas.poster_path, datas.overview);

const client = new pg.Client(`${DATABASE_URL}`)

server.use(express.json())

server.get("/", homePage);
server.get("/favorite",favoritePage);
server.get("/trending",trending);
server.get("/discover",discover);
server.get("/search",search);
server.get("/watch",watch)
server.get("/getMovies/movie",getSpecificMovies) //you should add query parmeter id(/getmovies/movie?id=<<id>>)
server.get("/getMovies",getMovies)
server.post("/addMovies",addMovies)
server.put("/updateMovies/:id",updateMovie);
server.delete("/deleteMovies/:id",deleteMovie);
server.get("/500", handlerError500);
server.get("*", handlerDefaultErro);
// server.use(errorHandler);
function homePage(req,res){
    let singleMovie = new Format(dataMovie.title, dataMovie.poster_path, dataMovie.overview);
    // let mapResult = dataMovie.map(item => {
        
    //     return singleMovie;
    // });
    res.send(singleMovie);
}

function favoritePage(req,res){
    res.send("Welcome to Favorite Page");
}

function trending(req,res){
    try {
        const url=`https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US`;
    axios.get(url)
    .then(result=>{let resultAxois=result.data.results.map(item=>{
        let singleMovie = new Format(item.id,item.title,item.release_date,item.poster_path,item.overview);
        return singleMovie;
    })
    
        res.send(resultAxois);
    }).catch((error)=>{
        console.log('Try again somthing happend',error)
        res.status(500).send(error);
    })
}
catch(error){
    errorHandler(error,req,res)
}
}
 function search(req,res){
    const url=`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=The&page=2`;
    try {
     axios.get(url)
     .then(result=>{let resultAxois=result.data.results.map(item=>{
        let singleMovie = new Format(item.id,item.title,item.release_date,item.poster_path,item.overview);
        return singleMovie;
    })
    res.send(resultAxois);
}    

    
    ).catch((error)=>{
        console.log('Try again somthing happend',error)
        res.status(500).send(error);
    })
    
    } catch (error) {
        errorHandler(error,req,res)
    } 
}
function discover(req,res){
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false`;
    try{
        axios.get(url)
        .then(result=>{let resultAxois=result.data.results.map(item=>{
            let singleMovie = new Format(item.id,item.title,item.release_date,item.poster_path,item.overview);
            return singleMovie;
            })

            res.send(resultAxois);
        })
        .catch((error)=>{
            console.log('Try again somthing happend',error)
            res.status(500).send(error);
        })
    }
    catch(error){
        errorHandler(error,req,res)
    }
}

function watch(req,res){
    const url = `https://api.themoviedb.org/3/watch/providers/tv?api_key=${apiKey}&language=en-US`;
    try{
        axios.get(url)
        .then(result=>{let resultAxois=result.data.results.map(item=>{
            return item.display_priorities;
            })

            res.send(resultAxois);
        })
        .catch((error)=>{
            console.log('Try again somthing happend',error)
            res.status(500).send(error);
        })
    }
    catch(error){
        errorHandler(error,req,res)
    }
}
function addMovies(req,res){
    try {
            const movie = req.body;
    // console.log(movie);
    const sql =`INSERT INTO infoMovies(title,overView) 
    VALUES($1,$2);`
     const values=[movie.title,movie.overView];
     client.query(sql,values)
     .then(data=>{
        res.send("tha movie is added")
     })
     .catch((error)=>errorHandler(error,req,res));

    } catch (error) {
        errorHandler(error,req,res);
        
    }

}
function getMovies(req,res){
try {
      const sql=`SELECT * FROM infomovies`;
    client.query(sql)
    .then(data=>{res.send(data.rows)})
    .catch(error=>errorHandler(error,req,res))
} catch (error) {
    errorHandler(error,req,res);
}
  
}
function getSpecificMovies(req,res){
    try {
        const {id} = req.query;
          const sql=`SELECT * FROM infomovies where id=${id}`;
        client.query(sql)
        .then(data=>{res.send(data.rows)})
        .catch(error=>errorHandler(error,req,res))
    } catch (error) {
        errorHandler(error,req,res);
    }
      
}

function deleteMovie(req,res){
    try {
        const {id} = req.params;
const sql =`delete from infoMovies where id=${id}`;
client.query(sql)
.then(data=>{
    res.status(200).send("the movie is deleted")
})
.catch((error)=>{
    errorHandler(error,req,res);
})

    } catch (error) {
        errorHandler(error,req,res);

    }

}

function updateMovie(req,res){
    try {
        const {id} = req.params;
const {title}=req.body;
const sql=`UPDATE infoMovies set title=$1 where id=${id} `;
const value =[title];
client.query(sql,value)
.then(data=>{
    res.status(201).send("update data succesfuly");
})
.catch((error)=>{
    errorHandler(error,req,res);
})
    } catch (error) {
        errorHandler(error,req,res);
    }

}

function handlerError500(req,res){
    let obj = { status: 500, responseText: "Sorry, something went wrong" };
    res.status(500).send(obj);
}

function errorHandler(error,req,res){
    const err = {
        status: 500,
        message: error
    }
    res.status(500).send(err);
}
function handlerDefaultErro(req,res){
    res.status(404).send("page not found");
}

function Format(id,title, release_date,poster_path, overview) {
    this.id=id;
  this.title = title;
  this.release_date = release_date;
  this.poster_path=poster_path;
  this.overview = overview;
  movies.push(this);
}


client.connect().then(()=>{
    server.listen(PORT, () => {
        console.log("Welcome on my host:" + PORT);
      });
})

