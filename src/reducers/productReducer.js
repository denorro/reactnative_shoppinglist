export const INITIAL_STATE = {
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
  };

    export default function(state = INITIAL_STATE, action){
        switch(action.type){
            case 'ALL_PRODUCTS':
                return {...state }
            case 'ADD':
                let newProduct = {id: state.products.length + 1, name: action.product, complete: false}
                return {...state, products: [...state.products, newProduct]}
            case 'DELETE_ALL':
                return {...state, products: []}
            case 'TOGGLE':
                const productsCopy = [...state.products];
                console.log(productsCopy);
                const index = productsCopy.findIndex(x => x.id === action.id);
                console.log(index);
                updateProduct = {
                    ...productsCopy[index],
                    complete: !productsCopy[index].complete
                };
                return {...state, products: [...productsCopy.slice(0, index), updateProduct, ...productsCopy.slice(index + 1)]}
            default: 
                return state;
        }
    }