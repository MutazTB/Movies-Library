'use strict';

//const { default: axios } = require("axios");
const express = require("express");
const moveisd = require("./data.json");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const pg = require("pg");
const databaseURL = process.env.DATABASE_URL;
const APIKEY = process.env.APIKEY;
const PORT = process.env.PORT;

//const client = new pg.Client(databaseURL);

const client = new pg.Client({
    connectionString: databaseURL,
    ssl: { rejectUnauthorized: false }
});

const app = express();

app.use(express.json());
app.get('/' , homeHandler);
app.get('/favorite' , favoriteHandler);
app.get("/search", searchHandler);
app.get("/trending", trendingHandler);
app.post("/addMovies", addMoviesHandler);
app.get("/getMovies", getMoviesHandler);
app.get("/getMovie/:id", getMovieHandler)
app.put("/UPDATE/:id",updateHandler);
app.delete("/DELETE/:id", deleteHandler);


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

function addMoviesHandler(req, res){
    const movie = req.body;
     console.log(movie);

    const sql = `INSERT INTO movieslibrary(title, poster_path, overview, comment) VALUES($1, $2, $3, $4) RETURNING *`
    const values = [movie.title, movie.poster_path, movie.overview, movie.comment]
    client.query(sql, values).then((result)=>{
        return res.status(201).json(result.rows);
    }).catch((error) => {
        errorHandler(error, req, res);
    });
};


function getMoviesHandler(req, res){
    const sql = `SELECT * FROM movieslibrary`;

    client.query(sql).then((result) => {
        return res.status(200).json(result.rows);
    }).catch((error) => {
        errorHandler(error, req, res);
    });
};

function getMovieHandler(req, res){
    let id = req.params.id;
    
    const sql = `SELECT * FROM movieslibrary WHERE id=$1;`;
    const values = [id];

    client.query(sql, values).then((result) => {
        return res.status(200).json(result.rows);
    }).catch((error) => {
        errorHandler(error, req, res)
    })
};

function updateHandler(req, res){
    const id = req.params.id;
    const movie = req.body;
   
    const sql = `UPDATE movieslibrary SET title=$1, poster_path=$2,overview=$3, comment=$4 WHERE id=$5 RETURNING *;`;
    const values = [movie.title, movie.poster_path, movie.overview, movie.comment ,id];

    client.query(sql, values).then((result) => {
        return res.status(200).json(result.rows);
    }).catch((error) => {
        errorHandler(error, req, res);
    })

};

function deleteHandler(req, res){
    const id = req.params.id

    const sql = `DELETE FROM movieslibrary WHERE id=$1;`
    const values = [id];

    client.query(sql, values).then(() => {
        return res.status(204).json({})
    }).catch(error => {
        errorHandler(error, req, res);
    })
};



function favoriteHandler(req , res){
    res.send("Welcome to Favorite Page");
}

function notFoundHandler(req, res){
    return res.status(404).send("page not found error");
}

function serverErrorHandler(req, res){
    return res.status(500).json(moveisd.error);
}


client.connect().then(()=> {

    app.listen(PORT , () => {
        console.log(`listen to ${PORT}`);
    })
})

function errorHandler(error,req,res){
    const err = {
        status : 500,
        message : error
    }
    return res.status(500).send(err);
}
