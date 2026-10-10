export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_patch: string | null;
    release_date: string;
    vote_average: number;
}

export interface PagedResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}