
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppSelector } from '../../hooks/hooks';
import { selectBasketTotal, selectBasketValue } from '../../features/basket.slice';
import BasketItem from './BasketItem/BasketItem';

const OrderBasket = () => {
    const basket = useAppSelector(selectBasketValue);
    const total = useAppSelector(selectBasketTotal);

  return (
    <View style={styles.basket}>
      <Text style={styles.basket_title}>Your order:</Text>
      {basket.map((item) => (
        <BasketItem key={item.name} name={item.name} price={item.price} quantity={item.quantity}></BasketItem>
      ))}
      <View style={styles.basket_item}> 
        <View style={styles.info}>
            <Text style={styles.item_name}>Delivery:</Text>
        </View>
        <View>
            <Text>500 KZT</Text>
        </View>
      </View>
      <View style={styles.basket_item}> 
        <View style={styles.info}>
            <Text style={styles.item_name}>Total:</Text>
        </View>
        <View>
            <Text>{total + 500} KZT</Text>
        </View>
      </View>
    </View> 
  )
}

export default OrderBasket

const styles = StyleSheet.create({
    basket: {
        flex: 1,
        borderWidth: 1,
        padding: 10,
    },
    basket_title: {
        fontSize: 25,
        marginBottom: 20,
    },
    basket_item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
    },
    info: {
        paddingRight: 30
    },
    item_name: {
        fontSize: 20
    }
})