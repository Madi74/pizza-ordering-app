import { configureStore } from "@reduxjs/toolkit";
import { menuSlice } from "../features/menu.slice";
import { basketSlice } from "../features/basket.slice";

export const store = configureStore({
    reducer: { 
        [menuSlice.name]: menuSlice.reducer, 
        [basketSlice.name]: basketSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;