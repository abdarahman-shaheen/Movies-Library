const express = require("express");
const server = express();
const cors = require("cors");
const dataMovie = require("./Movie Data/data.json");
server.use(cors());
require('dotenv').config();
const axios = require('axios');
const apiKey=process.env.api_key;
const PORT = 3000;
let movies = [];

console.log("this "+" " +apiKey);


// let movie1 = new Format(datas.title, datas.poster_path, datas.overview);

server.get("/", homePage);

server.get("/trending",trending);
server.get("/search",search);
server.get("/discover",discover);
server.get("/watch",watch)
server.get("/favorite",favoritePage);

server.get("/500", handlerError500);

server.get("*", handlerDefaultErro);

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

server.listen(PORT, () => {
    console.log("hays" + PORT);
  });
