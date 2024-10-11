import { IOrder } from "../features/orders.slice";
import { client } from "./client";

export interface Dish {
  title: string;
  price: number;
  image: string;
};

interface DishItem extends Dish {
  id: string;
};

interface Dishes {
  [id: string]: DishItem;
};

interface Orders {
  [id: string]: IOrder;
};

export const getMenu = async () => {
  const response = await client.get<Dishes>('menu.json');
  return response.data;
};

export const addDish = async <Dishes>(dish: DishItem) => {
  const response = await client.post<Dishes>('menu.json', { ...dish });
  return response.data;
};

export const deletDish = async (id: string) => {
  await client.delete<{id: string}>(`menu/${id}.json`);
  return id;
};

export const updateDish = async (dish: DishItem): Promise<DishItem> => {
  const response = await client.put<DishItem>(`menu/${dish.id}.json`, dish);
  return response.data;
};

export const getOrders = async () => {
  const response = await client.get<Orders>('orders.json');
  return response.data;
};

export const deletOrder = async (id: string) => {
  await client.delete<{id: string}>(`orders/${id}.json`);
  return id;
};