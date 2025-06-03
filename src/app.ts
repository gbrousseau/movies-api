import express from 'express';
import router from './routes/v1/movies.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/movies', router);

app.get('/', (req, res) => {
    res.send('Welcome to the Movie API!');
});

export default app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});