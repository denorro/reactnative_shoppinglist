import React, { Component } from 'react';
import {Container, Header, Title, Content, Footer, 
        FooterTab, Button, Left, Right, Body,
        Icon, Text, List, ListItem, CheckBox, Fab, Toast} from 'native-base';

export default class ShoppingListScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: [
        {id:1, name: 'Bread', complete: false},
        {id:2, name: 'Eggs', complete: false},
        {id:3, name: 'Milk', complete: false},
        {id:4, name: 'Corn', complete: false},
        {id:5, name: 'Dog Food', complete: false},
        {id:6, name: 'Meat', complete: false},
        {id:7, name: 'Cereal', complete: false},
        {id:8, name: 'Water', complete: false},
        {id:9, name: 'Veggies', complete: false},
        {id:10, name: 'Tissue', complete: false},
        {id:11, name: 'Medicine', complete: false},
        {id:12, name: 'Shoes', complete: false},
        {id:13, name: 'Soap', complete: false},
        {id:14, name: 'Paper Towels', complete: false},
        {id:15, name: 'Toothpaste', complete: false},
        {id:16, name: 'Mouthwash', complete: false},
        {id:17, name: 'Trash Bags', complete: false},
        {id:18, name: 'Tea', complete: false},
        {id:19, name: 'Candy', complete: false},
        {id:20, name: 'Detergent', complete: false}
      ]
    }
  }

  toggleItemComplete = (id) => {
    const index = this.state.products.findIndex(x => x.id === id);
    const productsCopy = [...this.state.products];
    productsCopy[index].complete = !productsCopy[index].complete;
    this.setState({
      ...this.state, productsCopy
    });
  }

  renderListItems = () => {    
    const listItems = this.state.products.map(product =>       
        <ListItem key={product.id}>
          <Body>
            <Text>{product.name}</Text>
          </Body>
          <Right>
            <CheckBox checked={product.complete} onPress={() => this.toggleItemComplete(product.id)}/>
          </Right>
        </ListItem>
    )
    return listItems;
  }

  render() {
    return (
      <Container>
          <Content padder>
              <List>
                {this.renderListItems()}
              </List>
          </Content>
          <Fab position="bottomRight" 
               style={{backgroundColor:'green'}}
               onPress={() => Toast.show({text:'Adding Product'})}>
            <Icon name="add"/>
          </Fab>
          <Fab position="bottomLeft"
               style={{backgroundColor:'red'}}
               onPress={() => Toast.show({text: 'Deleting All Products'})}>
            <Icon name="remove" />
          </Fab>
      </Container>
    );
  }
}