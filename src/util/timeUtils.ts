export const timeCalculator = (timeInMinutes: number) => {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes - 60 * hours
    return hours+":"+minutes.toString().padStart(2, "0");
}

export const translateDateTimeString = (timeString: string) => {
    const dateObject: Date = new Date(timeString)
    return dateObject.toLocaleDateString() + " " + dateObject.toLocaleTimeString();
}

export const translateDateTimeStringWithoutSeconds = (timeString: string) => {
    const string = translateDateTimeString(timeString);
    return string.substring(0, string.length-3);
}

export const getTimeFromDateTimeString = (dateTimeString: string) => {
    const localTimeString = translateDateTimeString(dateTimeString);
    const timeString = localTimeString.split(" ")[1];
    const timeWithoutSeconds = timeString.substring(0,5);

    return timeWithoutSeconds;
}