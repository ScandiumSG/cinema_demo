const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

// MOVIE ENDPOINT
const movieBaseUrl = baseUrl + "movie/"
export const getMoviesUnlimited = () => movieBaseUrl;
export const getMoviesLimited = (limit: number) => 
    baseUrl + "/movie?limit="+limit;
export const getSpecificMovieById = (id: number) => 
    movieBaseUrl + id