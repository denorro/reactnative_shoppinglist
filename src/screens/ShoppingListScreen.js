import React, { Component } from 'react';
import {Container, Header, Title, Content, Footer, 
        FooterTab, Button, Left, Right, Body,
        Icon, Text, List, ListItem, CheckBox, Fab, Toast} from 'native-base';
import { allProducts, toggle, deleteAll } from '../actions/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class ShoppingListScreen extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.props.allProducts();
  }

  toggleItemComplete = (id) => {
    this.props.toggle(id);
  }

  renderListItems = () => {    
    const listItems = this.props.products.map(product =>       
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
               onPress={() => this.props.navigation.navigate('AddProduct')}>
            <Icon name="add"/>
          </Fab>
          <Fab position="bottomLeft"
               style={{backgroundColor:'red'}}
               onPress={() => this.props.deleteAll()}>
            <Icon name="remove" />
          </Fab>
      </Container>
    );
  }
}

function mapStateToProps(state){
  console.log(state);
  return {
    products: state.products.products
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({allProducts:allProducts, toggle:toggle, deleteAll: deleteAll}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ShoppingListScreen);