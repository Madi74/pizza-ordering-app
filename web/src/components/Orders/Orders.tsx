import { useEffect } from "react";
import { fetchOrders } from "../../features/orders.slice";
import { useAppDispatch } from "../../hooks/hooks";
import OrderItem from "../OrderItem/OrderItem";
import './Orders.css';

const Orders = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchOrders());
      }, [dispatch]);

  return (
    <div className="orders_container">
        <h1 className="orders_title">Orders</h1>
        <OrderItem/>
    </div>
  )
};

export default Orders;