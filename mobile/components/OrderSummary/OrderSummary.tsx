
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { ChangeEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { clearBasket, selectBasketValue } from '../../features/basket.slice';
import OrderBasket from '../OrderBasket/OrderBasket';
import { createOrder } from '../../features/order.slice';

interface Props {
    ordered: () => void;
}

const OrderSummary = ({ ordered }: Props) => {
    const dispatch = useAppDispatch();
    const order = useAppSelector(selectBasketValue);
    const [customer, setCustomer] = useState({
        name: '',
        street: '',
        postal: ''
    });

    const customerChangeHandler = (name: string, value: string) => {
        setCustomer((prevCustomer) => ({ ...prevCustomer, [name]: value }));
    };
    
    const submitOrderHandler = async () => {
      if (inputValidation()) {
        await dispatch(createOrder({ customer, order }));
      }
      ordered();
    };

    const cancelOrderHandler = async () => {
        await dispatch(clearBasket());
        ordered();
    };
    
    const inputValidation = (): boolean => {
      let validation = true;
      if (!customer.name.trim() || !customer.postal.trim() || !customer.street.trim() || order.length === 0) {
        validation = false;
      };
      return validation;
    };

  return (
    <View style={styles.container}>
        <OrderBasket/>
      <Text style={styles.title}>Enter your Contact Data</Text>
      <View style={styles.form}>
        <TextInput 
        style={styles.input}
        placeholder="Your Name"
        value={customer.name}
        onChangeText={(text) => customerChangeHandler('name', text)}/>
        <TextInput 
        style={styles.input}
        placeholder="Street"
        value={customer.street}
        onChangeText={(text) => customerChangeHandler('street', text)}/>
        <TextInput 
        style={styles.input}
        placeholder="Postal code"
        value={customer.postal}
        onChangeText={(text) => customerChangeHandler('postal', text)}/>
        <TouchableOpacity style={styles.cancel_button} onPress={cancelOrderHandler}>
            <Text style={styles.button_text}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.order_button} onPress={submitOrderHandler} disabled={!inputValidation()}>
            <Text style={styles.button_text}>Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default OrderSummary

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
    },
    title: {
        margin: 10,
        fontSize: 17
    },
    form: {
        flex: 1,
    },
    input: {
        margin: 5,
        borderWidth: 1,
        padding: 10
    },
    order_button: {
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#efefef'  
    },
    cancel_button: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        marginTop: 60,
        backgroundColor: '#efefef' 
    },
    button_text: {
        textAlign: 'center'
    }
})