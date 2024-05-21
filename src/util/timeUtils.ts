export const timeCalculator = (timeInMinutes: number) => {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes - 60 * hours
    return hours+":"+minutes.toString().padStart(2, "0");
}