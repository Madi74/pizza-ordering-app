import { IOrder } from "../features/order.slice";
import { client } from "./client";

export interface Dish {
  title: string;
  price: number;
  image: string;
}

interface DishItem extends Dish {
  id: number;
}

interface Dishes {
  [id: string]: DishItem;
};

export const getMenu = async () => {
  const response = await client.get<Dishes>('menu.json');
  return response.data;
};

export const postOrder = async (order: IOrder) => {
    await client.post('orders.json', order);
  };