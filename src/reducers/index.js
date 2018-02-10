import {combineReducers} from 'redux';
import productReducer from './productReducer';

const allReducers = combineReducers({
    products: productReducer
});

export default allReducers;