

export function add(product){
    return {
        type: 'ADD',
        product: product
    };
}

export function toggle(id){
    return {
        type: 'TOGGLE',
        id: id
    }
}

export function deleteAll(){
    return {
        type: 'DELETE_ALL'
    };
}

export function allProducts(){
    return {
        type: 'ALL_PRODUCTS'
    }
}