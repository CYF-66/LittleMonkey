'use strict'
import React, {Component} from 'react'
import {
    View,
    ListView,
    RefreshControl,
    TouchableOpacity,
    TouchableHighlight,
    Text,
    StyleSheet,
    InteractionManager
} from 'react-native'
//引入标题支持包
import NavigationBar from 'react-native-navigationbar'
import ScrollableTabView, {
    DefaultTabBar
} from 'react-native-scrollable-tab-view';
import {GetOldOrdertList} from '../actions/historyActions';
import Toast from 'react-native-root-toast';
import Storage from '../util/Storage'
import Loading from '../components/Loading';

export default class HistoryPage extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            isError: false,
            isLoading: true,
            account: '',
            tabChange: '日',
            datetimeType: '1',
            balance: '0',
            // showAnim:new Animated.Value(0),
            isShow:false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
        })
    }

    componentWillMount() {
        Storage.get('account').then((account) => {
            if (account != null) {
                this.setState({
                    account: account
                })
            } else {
                this.setState({
                    account: ''
                })
            }
        });
        Storage.get('Balance').then((balance) => {
            if (balance != null) {
                this.setState({
                    balance: balance
                })
            } else {
                this.setState({
                    balance: 0.00
                })
            }
        });
    }

    componentDidMount() {

        // 交互管理器在任意交互/动画完成之后，允许安排长期的运行工作. 在所有交互都完成之后安排一个函数来运行。
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            let data = {'accountNo': '11010286', 'datetimeType': this.state.datetimeType};
            // Toast.show('accountNo='+this.state.account.substring(1,this.state.account.length-1)+'datetimeType='+this.state.datetimeType, {position: Toast.positions.CENTER});
            dispatch(GetOldOrdertList(data, this.state.isLoading));
        });
    }


    render() {
        const {historyReducer} = this.props;
        // let Data=homeReducer.Data;
        let DataList = historyReducer.DataList;
        let isLoading = historyReducer.isLoading;
        let profit = 0;

        for (var i in DataList) {
            if (DataList.hasOwnProperty(i)) { //filter,只输出man的私有属性
                var profitPrice = DataList[i].GrossProfit;
                profit += profitPrice;
                // console.log(i,":",DataList[i]);
            }
            ;
        }
        let content;
        content = (
            <View style={styles.container}>
                {isLoading ?
                    <Loading/> :
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <ListView
                            dataSource={this.state.dataSource.cloneWithRows(DataList)}
                            renderRow={this._renderItem.bind(this)}
                            // initialListSize={1}
                            enableEmptySections={true}
                            // onScroll={this._onScroll}
                            // onEndReached={this._onEndReach.bind(this)}
                            // onEndReachedThreshold={30}
                            // renderFooter={this._renderFooter.bind(this)}
                            // style={{height: Common.window.height - 64}}
                            // refreshControl={
                            //     <RefreshControl
                            //         refreshing={homeReducer.isRefreshing}
                            //         onRefresh={this._onRefresh.bind(this)}
                            //         title="正在加载中……"
                            //         color="#ccc"
                            //     />
                            // }
                        />
                    </View>
                }
            </View>
        )
        return (
            <View style={styles.container} needsOffscreenAlphaCompositing renderToHardwareTextureAndroid>
                <NavigationBar
                    backIconHidden={true}
                    barTintColor='red'
                    barStyle={styles.navbar}
                    title='历史'
                    titleColor='white'
                    // actionName='添加'
                    // actionTextColor='white'
                    // actionFunc={() => {
                    //     this.props.navigator.push({
                    //         component: AboutPage
                    //     })
                    // }}
                />
                {profit>=0 ?
                    <View style={styles.profitContainer}>
                    <Text style={styles.profitName}>利润</Text>
                    <Text style={styles.profitPriceHigh}>{profit.toFixed(2)}</Text>
                </View>  :
                    <View style={styles.profitContainer}>
                    <Text style={styles.profitName}>利润</Text>
                    <Text style={styles.profitPriceLow}>{profit.toFixed(2)}</Text>
                </View>
                }

                <View style={styles.profitContainer}>
                    <Text style={styles.profitName}>信用</Text>
                    <Text style={styles.profitPriceHigh}>0</Text>
                </View>
                <View style={styles.profitContainer}>
                    <Text style={styles.profitName}>入金</Text>
                    <Text style={styles.profitPriceHigh}>0</Text>
                </View>
                <View style={styles.profitContainer}>
                    <Text style={styles.profitName}>出金</Text>
                    <Text style={styles.profitPriceHigh}>0</Text>
                </View>
                <View style={styles.profitContainer}>
                    <Text style={styles.profitName}>结余</Text>
                    <Text style={styles.profitPriceHigh}>{this.state.balance}</Text>
                </View>
                <View style={styles.tab}>
                    <ScrollableTabView
                        tabBarPosition='top'//默认top
                        initialPage={0}//默认为0，即第一页
                        locked={false}//能否滑动切换标签。true 不能  false 可以 默认false
                        tabBarUnderlineStyle={{backgroundColor: 'red', height: 2}}
                        // tabBarUnderlineColor='red'//tab下方横线颜色
                        ackgroundColor='white'//整个背景栏颜色
                        tabBarActiveTextColor='red'//选中tab时文字颜色
                        tabBarInactiveTextColor='gray'//未选中tab时文字颜色
                        tabBarTextStyle={{fontSize: 16}}//文字样式
                        scrollWithoutAnimation={false}
                        renderTabBar={() => <DefaultTabBar/>}
                        onChangeTab={(obj) => {
                            // console.log('index:' + obj.i);
                            if (obj.i == 0) {
                                this.setState({
                                    tabChange: '日',
                                    datetimeType: '1'
                                })
                            } else if (obj.i == 1) {
                                this.setState({
                                    tabChange: '周',
                                    datetimeType: '2'
                                })
                            } else if (obj.i == 2) {
                                this.setState({
                                    tabChange: '月',
                                    datetimeType: '3'
                                })
                            } else {
                                this.setState({
                                    tabChange: '月',
                                    datetimeType: '0'
                                })
                            }
                            this._getData();
                            // Toast.show('onChangeTab='+obj.i, {position: Toast.positions.CENTER});
                        }
                        }
                        onScroll={(postion) => {
                            // float类型 [0, tab数量-1]
                            console.log('scroll position:' + postion);
                        }
                        }
                    >
                        <View style={{flex: 1}} tabLabel='日'>
                            {content}
                        </View>
                        <View style={{flex: 1}} tabLabel='周'>
                            {content}
                        </View>
                        <View style={{flex: 1}} tabLabel='月'>
                            {content}
                        </View>
                        <View style={{flex: 1}} tabLabel='年'>
                            {content}
                        </View>
                    </ScrollableTabView>
                </View>
            </View>
        )
    }

    _getData() {
        // alert("登录")
        let {account, datetimeType} = this.state;

        // 交互管理器在任意交互/动画完成之后，允许安排长期的运行工作. 在所有交互都完成之后安排一个函数来运行。
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            // dispatch(GetOneKeyRegister(isLoading));
            //11010497   cks69t
            this.state.isLoading = true;
            let data = {'accountNo': '11010286', 'datetimeType': this.state.datetimeType};
            // Toast.show('accountNo='+this.state.account.substring(1,this.state.account.length-1)+'datetimeType='+this.state.datetimeType, {position: Toast.positions.CENTER});
            dispatch(GetOldOrdertList(data, this.state.isLoading));
        });

    }

    _renderItem(contentData) {
        return (
            <View style ={styles.wholeBox}>
            <TouchableOpacity  onPress={() => this._skipIntoContent(contentData)
            }>
                <View style={styles.itemContainerRow}>
                    {contentData.GrossProfit>=0 ? <Text style={{
                        position: 'absolute',
                        right: 0,
                        top: 10,
                        color: 'blue',
                        fontSize: 25,
                        textAlign: 'left',
                        marginRight: 10
                    }}>{contentData.GrossProfit.toFixed(2)}</Text> :<Text style={{
                        position: 'absolute',
                        right: 0,
                        top: 10,
                        color: 'red',
                        fontSize: 25,
                        textAlign: 'left',
                        marginRight: 10
                    }}>{contentData.GrossProfit.toFixed(2)}</Text>}

                    <View style={styles.itemContainerColumn}>
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemName}>{contentData.CSymbol}</Text>
                            { contentData.TradeType=='买' ?
                                <Text style={styles.itemTypeBuy}>{contentData.TradeType}</Text>
                                :
                                <Text style={styles.itemTypeSell}>{contentData.TradeType}</Text>
                            }
                            { contentData.TradeType=='买' ?
                                <Text style={styles.itemLotsBuy}>{contentData.Lots}</Text>
                                :
                                <Text style={styles.itemLotsSell}>{contentData.Lots}</Text>

                            }
                        </View>
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemPrice}>{contentData.OpeningPositionPrice}</Text>
                            <Text style={styles.itemPrice}>-></Text>
                            <Text style={styles.itemPrice}>{contentData.ClosedPositionPrice}</Text>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
                {!this.state.isShow ? null: <View style={styles.hideItemContainer}>
                    <Text style={styles.hideItemText}>{contentData.CreateTime}</Text>
                    <View style={styles.hideItem}>
                        <Text style={styles.hideItemText}>止损</Text>
                        <Text style={styles.hideItemText}>{contentData.StopLoss}</Text>
                        <Text style={styles.hideItemText}>库存费</Text>
                        <Text style={styles.hideItemStorge}>{contentData.Commission}</Text>
                    </View>
                    <View style={styles.hideItem}>
                        <Text style={styles.hideItemText}>获利</Text>
                        <Text style={styles.hideItemText}>{contentData.StopProfit}</Text>
                        {/*<Text style={styles.hideItemText}></Text>*/}
                        <Text style={styles.hideItemId}>{'#'+contentData.OrderId}</Text>
                    </View>
                </View>
                }

            </View>
        )
    }

    _skipIntoContent(contentData) {
        if(this.state.isShow){
            this.setState({
                isShow: false
            })
        }else{
            this.setState({
                isShow: true
            })
        }
        // Toast.show(this.state.isShow, {position: Toast.positions.CENTER});

        // this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
        //     component: DailyContent,
        //     // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
        // })// push一个route对象到navigator中
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    tab: {
        flex: 1,
        backgroundColor: 'white',
    },
    wholeBox:{
        flex: 1,
        backgroundColor: 'white',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    itemContainerColumn: {
        flex: 1,
        backgroundColor: 'white',
    },
    itemContainerRow: {
        position: 'relative',
        backgroundColor: 'white',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 200,
    },
    itemContainer: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        // height: 30,
    },
    itemName: {
        fontSize: 18,
        marginLeft: 5,
        color: 'black',
        // height: 30,
    },
    itemTypeBuy: {
        fontSize: 18,
        marginLeft: 10,
        color: 'blue',
        // height: 30,
    },
    itemTypeSell: {
        fontSize: 18,
        marginLeft: 10,
        color: 'red',
        // height: 30,
    },
    itemLotsBuy: {
        fontSize: 18,
        marginLeft: 10,
        color: 'blue',
        // height: 30,
    },
    itemLotsSell: {
        fontSize: 18,
        marginLeft: 10,
        color: 'red',
        // height: 30,
    },
    itemPrice: {
        fontSize: 15,
        marginLeft: 5,
        color: 'black',
        // height: 30,
    },
    profitContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    profitName: {
        flex: 1,
        fontSize: 15,
        marginLeft: 5,
        color: 'black',
        // height: 30,
    },
    profitPriceHigh: {
        fontSize: 15,
        marginLeft: 5,
        color: 'blue',
        // height: 30,
    },
    profitPriceLow: {
        fontSize: 15,
        marginLeft: 5,
        color: 'red',
        // height: 30,
    },
    hideItemContainer: {
        backgroundColor: 'white',
        paddingBottom: 5,
        paddingLeft: 10,
        // height: 30,
    },
    hideItem: {
        flex: 1,
        flexDirection: 'row',
        marginTop:2
        // height: 30,
    },
    hideItemText: {
        flex: 1,
        fontSize: 15,
        marginLeft: 5,
    },
    hideItemStorge: {
        flex: 1,
        fontSize: 15,
        marginLeft: 5,
        textAlign:'right',
        marginRight:10
    },
    hideItemId: {
        flex: 2,
        fontSize: 15,
        marginLeft: 5,
        textAlign:'right',
        marginRight:10
    },

});