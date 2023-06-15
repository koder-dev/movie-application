// Import the axios library
const axios = require('axios')

const getMovies = (done) => {
  // get all movies
  axios.get('http://localhost:3000/movies')
      .then((res) => done(null, res.data))
      .catch((err) => done(err));
}

const getMoviesById = (movieId, done) => {
  // get movie by id
  axios.get(`http://localhost:3000/movies/${movieId}`)
    .then((res) => done(null, res.data))
    .catch((err) => done(err));
};

const saveMovie = function (newMovie, done) {
  // save the details of a movie read from the request body
  axios.post('http://localhost:3000/movies', newMovie)
    .then((res) => done(null, res.data))
    .catch((err) => done(err));
}

const updateMovie = function (movieId, updateData, done) {
 // update movie details of a specific movie
  axios.put(`http://localhost:3000/movies/${movieId}`, updateData)
    .then((res) => done(null, res.data))
    .catch((err) => done(err));
}

const deleteMovieById = function (movieId, done) {
  // delete a specific movie
  axios.delete(`http://localhost:3000/movies/${movieId}`)
    .then((res) => done(null, res.data))
    .catch((err) => done(err));
}



module.exports = {
  getMovies,
  getMoviesById,
  saveMovie,
  updateMovie,
  deleteMovieById
}
