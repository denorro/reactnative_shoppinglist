import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';

export default class ShoppingListScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      paddingTop: Platform.OS === 'ios' ? 10: 5
    },
    text: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 20
    }
  });