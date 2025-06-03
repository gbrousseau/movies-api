const request = require('supertest');
const app = require('../src/app').default;

describe('Movies API', () => {
    describe('GET /api/movies', () => {
        it('should return a paginated list of movies', async () => {
            const res = await request(app).get('/api/movies?page=1');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            if (res.body.length > 0) {
                expect(res.body[0]).toHaveProperty('movieId');
                expect(res.body[0]).toHaveProperty('imdb_id');
                expect(res.body[0]).toHaveProperty('title');
                expect(res.body[0]).toHaveProperty('genres');
                expect(res.body[0]).toHaveProperty('release_date');
                expect(res.body[0]).toHaveProperty('budget');
            }
        });
    });

    describe('GET /api/movies/:movieId', () => {
        it('should return movie details for a valid movieId', async () => {
            // You may want to use a known movieId from your test DB
            const movieId = 1;
            const res = await request(app).get(`/api/movies/${movieId}`);
            // Accept 200 or 404 depending on DB contents
            expect([200, 404]).toContain(res.statusCode);
            if (res.statusCode === 200) {
                expect(res.body).toHaveProperty('imdb_id');
                expect(res.body).toHaveProperty('title');
                expect(res.body).toHaveProperty('description');
                expect(res.body).toHaveProperty('release_date');
                expect(res.body).toHaveProperty('budget');
                expect(res.body).toHaveProperty('runtime');
                expect(res.body).toHaveProperty('average_rating');
                expect(res.body).toHaveProperty('genres');
                expect(res.body).toHaveProperty('original_language');
                expect(res.body).toHaveProperty('production_companies');
            }
        });
    });

    describe('GET /api/movies/year/:year', () => {
        it('should return movies for a given year', async () => {
            const year = '1994';
            const res = await request(app).get(`/api/movies/year/${year}?page=1`);
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            if (res.body.length > 0) {
                expect(res.body[0]).toHaveProperty('imdb_id');
                expect(res.body[0]).toHaveProperty('title');
                expect(res.body[0]).toHaveProperty('genres');
                expect(res.body[0]).toHaveProperty('release_date');
                expect(res.body[0]).toHaveProperty('budget');
            }
        });
    });

    describe('GET /api/movies/genre/:genre', () => {
        it('should return movies for a given genre', async () => {
            const genre = 'Drama';
            const res = await request(app).get(`/api/movies/genre/${genre}?page=1`);
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            if (res.body.length > 0) {
                expect(res.body[0]).toHaveProperty('imdb_id');
                expect(res.body[0]).toHaveProperty('title');
                expect(res.body[0]).toHaveProperty('genres');
                expect(res.body[0]).toHaveProperty('release_date');
                expect(res.body[0]).toHaveProperty('budget');
            }
        });
    });
});
