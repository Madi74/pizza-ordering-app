import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from '../store/store';
import { getMenu } from "../api/post.api";

export interface DishItem {
  title: string;
  price: number;
  image: string;
  id: string;
}

export interface MenuState {
  menu: DishItem[];
  loading: boolean;
  error: string | null;
};

const initState: MenuState = {
  menu: [],
  loading: false,
  error: null,
};

export const fetchMenu = createAsyncThunk( 'menu/fetchMenu', async () => {
  const response = await getMenu();

  return Object.keys(response).map((id) => ({
    id,
    title: response[id].title,
    price: response[id].price,
    image: response[id].image,
  })); 
});

export const menuSlice = createSlice({
  name: 'menu',
  initialState: initState,
  reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchMenu.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchMenu.fulfilled, (state, action) => {
          state.loading = false;
          state.menu = action.payload;
        })
  },
});

export default menuSlice.reducer;

export const selectMenuValue = (state: RootState) => state.menu.menu;