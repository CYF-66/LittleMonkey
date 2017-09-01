/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */

import * as types from '../actions/actionTypes';
const initialState = {
    DataList:[],
    isLoading: true,
    isLoadMore: false,
    isRefreshing: false,
};

let historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GETPRDERlIST:
            return {
                ...state,
                isLoading: true
            };
        case types.GETPRDERlISTRECEIVED:
            return {
                ...state,
                isLoading: false,
                DataList: action.DataList,
                // DataList: action.DataList.length> 0 ? state.DataList.concat(action.DataList) : state.DataList
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
            };
        default:
            return state;
    }
};

export default historyReducer;