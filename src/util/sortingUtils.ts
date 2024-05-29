import { IScreening, IUpcomingScreening } from "@/interfaces/IScreening";

export const sortScreeningsByDate = (screeningList: IScreening[]) => {

    const screeningsByDate: IUpcomingScreening = {};
    screeningList?.forEach((screening: IScreening) => {
        const date = screening.startTime.split("T")[0]
        // Check if the date already exists in the object
        if (!screeningsByDate[date]) {
            // If not, create a new array for that date
            screeningsByDate[date] = [];
        }
        screeningsByDate[date].push(screening);
    })
    return screeningsByDate;
}