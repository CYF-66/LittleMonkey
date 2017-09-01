'use strict'
import React, {Component} from 'react'
import {
    View,
    ListView,
    RefreshControl,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet,
    InteractionManager
} from 'react-native'
//引入标题支持包
import NavigationBar from 'react-native-navigationbar'
import ListCards from '../components/CanOpenListView';
import Loading from '../components/Loading';
import {GetOrdertList} from '../actions/tradeActions';
import Toast from 'react-native-root-toast';
import ScrollableTabView, {
    DefaultTabBar
} from 'react-native-scrollable-tab-view';
import Storage from '../util/Storage'


export default class TradePage extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            isError: false,
            isLoading: true,
            tabChange: '即时订单',
            tradeType: '0',
            account: '',
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
            let data = {'accountNo': '11010286'};
            // Toast.show('accountNo='+this.state.account.substring(1,this.state.account.length-1)+'datetimeType='+this.state.datetimeType, {position: Toast.positions.CENTER});
            dispatch(GetOrdertList(data, this.state.isLoading));
        });
    }

    render() {
        const {tradeReducer} = this.props;
        // let Data=homeReducer.Data;
        let DataList = tradeReducer.DataList;
        let isLoading = tradeReducer.isLoading;
        let content;


        var intimeData=[];
        var guaData=[];
        for (var i in DataList) {
            if (DataList.hasOwnProperty(i)) { //filter,只输出man的私有属性
                if(DataList[i].OrderType=='即时交易'){
                    intimeData.push(DataList[i]);
                }else{
                    guaData.push(DataList[i]);
                }
            }
        }
        let data=[];
        if(this.state.tradeType=='0'){
            data=intimeData;
        }else{
            data=guaData;
        }


        content = (
            <View style={styles.container}>
                {isLoading ?
                    <Loading/> :
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <ListView
                            dataSource={this.state.dataSource.cloneWithRows(data)}
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
                    title='交易'
                    titleColor='white'
                     actionName='＋'
                     actionTextColor='white'
                     actionFunc={() => {
                         Toast.show('添加', {position: Toast.positions.CENTER});
                         // this.props.navigator.push({
                         //     component: AboutPage
                         // })
                     }}
                />
                <View style={styles.firstContainer}>
                    <View style={styles.firstContainerItem}>
                        <Text style={styles.firstTextName}>
                            结余
                        </Text>
                        <Text style={styles.firstTextValue}>
                            {this.state.balance}
                        </Text>
                    </View>
                    <View style={styles.firstContainerItem}>
                        <Text style={styles.firstTextName}>
                            净值
                        </Text>
                        <Text style={styles.firstTextValue}>
                            10010.00
                        </Text>
                    </View>
                </View>
                <View style={styles.firstContainer}>
                    <View style={styles.firstContainerItem}>
                        <Text style={styles.firstTextName}>
                            预付款
                        </Text>
                        <Text style={styles.firstTextValue}>
                            50.00
                        </Text>
                    </View>
                    <View style={styles.firstContainerItem}>
                        <Text style={styles.firstTextName}>
                            可用预付款
                        </Text>
                        <Text style={styles.firstTextValue}>
                            9910.00
                        </Text>
                    </View>
                    <View style={styles.firstContainerItem}>
                        <Text style={styles.firstTextName}>
                            预付款比率(%)
                        </Text>
                        <Text style={styles.firstTextValue}>
                            10010.00
                        </Text>
                    </View>
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
                                    tabChange: '即时订单',
                                    tradeType: '0'
                                })
                            } else {
                                this.setState({
                                    tabChange: '挂单',
                                    tradeType: '1'
                                });
                            }
                            // this._getData();
                            // Toast.show('onChangeTab='+obj.i, {position: Toast.positions.CENTER});

                        }
                        }
                        onScroll={(postion) => {
                            // float类型 [0, tab数量-1]
                            console.log('scroll position:' + postion);
                        }
                        }
                    >
                        <View style={{flex: 1}} tabLabel='即时订单'>
                            {content}
                        </View>
                        <View style={{flex: 1}} tabLabel='挂单'>
                            {content}
                        </View>
                    </ScrollableTabView>
                </View>

                {/*<ListView*/}
                    {/*dataSource={this.state.dataSource}*/}
                    {/*renderRow={(rowData) => this._renderRows(rowData)}*/}
                {/*/>*/}
            </View>
        )
    }

    _getData() {
        // alert("登录")
        let {account} = this.state;

        // 交互管理器在任意交互/动画完成之后，允许安排长期的运行工作. 在所有交互都完成之后安排一个函数来运行。
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            // dispatch(GetOneKeyRegister(isLoading));
            //11010497   cks69t
            this.state.isLoading = true;
            let data = {'accountNo': '11010286'};
            // Toast.show('accountNo='+this.state.account.substring(1,this.state.account.length-1)+'datetimeType='+this.state.datetimeType, {position: Toast.positions.CENTER});
            dispatch(GetOrdertList(data, this.state.isLoading));
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
    firstContainer: {
        paddingTop:8,
        paddingBottom:8,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    firstContainerItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    firstTextName: {
        fontSize: 18,
        color: 'black',
    },
    firstTextValue: {
        fontSize: 15,
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