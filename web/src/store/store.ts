import { configureStore } from "@reduxjs/toolkit";
import { menuSlice } from "../features/menu.slice";
import { orderSlice } from "../features/orders.slice";

export const store = configureStore({
    reducer: { 
        [menuSlice.name]: menuSlice.reducer,
        [orderSlice.name]: orderSlice.reducer
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;