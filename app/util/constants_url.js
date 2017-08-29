/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

/**
 * 服务器地址
 * @type {string}
 */

const IPAddress = 'http://118.178.246.192:8733/';    //在线服务器

/**
 * 行情实时推送
 * */
const SOCKET_IP = '114.55.68.211';    //在线服务器
const SOCKET_PORT = 9888;    //端口号

/**
 * 交易订单实时推送
 * */
const TRADE_SOCKET_IP = '114.55.68.211';    //在线服务器
const TRADE_SOCKET_PORT = 6060;    //端口号



/** 登陆请求 */
export const LOGINURL    = IPAddress + 'Service/M_Account/Login';

/** 注册接口 */
export const REGISTER    = IPAddress + 'Service/M_Account/Register';

/** 获取手机验证码接口 */
export const SENDMSG    = IPAddress + 'Service/M_Account/SendMsg';

/** 检测用户名接口 */
export const USERNAMEENABL    = IPAddress + 'Service/M_Account/UserNameEnable';

/** 忘记密码第一步 */
export const ForgetPwdOne    = IPAddress + 'Service/M_Account/ForgetPwdOne';

/** 忘记密码第二步 */
export const ForgetPwdTwo    = IPAddress + 'Service/M_Account/ForgetPwdTwo';

/** 获取交易品种的列表 */
export const GETPRODUCTLIST    = IPAddress + 'Service/M_Order/GetProductList';

/** 获取交易品种详细信息 */
export const GETPRODUCTDETAIL    = IPAddress + 'Service/M_Order/GetProductDetail';

/** 获取当前交易订单列表 */
export const GETHOSTORYPRDERlIST    = IPAddress + 'Service/M_Order/GetOrdertList';

/** 获取历史订单列表 */
export const GETPRDERlIST    = IPAddress + 'Service/M_Order/GetOldOrdertList';

/** 获取K线历史数据 */
export const GETKChRATLIST    = IPAddress + 'Service/M_Order/GetPriceList';

/** 下单和即时订单 */
export const POSTORDER    = IPAddress + 'Service/M_Order/Order';

/** 修改即时订单和挂单 */
export const UPDATEPOST    = IPAddress + 'Service/M_Order/UpdateOrder';

/** 平仓 */
export const PINGCANG    = IPAddress + 'Service/M_Order/Ping';

/** 删除订单 */
export const DELETEORDER    = IPAddress + 'Service/M_Order/DeletePost';

/** 获取账户余额信息 */
export const GETACCOUNTINFO    = IPAddress + 'Service/M_Account/ReloadAccountInfo';

/** 获取模拟账户 */
export const GETNOTREALACCOUNT    = IPAddress + 'Service/M_Account/OneKeyRegister';


export const kUrlProductView                = IPAddress + '/product/view?id=';

//首页
export const kUrlBannerList                 = IPAddress + '/banner/list';
export const kUrlHomeListArticles           = IPAddress + '/home/list-articles';

//文章
export const kUrlArticleView                = IPAddress + '/cms-article/view?id=';

//购物车
export const kUrlCart                       = IPAddress + '/cart';
export const kUrlCartAdd                    = IPAddress + '/cart/add';

//用户
export const kUrlUserRegister               = IPAddress + '/user/register';
export const kUrlUserLogin                  = IPAddress + '/user/login';
export const kUrlUserLogout                 = IPAddress + '/user/logout';

//预订单
export const kUrlPreorderCreate             = IPAddress + '/preorder/create';
export const kUrlPreorderView               = IPAddress + '/preorder/view?id=';

//订单
export const kUrlOrderCreate                = IPAddress + '/order/create';
export const kUrlOrderView                  = IPAddress + '/order/view?id=';
export const kUrlOrderIndex                 = IPAddress + '/order/index';

//地址
export const kUrlAddressList                = IPAddress + '/address/index';
export const kUrlAddressCreate              = IPAddress + '/address/create';
export const kUrlAddressDelete              = IPAddress + '/address/delete';
