import { IMovieDetails } from "./IMovie";
import ITheater from "./ITheater";
import { ITicketFromScreening } from "./ITicket";

export interface IScreeningShortened {
    id: number,
    movie: IMovieDetails,
    theater: ITheater,
    ticketsSold: number,
    startTime: string
}

export interface IScreening {
    id: number,
    movie: IMovieDetails,
    theater: ITheater,
    tickets: ITicketFromScreening[],
    startTime: string
}

export interface IUpcomingScreening {
    [date: string]: IScreening[];
}

export interface IPurchaseModalContext {
    setShowPurchase: (screening: IScreening | undefined) => void,
    showSeatingMap: boolean,
    setShowSeatingMap: () => void,
}