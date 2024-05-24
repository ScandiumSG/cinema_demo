import ISeat from "./ISeat";

export default interface ITheater {
    id: number,
    capacity: number,
    name: string, 
    seats: ISeat[]
}