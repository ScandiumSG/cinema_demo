const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

// GENERAL FETCH OPTIONS
// TODO: Add auth token from user to this one
const fetchOptions = {
    "headers": {
        "Content-Type": "application/json",
    },
}

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
export const getUpcomingScreenings = (dateLimit: string, itemLimit: number) => {
    return baseScreeningUrl + "/upcoming/" + dateLimit + "?limit=" + itemLimit;
}

// AUTHENTICATION ENDPOINT
const authBaseUrl = baseUrl + "/auth";
export const loginUrl = () => authBaseUrl + "/login"
export const registerUrl = () => authBaseUrl + "/signup";