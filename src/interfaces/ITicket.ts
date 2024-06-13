import { ITicketScreening } from "./IScreening";
import ISeat from "./ISeat";
import { IUserData } from "./UserInterfaces";

export interface ITicketHandler {
    [ticketType: string]: number,
    totalTickets: number,
}

export interface ITicketFromScreening {
    id: number,
    seat: ISeat,
    ticketType: ITicketType,
}

export interface ITicketPost {
    screeningId: number,
    movieId: number,
    customerId: string,
    seatId: number[],
    ticketTypeId: number[],
}

export interface ITicket {
    customer: IUserData | null,
    id: number,
    screening: ITicketScreening,
    screeningId: number,
    seat: ISeat,
    ticketType: ITicketType,
}

export interface ITicketType {
    id: number,
    name: string,
    description: string,
    price: number,
    isActive: boolean,
}