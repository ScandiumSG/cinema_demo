export default interface ISeat {
    id: number,
    row: number,
    seatNumber: number
}

export interface ISeatWithTicket extends ISeat {
    ticketType: number,
}

export interface ISeatData {
    seatId: number,
    seatRow: number,
    seatNumber: number,
    available: boolean,
}

export interface ISeatingContext {
    selectSeat: (seat: ISeatWithTicket) => void;
    discardSeat: (seat: ISeatWithTicket) => void;
    allowSeating: boolean,
    toggleAllowSeating: () => void,
}