/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-13
 */

import * as types from './actionTypes';
import Util from '../util/utils';
import * as urls from '../util/constants_url';

export let GetOneKeyRegister = (isLoading) => {

    let url = urls.GETNOTREALACCOUNT;
    let data = {};

    return dispatch => {
        dispatch({type: types.GETNOTREALACCOUNT,isLoading: isLoading,});
        return Util.post(url, data,
            (Code, Message, Data) => {

            // let notrealaccount=Data
                dispatch({type: types.GETNOTREALACCOUNTRECEIVED, Code: Code, Message: Message, Data: Data});

                //11010497   cks69t

                // if(status){
                //
                // }
            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.GETNOTREALACCOUNT,'isLoading': false});
                alert('Android要用外网地址');
            }
        );
    }

};
export let HttpLogin = (data,isLoading) => {

    let url = urls.LOGINURL;

    return dispatch => {
        dispatch({type: types.LOGINURL,isLoading: isLoading,});
        return Util.post(url, data,
            (Code, Message, Data) => {

                // let notrealaccount=Data
                dispatch({type: types.LOGINURLRECEIVED, Code: Code, Message: Message, Data: Data});

                //11010497   cks69t

                // if(status){
                //
                // }
            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.GETNOTREALACCOUNT,'isLoading': false});
                alert('Android要用外网地址');
            }
        );
    }

};
export let GetProductList = (data,isLoading) => {

    let url = urls.GETPRODUCTLIST;

    return dispatch => {
        dispatch({type: types.GETPRODUCTLIST,isLoading: isLoading});
        return Util.post(url, data,
            (Code, Message, DataList) => {

                // let notrealaccount=Data
                let List= [];
                List=DataList;
                dispatch({type: types.GETPRODUCTLISTRECEIVED, Code: Code, Message: Message, DataList: DataList});

                //11010497   cks69t


                // if(status){
                //
                // }
            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.GETNOTREALACCOUNT,'isLoading': false});
                alert('Android要用外网地址');
            }
        );
    }

};
export let OpenSocketConnection = () => {

    let url = 'ws://114.55.68.211:9888';

    return dispatch => {
        dispatch({type: types.GETPMARKETLIST});
        return Util.socket(url,
            (data) => {

                dispatch({type: types.GETPMARKETLISTRECEIVED, Data:data});

                //11010497   cks69t


                // if(status){
                //
                // }
            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.GETPMARKETLISTRECEIVED,'isLoading': false});
                alert('Android要用外网地址');
            }
        );
    }

};


export let bannerList = () => {
    let url = urls.kUrlBannerList;
    return dispatch => {
        // 请求轮播数据
        dispatch({type: types.kBannerList});
        return Util.get(url,
            (status, code, message, data, share) => {
                let banners = [];
                if (status) {
                    banners = data.banners;
                }
                dispatch({
                    type: types.kBannerListReceived,
                    status: status,
                    code: code,
                    message: message,
                    share: share,
                    banners: banners
                });
            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.kActionError});
                alert('Android要用外网地址');
            }
        );
    }
};

export let homeListArticles = (page, isLoadMore, isRefreshing, isLoading) => {
    let url = urls.kUrlHomeListArticles + '?page=' + page;
    return dispatch => {
        dispatch({
            type: types.kHomeListArticles,
            isLoadMore: isLoadMore,
            isRefreshing: isRefreshing,
            isLoading: isLoading,
        });

        return Util.get(url,
            (status, code, message, data, share) => {
                let articles = [];
                if (status) {
                    articles = data.articles;
                }
                dispatch({
                    type: types.kHomeListArticlesReceived,
                    status: status,
                    code: code,
                    message: message,
                    share: share,
                    articles: articles
                });
            },
            (error) => {
                dispatch({'type': types.kActionError, 'isLoading': false});
            }
        );

        //模拟网络延迟
        // function fetching() {
        //     Util.get(URL, (response) => {
        //         dispatch(receiveFeedList(response.feeds));
        //     }, (error) => {
        //         dispatch(receiveFeedList([]));
        //     });
        // }
        // setTimeout(fetching, 3000);
    }
};