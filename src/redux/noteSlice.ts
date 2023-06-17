


import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { defaultFont, noteState } from "../types/noteTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeData } from "../asyncstorage";


type initialStateType = {
  noteList: noteState[];
};

const noteList: noteState[] = [

];

const initialState: initialStateType = {
  noteList,
}

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNotes(state, action: PayloadAction<noteState[]>) {
      state.noteList = action.payload;
    },
    addNote(state, action: PayloadAction<noteState>) {
      state.noteList.push(action.payload);
      storeData(state.noteList)
    },
    sortNotesByTime: (state) => {
      state.noteList = state.noteList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    },
    updateNote: (state, action: PayloadAction<noteState>) => {
      const {
        payload: { title, id, desc, date, font, position, medias, stickers },
      } = action;

      state.noteList = state.noteList.map((Note) =>
        Note.id === id ? { ...Note, desc, title, date, font, position, medias, stickers } : Note,
      );
      storeData(state.noteList)
    },
    deleteNote: (state, action: PayloadAction<{ id: string }>) => {
      state.noteList = state.noteList.filter((note) => note.id !== action.payload.id);
      storeData(state.noteList)
    },
  },
});





export const { addNote, updateNote, deleteNote, sortNotesByTime, setNotes } = noteSlice.actions;
export default noteSlice.reducer;