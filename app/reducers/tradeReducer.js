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

let tradeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GETORDERlIST:
            return {
                ...state,
                isLoading: true
            };
        case types.GETORDERlISTRECEIVED:
            return {
                ...state,
                isLoading: false,
                DataList: action.DataList,
                // DataList: action.DataList.length> 0 ? state.DataList.concat(action.DataList) : state.DataList
            };
        default:
            return state;
    }
};

export default tradeReducer;