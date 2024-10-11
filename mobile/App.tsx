import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PostPage from './container/Menu/Menu';
import { Provider } from 'react-redux';
import { store } from './store/store';
import React from 'react';

export default function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <View style={styles.container}>
          <PostPage/>
        </View>
      </Provider>
    </React.StrictMode>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});