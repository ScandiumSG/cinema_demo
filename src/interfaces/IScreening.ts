import { IMovieDetails } from "./IMovie";
import ITheater from "./ITheater";

export interface IScreening {
    id: number,
    movie: IMovieDetails,
    theater: ITheater,
    tickets: [],
    startTime: string
}

export interface IUpcomingScreening {
    [date: string]: IScreening[];
}