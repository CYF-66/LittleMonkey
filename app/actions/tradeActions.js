/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-13
 */

import * as types from './actionTypes';
import Util from '../util/utils';
import * as urls from '../util/constants_url';


export let GetOrdertList = (data,isLoading) => {

    let url = urls.GETHOSTORYPRDERlIST;

    return dispatch => {
        dispatch({type: types.GETORDERlIST,isLoading: isLoading});
        return Util.post(url, data,
            (Code, Message, DataList) => {

                // let notrealaccount=Data
                dispatch({type: types.GETORDERlISTRECEIVED, Code: Code, Message: Message, DataList: DataList});

                //11010497   cks69t

                // if(status){
                //
                // }
            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.ACTIONERROR,'isLoading': false});
                alert('Android要用外网地址');
            }
        );
    }

};
