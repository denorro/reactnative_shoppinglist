import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import {Root, Button, Icon, Left, Right, Toast} from 'native-base';
import ShoppingListScreen from './src/screens/ShoppingListScreen';
import AddProductScreen from './src/screens/AddProductScreen';

const Navigator = StackNavigator({
  ShoppingList: {
    screen: ShoppingListScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Shopping List',
      headerTitleStyle:{alignSelf: 'center'},
      headerLeft: <Left>
                    <Button transparent onPress={() => Toast.show({
                        text: 'Menu',
                        buttonText: 'OK',
                        position: 'bottom'
                      })}>
                      <Icon name='menu' />
                    </Button>
                  </Left>,
      headerRight: <Right>
                    <Button transparent onPress={() => console.log('person')}>
                      <Icon name='add' />
                    </Button>
                  </Right>
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
      <Root>
        <Navigator />
      </Root>      
    );
  }
}
