import { IMovieDetails } from "./IMovie";
import ISeat from "./ISeat";
import { ITheaterWithoutSeat } from "./ITheater";
import { IUserData } from "./UserInterfaces";

export interface ITicketHandler {
    [ticketType: string]: number,
    totalTickets: number,
}

export interface ITicketFromScreening {
    id: number,
    seat: ISeat,
}

export interface ITicketPost {
    screeningId: number,
    movieId: number,
    customerId: string,
    seatId: number[],
}

export interface ITicket {
    customer: IUserData | null,
    id: number,
    screening: {
        id: number,
        movie: IMovieDetails,
        startTime: string,
        theater: ITheaterWithoutSeat,
    },
    screeningId: number,
    seat: ISeat,
}