import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchState } from "../types";
import { RootState } from "../store";

const initialState: SearchState = {
  searchTerms: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerms: (state, action: PayloadAction<string>) => {
      state.searchTerms = action.payload;
    },
  },
});

export const { setSearchTerms } = searchSlice.actions;

export const selectSearchTerms = (state: RootState) => {
  return state.search.searchTerms;
};

export default searchSlice.reducer;
