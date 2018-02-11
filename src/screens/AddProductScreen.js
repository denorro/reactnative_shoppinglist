import React, { Component } from 'react';
import {Container, Content, Button, Form, Item, Input, Label, Icon, Text, Toast} from 'native-base';
import { add } from '../actions/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class AddProductScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      product: '',
    }
  }

  addProduct(){
    if(this.state.product !== ''){
      this.props.add(this.state.product);
      const msg = `${this.state.product} was added to your list!`;
      Toast.show({text: msg, buttonText: 'OK', position: 'bottom', type: "success", duration: 3000});
      this.setState({product:''});
    }    
  }

  render() {
    return (
      <Container style={{padding: 10}}>
        <Content>
          <Form style={{marginBottom: 10}}>
            <Item>
              <Input placeholder="Product Name..." 
                     value={this.state.product} 
                     onChangeText={(newText) => this.setState({product: newText})}
              />
            </Item>
          </Form>
          <Button success block onPress={() => this.addProduct()}>
            <Text>Add Product</Text>
          </Button>
        </Content>
      </Container>      
    );
  }
}

function mapStateToProps(state){
  return {
    products: state.products.products
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({add:add}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(AddProductScreen);