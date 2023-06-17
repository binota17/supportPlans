import { noteState } from "../../../types/noteTypes"

const getNoteListByTime = (NoteList: noteState[], filterDate: Date) => {
    let newNoteList = NoteList.filter((note) => isSameDay(new Date(note.date), filterDate))
    return newNoteList;
}

const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    )
}

export default getNoteListByTime