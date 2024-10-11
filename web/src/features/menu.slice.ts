import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from '../store/store';
import { addDish, deletDish, getMenu, updateDish } from "../api/menu.api";

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

export const fetchMenu = createAsyncThunk<DishItem[]>( 'menu/fetchMenu', async () => {
  const response = await getMenu();

  return Object.keys(response).map((id) => ({
    id,
    title: response[id].title,
    price: response[id].price,
    image: response[id].image
  })); 
});

export const addNewDish = createAsyncThunk<DishItem, DishItem>('menu/addNewDish', async (dish) => {
  const response = await addDish(dish);
  return response as DishItem;
});

export const deleteDish = createAsyncThunk<string, string>( 'menu/deleteDish', async (id) => {
  return await deletDish(id);
});

export const editingDish = createAsyncThunk('menu/editDish', async (dish:DishItem) => {
  const response = await updateDish(dish);
  return response;
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
          .addCase(addNewDish.pending, (state) => {
            state.error = null;
          })
          .addCase(addNewDish.fulfilled, (state, action: PayloadAction<DishItem>) => {
            state.menu.push(action.payload);
          })
          .addCase(deleteDish.fulfilled, (state, action) => {
            state.menu = state.menu.filter((dish) => dish.id !== action.payload);
          })
  },
});

export default menuSlice.actions;

export const selectDishById = (state: RootState, id: string) => {
  return state.menu.menu.find((dish) => dish.id === id);
};

export const selectMenuValue = (state: RootState) => state.menu.menu;