import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import SwipeList from './components/SwipeList';


export default function App() {
  return (
    <View style={styles.container}>
      <SwipeList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 50,
    flexWrap: 'wrap'
  },
  switch: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 2,
    paddingVertical: 10,
    width: Dimensions.get('window').width / 3
  }
});
