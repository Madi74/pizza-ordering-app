import { SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BasketItem, clearBasket } from "./basket.slice";
import { postOrder } from "../api/post.api";

export interface IOrder {
    order: BasketItem[];
    customer: ICustomer;
};
  
export interface IOrderWithId extends IOrder {
    id: string;
};

export interface OrderState {
    orders: IOrderWithId[];
    loading: boolean;
    error: SerializedError | null;
};

export interface ICustomer {
    name: string;
    street: string;
    postal: string;
};

const initOrderState: OrderState = {
    orders: [],
    loading: false,
    error: null,
};
  
export const createOrder = createAsyncThunk('order/create', async (order: IOrder, thunkAPI) => {
  const orderData = {
    customer: {
      name: order.customer.name,
      street: order.customer.street,
      postal: order.customer.postal,
    },
    order: order.order.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  };
    await postOrder(orderData);
    thunkAPI.dispatch(clearBasket());
});
  
export const orderSlice = createSlice({
    name: 'order',
    initialState: initOrderState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createOrder.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createOrder.fulfilled, (state) => {
          state.loading = false;
          state.error = null;
        })
        .addCase(createOrder.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error;
        });
    },
});  