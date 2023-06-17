export const getFullCalendarTime = (date: Date) => {
    return ((date.getDay() ? "Thứ " +
        (date.getDay() + 1) : "Chủ nhật") +
        " " +
        ('0' + date.getDate()).slice(-2) +
        "/" +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        "/" +
        date.getFullYear());
}

export const getTime = (date: Date) => {
    return (('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2))
}

export const getDay = (date: Date) => {

    return ((date.getDay() ? "Thứ " +
        (date.getDay() + 1) : "Chủ nhật"))
}




export const getCalendarTime = (date: Date) => {

    return (
        ('0' + date.getDate()).slice(-2) +
        "/" +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        "/" +
        date.getFullYear());
}