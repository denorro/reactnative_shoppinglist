import React, { Component } from 'react';
import {Container, Header, Title, Content, Footer, 
        FooterTab, Button, Left, Right, Body,
        Icon, Text, List, ListItem, CheckBox, Toast} from 'native-base';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { allProducts, toggle, deleteAll } from '../actions/actions';

class ShoppingListScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Shopping List',
    headerTitleStyle:{alignSelf: 'center'},
    headerLeft: <Left>
                  <Button transparent onPress={() => navigation.state.params.deleteAll()}>
                    <Icon name='remove' />
                  </Button>
                </Left>,
    headerRight: <Right>
                  <Button transparent onPress={() => navigation.navigate('AddProduct')}>
                    <Icon name='add' />
                  </Button>
                </Right>
  });

  constructor(props){
    super(props);
    this.deleteAll = this.deleteAll.bind(this);
  }

  deleteAll(){
    this.props.deleteAll();
  }

  componentWillMount(){
    this.props.allProducts();
    this.props.navigation.setParams({
      deleteAll: this.deleteAll
    });
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
      <Container style={{paddingBottom: 15}}>
          <Content padder>
              <List>
                {this.renderListItems()}
              </List>
          </Content>
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