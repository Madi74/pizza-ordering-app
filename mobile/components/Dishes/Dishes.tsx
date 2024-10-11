import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { DishItem, selectMenuValue } from '../../features/menu.slice';
import { BasketItem, addToBasket } from '../../features/basket.slice';

const Dishes = () => {
  const dispatch = useAppDispatch();
  const menu = useAppSelector(selectMenuValue);

  const handleAddToBasket = (dish: DishItem ) => {
    dispatch(addToBasket({ name: dish.title, price: dish.price, quantity: 1 }));
  };

  return (
    <View style={styles.dish_wrap}>
      {menu.map((dish) => (
        <TouchableOpacity style={styles.dish_card} key={dish.id} onPress={() => handleAddToBasket(dish)}>
          <Image style={styles.dish_img} source={{ uri: dish.image }} />
          <Text style={styles.dish_title}>{dish.title}</Text>
          <Text style={styles.dish_price}>{dish.price}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
};

export default Dishes;

const styles = StyleSheet.create({
  dish_wrap: {},
  dish_card: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffff',
    borderWidth: 1,
    margin: 5,
    padding: 5
  },
  dish_img: {
    marginRight: 5,
    width: 80,
    height: 80
  },
  dish_title: {
    width: 270,
    fontSize: 14,
    margin: 5
  },
  dish_price: {
    margin: 5
  }
});