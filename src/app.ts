import express, { Request, Response } from 'express';
import moviesRouter from './routes/v1/movies';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/movies', moviesRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Movie API!');
});

export default app;

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
