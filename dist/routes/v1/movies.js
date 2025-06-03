import { Router } from 'express';
import { listMovies, getMovieDetails, getMoviesByGenre, getMoviesByYear, } from '../../controllers/movies.js';
const router = Router();
// GET routes for movies
// List all movies with pagination
router.get('/', listMovies);
// Get details of a specific movie by movieId
router.get('/:movieId', getMovieDetails);
// Get movies released in a specific year with pagination
router.get('/year/:year', getMoviesByYear);
// Get movies by genre
router.get('/genre/:genre', getMoviesByGenre);
// returns 404 if no route matches
router.all('*', (req, res) => {
    res.status(404).json({ error: 'Not Found' });
});
export default router;
