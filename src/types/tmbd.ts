export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
    original_language: string;
    genre_ids: number[];
}

export interface PagedResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

export interface Genre {
    id: number;
    name: string;
}