import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import ShoppingListScreen from './src/screens/ShoppingListScreen';
import AddProductScreen from './src/screens/AddProductScreen';

const Navigator = StackNavigator({
  ShoppingList: {
    screen: ShoppingListScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Shopping List',
      headerTitleStyle:{alignSelf: 'center'}
    })
  },
  AddProduct: {
    screen: AddProductScreen
  }
});

export default class App extends Component {
  
  constructor(){
    super();
  }

  render() {
    return (
      <Navigator />
    );
  }
}
