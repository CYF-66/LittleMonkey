/**
 * TradingTerminalRN
 * @author CYF
 * @date 2016-08-13
 */

/**
 * 根reducer
 */
import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import loginReducer from './loginReducer';
import historyReducer from './historyReducer';
import tradeReducer from './tradeReducer';
// import categoryReducer from './categoryReducer';
// import productReducer from './productReducer';
// import articleReducer from './articleReducer';
// import cartReducer from './cartReducer';
// import preorderReducer from './preorderReducer';
// import orderReducer from './orderReducer';
// import myReducer from './myReducer';
// import userReducer from './userReducer';
// import addressReducer from './addressReducer';
// import commonReducer from './commonReducer';

export default rootReducer = combineReducers({
    homeReducer,
    loginReducer,
    historyReducer,
    tradeReducer,
    // categoryReducer,
    // productReducer,
    // articleReducer,
    // cartReducer,
    // preorderReducer,
    // orderReducer,
    // myReducer,
    // userReducer,
    // addressReducer,
    // commonReducer
})