export default interface ISeat {
    id: number,
    row: number,
    seatNumber: number
}

export interface ISeatData {
    seatId: number,
    seatRow: number,
    seatNumber: number,
    available: boolean,
}