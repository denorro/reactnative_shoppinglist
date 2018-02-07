import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';

export default class AddProductScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" hidden={false} />
        <Text style={styles.text}>Grocery List</Text>
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
      paddingTop: Platform.OS === 'ios' ? 25: 5
    },
    text: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 20
    }
  });