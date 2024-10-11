
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { removeFromBasket } from '../../../features/basket.slice'
import { useAppDispatch } from '../../../hooks/hooks';

interface BasketItemProps {
    name: string;
    price: number;
    quantity: number;
  };

const BasketItem = ({ name, price, quantity }: BasketItemProps) => {
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (name: string) => {
    dispatch(removeFromBasket(name)); 
  };
  
  return (
    <View style={styles.basket_item}>
        <View style={styles.info}>
            <Text style={styles.item_name}>{name} x {quantity}</Text>
        </View>
        <View>
            <Text style={styles.item_name}>{price * quantity} KZT</Text>
        </View>
        <TouchableOpacity onPress={() => handleRemoveFromCart(name)} style={styles.delet_button}>
            <Text>X</Text>
        </TouchableOpacity>
    </View>
  )
}

export default BasketItem;

const styles = StyleSheet.create({
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
    },
    delet_button: {
        borderWidth: 1,
        padding: 10,
    }
})