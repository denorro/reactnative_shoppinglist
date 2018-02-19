import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import {Root, Button, Icon, Left, Right, Toast} from 'native-base';
import ShoppingListScreen from './src/screens/ShoppingListScreen';

const Navigator = StackNavigator({
  ShoppingList: {
    screen: ShoppingListScreen,
  }
});

export default class App extends Component {  
  constructor(){
    super();
  }

  render() {
    return (
        <Root>
          <Navigator />
        </Root> 
    );
  }
}
