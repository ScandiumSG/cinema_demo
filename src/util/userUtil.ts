const storageAddress = "login_claim"

export const readSessionStorage = () => {
    // If item does not exists it returns null
    const readStatus = sessionStorage.getItem(storageAddress)
    if (readStatus === null) {
        return undefined
    } else {
        return JSON.parse(readStatus)
    }
}