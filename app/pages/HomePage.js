'use strict'
import React, {Component} from 'react'
import {View, ListView,RefreshControl, Image, TouchableHighlight, Text, StyleSheet,InteractionManager} from 'react-native'
import ScrollableTabView, {
    DefaultTabBar
} from 'react-native-scrollable-tab-view';
//引入标题支持包
import NavigationBar from 'react-native-navigationbar'
import {GetOneKeyRegister,HttpLogin,GetProductList,OpenSocketConnection} from '../actions/homeActions';
import Loading from '../components/Loading';
import Toast from 'react-native-root-toast';
// import io from 'socket.io-client';
// import AboutPage from './AboutPage'


export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isError: false,
            isLoading: true,
            tabChange:'Android',
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            // typeList: {}
        })
    }

    /**
     * 在初始化render之后只执行一次，在这个方法内，可以访问任何组件，componentDidMount()方法中的子组件在父组件之前执行

     从这个函数开始，就可以和 js 其他框架交互了，例如设置计时 setTimeout 或者 setInterval，或者发起网络请求
     * */

     componentDidMount() {

       // 交互管理器在任意交互/动画完成之后，允许安排长期的运行工作. 在所有交互都完成之后安排一个函数来运行。
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            // dispatch(GetOneKeyRegister(isLoading));
            //11010497   cks69t
            // let data={'accountNo':'11010497','loginPwd':'cks69t','eqInfo':'860549030412279;23;1.0;android'};
            // dispatch(HttpLogin(data));

            let data={'cusRoleId':'3'};
            dispatch(GetProductList(data,this.state.isLoading));
            dispatch(OpenSocketConnection());
            // dispatch(homeListArticles(page, canLoadMore, isRefreshing, isLoading));
        });

        // const {homeReducer} = this.props;
        // let DataList=homeReducer.DataList;
        // this.setState({
        //     dataSource: this.state.dataSource.cloneWithRows(DataList)
        // });
        // alert("componentDidMount="+dataSource.length);
    }

    render() {
        const {homeReducer} = this.props;
        let Data=homeReducer.Data;
        let DataList=homeReducer.DataList;
        let isLoading = homeReducer.isLoading;
        // alert("Data="+Data);
        // alert("render="+DataList.length);
        // let list = [];
        // for (let i = 0; i < DataList.length; i++) {
        //     list.push(i);
        // }
        // this.setState({
        //     dataSource: this.state.dataSource.cloneWithRows(DataList)
        // });
        let content;
        content = (
            <View style={styles.container}>
                {isLoading ?
                    <Loading /> :
                    <View style={{flex:1,flexDirection:'column'}}>
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
        // let content={
        //
        // }
        return (
            <View style={styles.container} needsOffscreenAlphaCompositing renderToHardwareTextureAndroid>
                <NavigationBar
                    backIconHidden={true}
                    barTintColor='red'
                    barStyle={styles.navbar}
                    title='行情'
                    titleColor='white'
                     // actionName='添加'
                     // actionTextColor='white'
                    // actionFunc={() => {
                    //     this.props.navigator.push({
                    //         component: AboutPage
                    //     })
                    // }}
                />
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
                        console.log('index:' + obj.i);
                        this.setState({
                            tabChange: 'ios',
                        })
                    }
                    }
                    onScroll={(postion) => {
                        // float类型 [0, tab数量-1]
                        console.log('scroll position:' + postion);
                    }
                    }
                >
                    <View style={{flex: 1}} tabLabel='简单'>
                        {content}
                    </View>
                    <View style={{flex: 1}} tabLabel='高级'>
                    </View>
                </ScrollableTabView>
                </View>
                {/*{content}*/}
            </View>
        );
    }
    _renderItem(contentData){
        // alert("_renderItem="+contentData.length);
        return (
            <TouchableHighlight  underlayColor={'red'} onPress={() => this._skipIntoContent(contentData)
            }>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemName}>{contentData.CName}</Text>
                    <Text style={styles.itemAsk}>{contentData.Ask}</Text>
                    <Text style={styles.itemBid}>{contentData.Bid}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    _skipIntoContent(contentData) {
        Toast.show(contentData.CName, {position: Toast.positions.CENTER});
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
    itemContainer: {
        flex:1,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        // height: 30,
        padding: 10
    },
    itemName: {
        fontSize: 18,
        marginLeft:5,
        color: 'black',
        // height: 30,
    },
    itemAsk: {
        flex:1,
        fontSize: 18,

        marginLeft:20,
        color: 'red',
        // height: 30,
    },
    itemBid: {
        flex:1,
        fontSize: 18,
        marginLeft:20,
        color: 'blue',
        // height: 30,
    },
});
