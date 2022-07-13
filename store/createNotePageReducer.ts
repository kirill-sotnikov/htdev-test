import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Note {
  text: string;
  sign: string;
  date: string | undefined;
  tz: string;
}

const initialState: Note = {
  text: "",
  sign: "",
  date: "",
  tz: "",
};

export const createNotePage = createSlice({
  name: "createNotePage",
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    setSign: (state, action: PayloadAction<string>) => {
      state.sign = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setTz: (state, action: PayloadAction<string>) => {
      state.tz = action.payload;
    },
  },
});

export const { setText, setSign, setDate, setTz } = createNotePage.actions;

export default createNotePage.reducer;
