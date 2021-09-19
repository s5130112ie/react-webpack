import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "./roomsSlice";

export const store = configureStore({
    reducer: roomsReducer
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
