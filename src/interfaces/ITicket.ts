import ISeat from "./ISeat";

export interface ITicketHandler {
    [ticketType: string]: number,
    totalTickets: number,
}

export interface ITicketFromScreening {
    id: number,
    seat: ISeat,
}