// src/types/index.ts
export interface Movie {
    movieId: number;
    imdbId: string;
    title: string;
    overview: string;
    productionCompanies: string[];
    releaseDate: string;
    budget: number;
    revenue: number;
    runtime: number;
    language: string;
    genres: string[];
    status: string;
    avarageRating?: number | null; // Optional field for average rating
}

export interface Rating {
    ratingId: number;
    movieId: number;
    userId: string;
    rating: number;
    timestamp: string;
}