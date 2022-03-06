// 'use strict';

// //const { default: axios } = require("axios");
// const express = require("express");
// const moveisd = require("./data.json");
// const axios = require("axios");
// const dotenv = require("dotenv");
// dotenv.config();

// const pg = require("pg");
// const databaseURL = process.env.DATABASE_URL;
// const APIKEY = process.env.APIKEY;
// const PORT = process.env.PORT;

// const client = new pg.Client(databaseURL);

// // const client = new pg.Client({
// //     connectionString: databaseURL,
// //     ssl: { rejectUnauthorized: false }
// // });

// const app = express();

// app.use(express.json());
// app.get('/' , homeHandler);
// app.get('/favorite' , favoriteHandler);
// app.get("/search", searchHandler);
// app.get("/trending", trendingHandler);
// app.post("/addMovies", addMoviesHandler);
// app.get("/getMovies", getMoviesHandler);
// app.get("/getMovie/:id", getMovieHandler)
// app.put("/UPDATE/:id",updateHandler);
// app.delete("/DELETE/:id", deleteHandler);


// app.use("*", serverErrorHandler);
// app.use("*", notFoundHandler);

// function moviesData(id ,title , poster_path , overview){
//     this.id = id ;
//     this.title = title ;
//     this.poster_path = poster_path ;
//     this.overview = overview ;
// }

// function homeHandler(req , res){

//     return res.send("Hello World");
// //     let result =[];
    
// // dta.data.foreach((value) => {
// //     let firstData = new moviesData(value.id, value.title , value.poster_path , value.overview);
// //          result.push(firstData);
// // })

// // return res.json(data.data);

// //     axios.get(`https://api.themoviedb.org/3/movie/550?api_key=${APIKEY}`)
// //     .then(apiResponse => {
// //         apiResponse.data.moveisd.map((value) => {
// //         let firstData = new moviesData(value.id, value.title , value.poster_path , value.overview);
// //         result.push(firstData);
// //     })
// //     return res.status(200).json(result);
// // }).catch(error => {
// //     errorHandler(error, req, res);
// // })
//     // moveisd.data.forEach((value) => {
//     //     let firstData = new moviesData(value.title , value.poster_path , value.overview);
//     //     result.push(firstData);
//     // })
    
// }


// function searchHandler(req, res) {
//     // console.log(req);
//     let search = req.query.query;
//     let result = [];
//     axios
//       .get(
//         `https://api.themoviedb.org/3/search/company?api_key=${APIKEY}&query=${search}`
//       )
//       .then((results) => {
//         res.send(results.data.results);
//       })
//       .catch((error) => {
//         errorHandler(error, req, res);
//       });
//   }

// function trendingHandler(req, res) {
//     let result = [];
//     let trinding =
//      axios
//       .get(
//         ` https://api.themoviedb.org/3/search/company?api_key=${APIKEY}&language=en-US`
//       )
//       .then((apiResponse) => {
//         apiResponse.data.results.map((value) => {
//           let newData = new moviesData(
            
//             value.title || "N/A",
//             value.poster_path || "N/A",
//             value.overview || "N/A"
//           );
//           result.push(newData);
//         });
//         return res.status(200).json(result);
//       })
//       .catch((error) => {
//         errorHandler(error, req, res);
//       });
//   }





// function addMoviesHandler(req, res){
//     const movie = req.body;
//      console.log(movie);

//     const sql = `INSERT INTO movieslibrary(title, poster_path, overview, comment) VALUES($1, $2, $3, $4) RETURNING *`
//     const values = [movie.title, movie.poster_path, movie.overview, movie.comment]
//     client.query(sql, values).then((result)=>{
//         return res.status(201).json(result.rows);
//     }).catch((error) => {
//         errorHandler(error, req, res);
//     });
// };


// function getMoviesHandler(req, res){
//     const sql = `SELECT * FROM movieslibrary`;

//     client.query(sql).then((result) => {
//         return res.status(200).json(result.rows);
//     }).catch((error) => {
//         errorHandler(error, req, res);
//     });
// };

// function getMovieHandler(req, res){
//     let id = req.params.id;
    
//     const sql = `SELECT * FROM movieslibrary WHERE id=$1;`;
//     const values = [id];

//     client.query(sql, values).then((result) => {
//         return res.status(200).json(result.rows);
//     }).catch((error) => {
//         errorHandler(error, req, res)
//     })
// };

// function updateHandler(req, res){
//     const id = req.params.id;
//     const movie = req.body;
   
//     const sql = `UPDATE movieslibrary SET title=$1, poster_path=$2,overview=$3, comment=$4 WHERE id=$5 RETURNING *;`;
//     const values = [movie.title, movie.poster_path, movie.overview, movie.comment ,id];

//     client.query(sql, values).then((result) => {
//         return res.status(200).json(result.rows);
//     }).catch((error) => {
//         errorHandler(error, req, res);
//     })

// };

// function deleteHandler(req, res){
//     const id = req.params.id

//     const sql = `DELETE FROM movieslibrary WHERE id=$1;`
//     const values = [id];

//     client.query(sql, values).then(() => {
//         return res.status(204).json({})
//     }).catch(error => {
//         errorHandler(error, req, res);
//     })
// };



// function favoriteHandler(req , res){
//     res.send("Welcome to Favorite Page");
// }

// function notFoundHandler(req, res){
//     return res.status(404).send("page not found error");
// }

// function serverErrorHandler(req, res){
//     return res.status(500).json(moveisd.error);
// }


// client.connect().then(()=> {

//     app.listen(PORT , () => {
//         console.log(`listen to ${PORT}`);
//     })
// })

// function errorHandler(error,req,res){
//     const err = {
//         status : 500,
//         message : error
//     }
//     return res.status(500).send(err);
// }








///////////////////////////////////////////////////////////////////////////////////

"use strict";

const express = require("express");

const cors = require("cors");

const data = require("./data.json");

const dotenv = require("dotenv");

const app = express();

app.use(cors());

const axios = require("axios");

const pg = require("pg");

dotenv.config();

const APIKEY = process.env.APIKEY;
const DATABASE_URL = process.env.DATABASE_URL;
console.log(APIKEY);
const PORT = process.env.PORT;

// const client = new pg.Client(DATABASE_URL);
//gg

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

function needData(title, poster_path, overview) {
  this.title = title;
  this.poster_path = poster_path;
  this.overview = overview;
}

app.use(express.json());
app.get("/", endPointHandler);
app.get("/favorite", favoritePointHandler);
app.get("/trending", trendingData);
app.get("/search", searchHandler);
app.get("/collection", collectionHandler);
app.get("/company", companyHandler);
app.post("/addmovie", addMovieHandler);
app.get("/getMovies", getMoviesHandler);
app.get("/getMovie/:id", movieHandler);
app.put("/UPDATE/:id", updateHandler);
app.delete("/DELETE/:id", deleteHandler);
app.use("*", notFoundHandler);
app.use(errorHandler);

// app.get("/data", dataHandler);

// function endPointHandler(req, res) {
//   res.send("data");
//   //   console.log(data);
// }
function favoritePointHandler(req, res) {
  return res.send("Welcome to Favorite Page");
}

function endPointHandler(request, response) {
  let result = [];
  data.data.forEach((value) => {
    let newData = new needData(value.title, value.poster_path, value.overview);
    result.push(newData);
    console.log(result);
  });

  //   console.log(data);
  return response.json(data.data);
  //   return response.send("Hello World");
}

function trendingData(req, res) {
  let result = [];
  let trinding = axios
    .get(
        ` https://api.themoviedb.org/3/search/company?api_key=${APIKEY}&number=10`
    )
    .then((apiResponse) => {
      apiResponse.data.results.map((value) => {
        let newData = new needData(
          value.title || "N/A",
          value.poster_path || "N/A",
          value.overview || "N/A"
        );
        result.push(newData);
      });
      return res.status(200).json(result);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}

function searchHandler(req, res) {
  // console.log(req);
  let search = req.query.query;
  let result = [];
  axios
    .get(
        `https://api.themoviedb.org/3/search/company?api_key=${APIKEY}&query=${search}`
    )
    .then((results) => {
      res.send(results.data.results);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}

function collectionHandler(req, res) {
  let result = [];
  let trinding = axios
    .get(
      `https://api.themoviedb.org/3/collection/{collection_id}?api_key=${APIKEY}&language=en-US`
    )
    .then((apiResponse) => {
      apiResponse.data.results.map((value) => {
        let newData = new needData(
          value.title || "N/A",
          value.poster_path || "N/A",
          value.overview || "N/A"
        );
        result.push(newData);
      });
      return res.status(200).json(result);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}

function companyHandler(req, res) {
  let result = [];
  let trinding = axios
    .get(`https://api.themoviedb.org/3/company/{company_id}?api_key=${APIKEY}`)
    .then((apiResponse) => {
      apiResponse.data.results.map((value) => {
        let newData = new needData(
          value.title || "N/A",
          value.poster_path || "N/A",
          value.overview || "N/A"
        );
        result.push(newData);
      });
      return res.status(200).json(result);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}

function addMovieHandler(req, res) {
  const movieAdd = req.body;
  const sql = `INSERT INTO movieslibrary(title, poster_path, overview, comment) VALUES($1, $2, $3, $4) RETURNING *`;
  const values = [movieAdd.title, movieAdd.poster_path, movieAdd.overview, movieAdd.comment ];
  client.query(sql, values).then((result) => {
    res.status(201).json(result.rows);
  });
}

function getMoviesHandler(req, res) {
  const sql = `SELECT * FROM movieslibrary`;

  client.query(sql).then((result) => {
    res.status(200).json(result.rows);
  });
}

function movieHandler(req, res) {
  let id = req.params.id;

  const sql = `SELECT * FROM movieslibrary WHERE id=$1;`;
  const values = [id];
  client
    .query(sql, values)
    .then((result) => {
      return res.status(200).json(result.rows);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}

function updateHandler(req, res) {
  const id = req.params.id;
  const movie = req.body;

  const sql =  `UPDATE movieslibrary SET title=$1, poster_path=$2,overview=$3, comment=$4 WHERE id=$5 RETURNING *;`;

  const values = [movie.title, movie.poster_path, movie.overview, id];
  client
    .query(sql, values)
    .then((result) => {
      return res.status(200).json(result.rows);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}

function deleteHandler(req, res) {
  const id = req.params.id;
  const sql =  `DELETE FROM movieslibrary WHERE id=$1;`
  const values = [id];
  client
    .query(sql, values)
    .then((result) => {
      return res.status(204).json({});
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}

function errorHandler(error, req, res) {
  const err = {
    status: 500,
    message: error,
  };
  return res.status(500).send(err);
}

function notFoundHandler(req, res) {
  return res.status(500).send("page not found error");
}

client.connect().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log("listen to 4000");
  });
});
