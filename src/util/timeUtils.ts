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

export const getRoundedCurrentTimeIsoString = () => {
    const curDate = new Date();
    curDate.setSeconds(0,0);

    const mins = curDate.getMinutes();
    const roundedMins = Math.floor(mins / 5) * 5;

    curDate.setMinutes(roundedMins);

    return curDate.toISOString();
}

export const determineDayString = (inputDateString: string) => {

    const dayOfWeek: String[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
        returnString += `${dayOfWeek[dateObject.getDay()]}, ${dateObject.toLocaleDateString("no", {day: 'numeric', month: 'long', year: 'numeric'})}`;
    }

    return returnString;
}