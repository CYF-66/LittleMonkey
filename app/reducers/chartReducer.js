/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */

import * as types from '../actions/actionTypes';
const initialState = {
    banners: [],
    articles: [],
    Data:'',
    DataList:[],
    isLoading: true,
    isLoadMore: false,
    isRefreshing: false,
};

let chartReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GETNOTREALACCOUNT:
            return {
                ...state,
                isLoading: true
            };
        case types.GETNOTREALACCOUNTRECEIVED:
            return {
                ...state,
                isLoading: false,
                Data: action.Data,
            };
        case types.LOGINURL:
            return {
                ...state,
                isLoading: true
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
                Data: action.Data,
            };
        case types.GETPRODUCTLIST:
            return {
                ...state,
                isLoading: true
            };
        case types.GETPRODUCTLISTRECEIVED:
            return {
                ...state,
                isLoading: false,
                DataList: action.DataList,
                // DataList: action.DataList.length> 0 ? state.DataList.concat(action.DataList) : state.DataList
            };
        case types.GETPMARKETLIST:
            return {
                ...state,
                isLoading: true
            };
        case types.GETPMARKETLISTRECEIVED:
            alert("实时推送数据="+action.Data);
            return {
                ...state,
                isLoading: false,
                Data: action.Data,

                // DataList: action.DataList.length> 0 ? state.DataList.concat(action.DataList) : state.DataList
            };

        default:
            return state;
    }
};

export default chartReducer;