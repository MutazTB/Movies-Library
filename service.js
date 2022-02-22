'use strict';

//const { default: axios } = require("axios");
const express = require("express");
const moveisd = require("./data.json");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const APIKEY = process.env.APIKEY;
const PORT = process.env.PORT;

const app = express();

app.get('/' , homeHandler);
app.get('/favorite' , favoriteHandler);
app.get("/search", searchHandler);
app.get("/trending", trendingHandler);



app.use("*", serverErrorHandler);
app.use("*", notFoundHandler);

function moviesData(id ,title , poster_path , overview){
    this.id = id ;
    this.title = title ;
    this.poster_path = poster_path ;
    this.overview = overview ;
}

function homeHandler(req , res){
    let result =[];
    
    axios.get(`https://api.themoviedb.org/3/movie/550?api_key=${APIKEY}`)
    .then(apiResponse => {
        apiResponse.data.moveisd.map((value) => {
        let firstData = new moviesData(value.id, value.title , value.poster_path , value.overview);
        result.push(firstData);
    })
    return res.status(200).json(moveisd.data);
}).catch(error => {
    errorHandler(error, req, res);
})
    // moveisd.data.forEach((value) => {
    //     let firstData = new moviesData(value.title , value.poster_path , value.overview);
    //     result.push(firstData);
    // })
    
}


function searchHandler(req, res){
    const search = req.query.Movie    
    axios.get(` https://api.themoviedb.org/3/search/company?api_key=${APIKEY}&query=${search}`)
    .then(apiResponse => {
        apiResponse.data.moveisd.map((value) => {
        let firstData = new moviesData(value.id || "N/A", value.title || "N/A" , value.poster_path || "N/A" , value.overview || "N/A" );
        result.push(firstData);
        });
        return res.status(200).json(moveisd.data);
    }).catch(error => {
        serverErrorHandler(req, res);
    })

}

// https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>

function trendingHandler(req, res){
    const trending = req.query.Movie    
    axios.get(` https://api.themoviedb.org/3/search/company?api_key=${APIKEY}`)
    .then(apiResponse => {
        apiResponse.data.moveisd.map((value) => {
        let firstData = new moviesData(value.id || "N/A", value.title || "N/A" , value.poster_path || "N/A" , value.overview || "N/A" );
        result.push(firstData);
        });
        return res.status(200).json(moveisd.data);
    }).catch(error => {
        serverErrorHandler(req, res);
    })

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

function errorHandler(error,req,res){
    const err = {
        status : 500,
        message : error
    }
    return res.status(500).send(err);
}