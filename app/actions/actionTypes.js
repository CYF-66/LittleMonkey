/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-13
 */

'use strict';

/**
 * action 类型
 */

//公用类型
export const ACTIONERROR                       = 'action_error';
// export const kCommonIsToasting                  = 'kCommonIsToasting';

//一间注册模拟账户
export const GETNOTREALACCOUNT                  = 'account_unreal';
export const GETNOTREALACCOUNTRECEIVED                  = 'account_unreal_received';

//登录
export const LOGINURL                  = 'login';
export const LOGINURLRECEIVED                  = 'login_received';

//获取行情历史数据
export const GETPRODUCTLIST                  = 'market_history';
export const GETPRODUCTLISTRECEIVED   = 'market_history_received';

//获取行情实时推送数据
export const GETPMARKETLIST                  = 'market_real_time';
export const GETPMARKETLISTRECEIVED                  = 'market_real_time_received';

//获取历史数据
export const GETPRDERlIST                  = 'history';
export const GETPRDERlISTRECEIVED                  = 'history_received';

//获取当前交易订单列表
export const GETORDERlIST                  = 'trade';
export const GETORDERlISTRECEIVED                  = 'trade_received';




