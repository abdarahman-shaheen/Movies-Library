const express = require("express");
const server = express();

const datas = require('./Movie Data/data.json')

const PORT = 3000;

server.listen(PORT,()=>{

    console.log("hay"+PORT);})

    let movies=[];
    function Format(title,poster_path,overview){
        this.title=title;
        this.poster_path=poster_path;
        this.overview=overview;
        movies.push(this);
    }

    let movie1 = new Format(datas.title,datas.poster_path,datas.overview);

    server.get('/',(req,res)=>{
        res.send(movie1);
    })

    server.get('/favorite',(req,res)=>{
        res.send("Welcome to Favorite Page")
    })

    server.get('/500',(req,res)=>{
        let obj={"status":500,"responseText":"Sorry, something went wrong"};
        res.status(500).send(obj);
    })

    server.get("*",(req,res)=>{
        res.status(404).send("page not found");
    })