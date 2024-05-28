export const timeCalculator = (timeInMinutes: number) => {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes - 60 * hours
    return hours+":"+minutes.toString().padStart(2, "0");
}

export const translateDateTimeString = (timeString: string) => {
    const dateObject: Date = new Date(timeString)
    return dateObject.toLocaleDateString() + " " + dateObject.toLocaleTimeString();
}

export const getTimeFromDateTimeString = (dateTimeString: string) => {
    const timeString = dateTimeString.split("T")[1];
    const timeWithoutSeconds = timeString.substring(0,5);

    return timeWithoutSeconds;
}