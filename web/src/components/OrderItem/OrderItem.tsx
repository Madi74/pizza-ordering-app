import { deleteOrder, selectOrdersValue } from "../../features/orders.slice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import './OrderItem.css';

const OrderItem = () => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(selectOrdersValue);

    const deletClickHandler = (id: string) => {
        dispatch(deleteOrder(id));
    }

  return (
    <div className="orders">
        {orders.map((order) => (
            <div className="order_item" key={order.id}>
                <div className="info_list">
                        {order.order.map((dish) => (
                            <div key={dish.name} className="order_list">
                            <div className="info">
                                <p className="item_name">{dish.quantity} x {dish.name}</p> 
                            </div>
                            <div className="price">
                                <p className="item_name">{dish.price} KZT</p> 
                            </div>
                            </div>
                        ))}
                        <div className="delivery">
                          <div className="info">
                            <p className="item_name">Delivery</p> 
                          </div>
                          <div className="price">
                            <p className="item_name">500 KZT</p> 
                          </div>
                        </div>
                </div>
                <div className="order_total">
                    <p className="order_total_title">Order total:</p>
                    <p className="order_total_sum">
                        {order.order.reduce((total, dish) => total + dish.price * dish.quantity, 500)} KZT
                    </p>
                    <button className="order_delet_button" onClick={() => deletClickHandler(order.id)}>Complete order</button>
                </div>
            </div>
        ))}
    </div>
  )
};

export default OrderItem;