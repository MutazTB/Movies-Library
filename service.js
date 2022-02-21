'use strict';

const express = require("express");
const moveisd = require("./eslintrc.json");

const app = express();

app.get('/' , homeHandler);
app.get('/favorite' , favoriteHandler);


app.use("*", serverErrorHandler);
app.use("*", notFoundHandler);

function moviesData(title , poster_path , overview){
    this.title = title ;
    this.poster_path = poster_path ;
    this.overview = overview ;
}

function homeHandler(req , res){
    let result =[];
    
    moveisd.data.forEach((value) => {
        let firstData = new moviesData(value.title , value.poster_path , value.overview);
        result.push(firstData);
    })
    return res.status(200).json(moveisd.data);
}
function favoriteHandler(req , res){
    res.send("Welcome to Favorite Page");
}

function notFoundHandler(req, res){
    return res.status(404).send("page not found error");
}

function serverErrorHandler(req, res){
    return res.status(500).json(moveisd.error);
}

app.listen(3000 , () => {
    console.log("listen to 3000");
})