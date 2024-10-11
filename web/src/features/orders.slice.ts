import { SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { deletOrder, getOrders } from "../api/menu.api";

export interface IOrder {
    order: OrderItem[];
    customer: ICustomer;
    id: string;
};

interface ICustomer {
    name: string;
    street: string;
    postal: string;
};

interface OrderItem {
    name: string;
    price: number;
    quantity: number;
};

export interface OrdersState {
    orders: IOrder[];
    loading: boolean;
    error: SerializedError | null;
};

const initState: OrdersState = {
    orders: [],
    loading: false,
    error: null,
};
  
  export const fetchOrders = createAsyncThunk<IOrder[]>( 'orders/fetchOrders', async () => {
    const response = await getOrders();
  
    return Object.keys(response).map((id) => ({
      id,
      order: response[id].order,
      customer: response[id].customer
    })); 
  });

  export const deleteOrder = createAsyncThunk<string, string>( 'orders/deleteOrder', async (id) => {
    return await deletOrder(id);
  });
  
  export const orderSlice = createSlice({
    name: 'orders',
    initialState: initState,
    reducers: {},
      extraReducers: (builder) => {
          builder
            .addCase(fetchOrders.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
              state.loading = false;
              state.orders = action.payload;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter((order) => order.id !== action.payload);
              })
        }
  });
  
  export default orderSlice.actions;
  
  export const selectOrdersValue = (state: RootState) => state.orders.orders;