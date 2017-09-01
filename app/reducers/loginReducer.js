/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-28
 */

import * as types from '../actions/actionTypes';
import Toast from 'react-native-root-toast';
const initialState = {
    Data:'',
    isLoading: true,
    isLoadMore: false,
    isRefreshing: false,
    Code:'',
    isLogin: false,
};

let loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGINURL:
            return {
                ...state,
                isLoading: true,
                isLogin: false,
            };
            // return Object.assign({}, state, {
            //     isLoadMore: action.isLoadMore,
            //     isRefreshing: action.isRefreshing,
            //     isLoading: action.isLoading,
            // });
        case types.LOGINURLRECEIVED:
            // return {
            //     ...state,
            //     //articles: action.articles,
            //     articles: action.articles.length > 0 ? state.articles.concat(action.articles) : state.articles,
            //     isLoading: false,
            //     isRefreshing: false,
            // };
            return {
                ...state,
                isLoading: false,
                isLogin:true,
                Data: action.Data,
                Code: action.Code,
            };
        case types.ACTIONERROR:
            // return {
            //     ...state,
            //     //articles: action.articles,
            //     articles: action.articles.length > 0 ? state.articles.concat(action.articles) : state.articles,
            //     isLoading: false,
            //     isRefreshing: false,
            // };
            return {
                ...state,
                isLoading: false,
                isLogin:false,
            };
        default:
            return state;
    }
};
// export default homeReducer;
export default loginReducer;