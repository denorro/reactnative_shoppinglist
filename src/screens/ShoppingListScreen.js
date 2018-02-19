import React, { Component } from 'react';
import {Container, Header, Title, Content, Footer, 
        FooterTab, Button, Left, Right, Body,
        Icon, Text, List, ListItem, CheckBox, Toast, Spinner} from 'native-base';
import prompt from 'react-native-prompt-android';
import { AsyncStorage } from 'react-native';

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
                  <Button 
                    transparent 
                    onPress={() => navigation.state.params.promptToAddProduct()}>
                    <Icon name='add' />
                  </Button>
                </Right>
  });

  constructor(){
    super();
    this.state = {
      isLoading: false,
      products: []
    };
    this.deleteProduct = this.deleteProduct.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.promptToAddProduct = this.promptToAddProduct.bind(this);
  }

  componentWillMount(){
    this.setState({isLoading: true});
    this.props.navigation.setParams({
      deleteAll: this.deleteAll,
      promptToAddProduct: this.promptToAddProduct
    });    
    setTimeout(() => {this.getProductsFromStorage()}, 3000);    
  }

  async componentWillUnmount(){
    await AsyncStorage.setItem('@allProducts', JSON.stringify(this.state.products));
  }

  async getProductsFromStorage(){
    const savedProducts = await AsyncStorage.getItem('@allProducts')
      .then(data => {
        console.log(data);
        const storageData = (data === null || data === '') ? '[]' : data;
        this.setState({
          products: JSON.parse(storageData),
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error);
        Toast.show({
          text: error.message, 
          buttonText: 'OK', 
          position:"bottom", 
          type:'danger'
        });
      });
  }

  promptToAddProduct(){
    prompt('Enter Product Name',null, 
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'OK', 
          onPress: (product) => this.addProduct(product)
        }
      ],
      { type: 'plain-text'}
    );
  }

  async addProduct(product){
    if(product !== ''){   
      const newList = this.state.products.concat({
        id: '_' + Math.random().toString(36).substr(2, 9),
        name: product,
        complete: false
      });
      await AsyncStorage.setItem('@allProducts', JSON.stringify(newList));
      this.setState({products: newList});
      const msg = `${product} was added to your list!`;
      Toast.show({text: msg, buttonText: 'OK', position: 'bottom', type: "success", duration: 3000});
      console.log(this.state.products);
    }    
  }

  async deleteProduct(id) {
    const currentProducts = [...this.state.products];
    const newProductList = currentProducts.filter( item => item.id !== id);
    await AsyncStorage.setItem('@allProducts', JSON.stringify(newProductList));
    this.setState({
      products: newProductList
    });
    console.log(newProductList);
    Toast.show({text: 'Product Deleted!', buttonText: 'OK', position: 'bottom', type: "danger", duration: 3000});
  }

  async deleteAll(){
    this.setState({products: []});
    await AsyncStorage.removeItem('@allProducts');
    Toast.show({
      text: 'All Products have been deleted!', 
      buttonText: 'OK',
      position: 'bottom',
      type: 'danger'
    });
  }

  toggleItemComplete = (id) => {
    productsCopy = [...this.state.products];
    const index = productsCopy.findIndex( product => product.id === id);
    updateProduct = {
      ...productsCopy[index],
      complete: !productsCopy[index].complete
    };
    this.setState({
      products: [
        ...productsCopy.slice(0, index), 
        updateProduct, 
        ...productsCopy.slice(index + 1)
      ]
    })    
  }

  renderShopListView = () => {
    if(this.state.isLoading){
      return this.showLoadingIndicator();
    }
    return this.renderListItems();
  }

  showLoadingIndicator = () => {
    return (
      <Spinner color="red" size="large" animating={this.state.isLoading} />
    )
  }

  renderListItems = () => {
      if(this.state.products.length < 1 || this.state.products === null){
        Toast.show({
          text: 'No Saved Products Found',
          buttonText: 'Add Product?',
          position: "bottom",
          type: "warning",
          duration: 5000,
          onClose: () => this.promptToAddProduct()
        })
      }
      const listItems = this.state.products.map(product =>       
        <ListItem key={product.id}>
          <Body>
            <Text>{product.name}</Text>
          </Body>
          <Right>
            <CheckBox checked={product.complete} onPress={() => this.toggleItemComplete(product.id)}/>
          </Right>
          <Right>
            <Button transparent 
                    onPress={() => this.deleteProduct(product.id)}>
                    <Icon name='trash' style={{color: 'red'}}/>
            </Button>
          </Right>
        </ListItem>
    );
    return <List>{listItems}</List>;
  }

  render() {
    return (
      <Container style={{paddingBottom: 15}}>
          <Content padder>
              {this.renderShopListView()}
          </Content>
      </Container>
    );
  }
}

export default ShoppingListScreen;