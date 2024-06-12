import ISeat from "./ISeat";

export interface ITheaterWithoutSeat {
    id: number,
    capacity: number,
    name: string, 
}

export default interface ITheater extends ITheaterWithoutSeat {
    seats: ISeat[]
}
