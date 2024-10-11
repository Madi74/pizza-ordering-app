import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../hooks/hooks';
import { fetchMenu } from '../../features/menu.slice';
import MenuItem from '../../components/Dishes/Dishes';
import Dishes from '../../components/Dishes/Dishes';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

const PostPage = () => {
    const dispatch = useAppDispatch();
    const [isModal, setIsModal] = useState(false);

    const toggleModal = () => {
        setIsModal(!isModal);
    };

    useEffect(() => {
        dispatch(fetchMenu());
    }, [dispatch]);

  return (
    <View style={styles.container}>
        {isModal 
        ? (
          <Modal>
            <OrderSummary ordered={toggleModal}/>
        </Modal>  
        ) : (
            <View style={styles.wrap}>
                <View style={styles.header}>
            <Text style={styles.header_title}>Turtle Pizza</Text>
        </View>
               <ScrollView style={styles.dishes}>
            <Dishes/>
        </ScrollView>
        <View style={styles.checkout}>
            <TouchableOpacity onPress={toggleModal} style={styles.checkout_button}>
                <Text>Checkout</Text>
            </TouchableOpacity>
        </View> 
            </View>
        )}
    </View>
  )
}

export default PostPage

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: '#babab7'
    },
    header: {
        backgroundColor: '#cab575',
        padding: 20,
    },
    header_title: {
        marginTop: 30,
        fontSize: 21,
    },
    wrap: {
        flexDirection: 'column',
        flex: 1
    },
    dishes: {
        width: '100%',
        marginTop: 20, 
        flex: 1
    },
    checkout: {
        alignItems: 'center',
        marginBottom: 30,
    },
    checkout_button: {
        width: 150,
        backgroundColor: '#cab575',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    }
});