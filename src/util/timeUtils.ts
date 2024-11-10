export const timeCalculator = (timeInMinutes: number) => {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes - 60 * hours;
    return hours + ":" + minutes.toString().padStart(2, "0");
};

export const translateDateTimeString = (timeString: string) => {
    const dateObject: Date = new Date(timeString);
    return (
        dateObject.toLocaleDateString() + " " + dateObject.toLocaleTimeString()
    );
};

export const translateDateTimeStringWithoutSeconds = (timeString: string) => {
    const string = translateDateTimeString(timeString);
    return string.substring(0, string.length - 3);
};

/**
 * Convert a DateTime string into human readable hour:minute format
 * @param dateTimeString A DateTime string on the format YYYY-MM-DDThh:mm:ssZ
 * @returns A motified time string containing only the hour and minutes on the format hh:mm
 */
export const getTimeFromDateTimeString = (dateTimeString: string) => {
    console.log(dateTimeString);
    const localTimeString = translateDateTimeString(dateTimeString);
    const timeString = localTimeString.split(" ")[1];
    let timeWithoutSeconds = "";

    // Make substring if hours contain 2 digit
    if (timeString.split(":")[0].length > 1) {
        timeWithoutSeconds = timeString.substring(0, 5);
    } else {
        timeWithoutSeconds = timeString.substring(0, 4);
    }

    return timeWithoutSeconds;
};

export const getDateFromDateTimeString = (dateTimeString: string) => {
    const dateObject: Date = new Date(dateTimeString);
    const localDateTimeString = dateObject.toLocaleDateString("no", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return localDateTimeString;
};

export const getRoundedCurrentTimeIsoString = () => {
    const curDate = new Date();
    curDate.setSeconds(0, 0);

    const mins = curDate.getMinutes();
    const roundedMins = Math.floor(mins / 5) * 5;

    curDate.setMinutes(roundedMins);

    return curDate.toISOString();
};

export const determineDayString = (inputDateString: string) => {
    const dayOfWeek: String[] = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const inputDate = new Date(inputDateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Normalize the time parts to compare only date
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    const dateObject: Date = new Date(inputDateString);
    let returnString = "";
    if (inputDate.getTime() === today.getTime()) {
        returnString += "Today";
    } else if (inputDate.getTime() === tomorrow.getTime()) {
        returnString += "Tomorrow";
    } else {
        returnString += `${
            dayOfWeek[dateObject.getDay()]
        }, ${dateObject.toLocaleDateString("no", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })}`;
    }

    return returnString;
};
