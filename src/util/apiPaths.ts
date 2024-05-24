const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

// MOVIE ENDPOINT
const movieBaseUrl = baseUrl + "/movie"
export const getMoviesUnlimited = () => movieBaseUrl;
export const getMoviesLimited = (limit: number) => 
    baseUrl + "/movie?limit="+limit;
export const getSpecificMovieById = (id: number) => 
    movieBaseUrl + "/" + id

// SCREENING ENDPOINT
const baseScreeningUrl = baseUrl + "/screening"
export const getScreeningDetails = (movieId: number, screeningId: number) => {
    return baseScreeningUrl + "/" + screeningId + "-" + movieId;
}

// AUTHENTICATION ENDPOINT
const authBaseUrl = baseUrl + "/auth";
export const loginUrl = () => authBaseUrl + "/login"
export const registerUrl = () => authBaseUrl + "/signup";