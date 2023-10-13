import { configureStore } from "@reduxjs/toolkit";
import { watchListReducer } from "./watchlist/watchListSlice";

export const store = configureStore({
  reducer: {
    watchListState: watchListReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
