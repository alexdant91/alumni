import { configureStore } from "@reduxjs/toolkit";
import { emptyApiSlice } from "./features/emptyApiSlice";

export const store = configureStore({
  reducer: {
    [emptyApiSlice.reducerPath]: emptyApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptyApiSlice.middleware),
});
