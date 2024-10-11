
import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const Modal = ({children}: Props) => {
  return (
    <View style={styles.modal_container}>
      {children}
    </View>
  )
}

export default Modal

const styles = StyleSheet.create({
    modal_container: {
        width: 420,
        padding: 10,
        flex: 1,
    }
});