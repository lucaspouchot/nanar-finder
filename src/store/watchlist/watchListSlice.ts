import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieCardInterface } from "../../interfaces/movie.interface";

const watchListSlice = createSlice({
  name: "watchList",
  initialState: JSON.parse(localStorage.getItem('watchList') || '[]') as MovieCardInterface[],
  reducers: {
    add(state, action: PayloadAction<MovieCardInterface>) {
      state.push(action.payload);
      localStorage.setItem('watchList', JSON.stringify(state));
      return state;
    },
    remove(state, action: PayloadAction<number>) {
      state = state.filter((movie) => movie.id !== action.payload);
      localStorage.setItem('watchList', JSON.stringify(state));
      return state;
    }
  }
});

export const { add: addMovieToWatchlist, remove: removeMovieFromWatchlist } = watchListSlice.actions;
export const watchListReducer = watchListSlice.reducer;
