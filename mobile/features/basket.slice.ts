import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export interface BasketItem {
  name: string;
  price: number;
  quantity: number;
};
  
export interface BasketState {
  items: BasketItem[],
  total: number,
};

const initState: BasketState = {
    items: [],
    total: 0,
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState: initState,
  reducers: {
    addToBasket: (state, action: PayloadAction<BasketItem>) => {
      const { name, price, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ name, price, quantity });
      }
      state.total += price * quantity;
    },
    removeFromBasket: (state, action: PayloadAction<string>) => {
      const name = action.payload;
      const item = state.items.find((item) => item.name === name);
      if (item) {
        state.items = state.items.filter((item) => item.name !== name);
        state.total -= item.price * item.quantity;
      }
    },
    clearBasket: () => {
        return initState;
    }
  },
});

export const { addToBasket, removeFromBasket, clearBasket } = basketSlice.actions;

export const selectBasketValue = (state: RootState) => state.basket.items;
export const selectBasketTotal = (state: RootState) => state.basket.total;