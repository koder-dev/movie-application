// Import the required dependencies
const http = require("http");
const moviesService = require("./moviesService");
const getRequestData = require("./utils");

const {
  getMovies,
  getMoviesById,
  saveMovie,
  updateMovie,
  deleteMovieById
} = moviesService;
// Define the port at which the application will run
const PORT = 6000;

// Define the server
const server = http.createServer(async (req, res) => {
// Get all movies

  if (req.url === '/movies' && req.method === "GET") {
    await getMovies((err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-type': 'application/json'});
        res.end(JSON.stringify({ message: `Loading movies failed`, reason: err }));
      } else {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(JSON.stringify(data));
      }
    });
  }
  // Get a movie with specified id

  if (req.url.match(/\/movies\/([0-9]+)/) && req.method === 'GET') {
    const id = req.url.split('/')[2];
    await getMoviesById(id, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-type': 'application/json' });
        res.end(JSON.stringify({ message: `Loading movie failed`, reason: err }));
      } else {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(data));
      }
    });
  }


  // Save movie details

  if (req.url === '/movies' && req.method === 'POST') {
    const movieDetails = await getRequestData(req);
    await saveMovie(movieDetails, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-type': 'application/json' });
        res.end(JSON.stringify({ message: `Saving movie failed`, reason: err }));
      } else {
        res.writeHead(201, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(data));
      }
    })
  }
  // Update a specific movie

  if (req.url.match(/\/movies\/([0-9]+)/) && req.method === 'PUT') {
    const id = req.url.split('/')[2];
    const updateData = await getRequestData(req);
    await updateMovie(id, updateData, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-type': 'application/json' });
        res.end(JSON.stringify({ message: `Updating movie failed`, reason: err }));
      } else {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(data));
      }
    })
  }
  // Delete a specific movie
  if (req.url.match(/\/movies\/([0-9]+)/) && req.method === 'DELETE') {
    const id = req.url.split('/')[2];
    await deleteMovieById(id, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-type': 'application/json' });
        res.end(JSON.stringify({ message: `Deleting movie failed`, reason: err }));
      } else {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(data));
      }
    })
  }
  res.end();
});
// listen to the server on the specified port
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});

