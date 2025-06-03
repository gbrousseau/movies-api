import { Request, Response } from 'express';
import path from 'path';
import sqlite3 from 'sqlite3';
import { Movie } from '../types/index.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MOVIES_DB_PATH = path.join(__dirname, '../../db/movies.db');
const RATINGS_DB_PATH = path.join(__dirname, '../../db/ratings.db');

function openDb(dbPath: string): sqlite3.Database {
    return new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);
}

export const listMovies = (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 50;
    const offset = (page - 1) * limit;
    const db = openDb(MOVIES_DB_PATH);
    db.all(
        `SELECT movieId, imdbId as imdb_id, title, genres, releaseDate as release_date, printf('$%,.2f', budget) as budget FROM movies LIMIT ? OFFSET ?`,
        [limit, offset],
        (err, rows) => {
            db.close();
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        }
    );
};

export const getMovieDetails = (req: Request, res: Response) => {
    const { movieId } = req.params;
    const db = openDb(MOVIES_DB_PATH);
    db.get(
        `SELECT imdbId as imdb_id, title, overview, releaseDate as release_date, printf('$%,.2f', budget) as budget, runtime, genres, language FROM movies WHERE movieId = ?`,
        [movieId],
        (err: Error | null, movie: Movie) => {
            if (err || !movie) {
                db.close();
                return res.status(404).json({ error: 'Movie not found' });
            }
            const ratingsDb = openDb(RATINGS_DB_PATH);
            ratingsDb.get(
                `SELECT AVG(rating) as average_rating FROM ratings WHERE movieId = ?`,
                [movieId],
                (err2, ratingRow: { average_rating: number } | undefined) => {
                    db.close();
                    ratingsDb.close();
                    if (err2) return res.status(500).json({ error: err2.message });
                    (movie as any).average_rating = ratingRow?.average_rating ?? null;
                    res.json(movie);
                }
            );
        }
    );
};

export const getMoviesByYear = (req: Request, res: Response) => {
    const { year } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = 50;
    const offset = (page - 1) * limit;
    const db = openDb(MOVIES_DB_PATH);
    db.all(
        `SELECT imdbId as imdb_id, title, genres, releaseDate as release_date, printf('$%,.2f', budget) as budget FROM movies WHERE strftime('%Y', releaseDate) = ? ORDER BY title DESC LIMIT ? OFFSET ?`,
        [year, limit, offset],
        (err, rows) => {
            db.close();
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        }
    );
};

export const getMoviesByGenre = (req: Request, res: Response) => {
    const { genre } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = 50;
    const offset = (page - 1) * limit;
    const db = openDb(MOVIES_DB_PATH);
    db.all(
        `SELECT imdbId as imdb_id, title, genres, releaseDate as release_date, printf('$%,.2f', budget) as budget FROM movies WHERE genres LIKE ? LIMIT ? OFFSET ?`,
        [`%${genre}%`, limit, offset],
        (err, rows) => {
            db.close();
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        }
    );
};
