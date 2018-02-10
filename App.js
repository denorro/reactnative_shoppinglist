import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import allReducers from './src/reducers/index';
import {StackNavigator} from 'react-navigation';
import {Root, Button, Icon, Left, Right, Toast} from 'native-base';
import ShoppingListScreen from './src/screens/ShoppingListScreen';
import AddProductScreen from './src/screens/AddProductScreen';

const store = createStore(allReducers);

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
    screen: AddProductScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Add Product',
      headerTitleStyle:{alignSelf: 'center'},
      headerLeft: <Left>
                    <Button transparent onPress={() => navigation.navigate('ShoppingList')}>
                      <Icon name='arrow-back' />
                    </Button>
                  </Left>,
      headerRight: <Right></Right>
    })
  }
});

export default class App extends Component {  
  constructor(){
    super();
  }

  render() {
    return (
      <Provider store={store}>
        <Root>
          <Navigator />
        </Root> 
      </Provider>           
    );
  }
}
