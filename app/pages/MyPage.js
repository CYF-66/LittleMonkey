'use strict'
import React, {Component} from 'react'
import {
    View,
    ListView,
    RefreshControl,
    Image,
    TouchableHighlight,
    Text,
    StyleSheet,
    InteractionManager
} from 'react-native'
//引入标题支持包
import NavigationBar from 'react-native-navigationbar'
import Toast from 'react-native-root-toast';
// import SetPage from 'SetPage'
import SetContainer from '../containers/SetContainer'


export default class MyPage extends Component {

    constructor(props) {
        super(props);
        // this.state = ({
        //     isError: false,
        //     isLoading: true,
        //     tabChange:'Android',
        //     dataSource: new ListView.DataSource({
        //         rowHasChanged: (row1, row2) => row1 !== row2
        //     }),
        //     // typeList: {}
        // })
    }

    render() {
        return (
            <View style={styles.container} needsOffscreenAlphaCompositing renderToHardwareTextureAndroid>
                <NavigationBar
                    backIconHidden={true}
                    barTintColor='red'
                    barStyle={styles.navbar}
                    title='我的'
                    titleColor='white'
                    // actionName='添加'
                    // actionTextColor='white'
                    // actionFunc={() => {
                    //     this.props.navigator.push({
                    //         component: AboutPage
                    //     })
                    // }}
                />

                    <View style={styles.account}>
                        <Image source={require('../images/set/personicon.png')} style={{
                            backgroundColor: 'black',
                            width: 50,
                            height: 50,
                            justifyContent: 'center',
                            marginLeft: 20
                        }}/>
                        <TouchableHighlight
                            underlayColor={'white'}
                            onPress={() => this._skipIntoContent("账户")}>
                        <View>
                            <Text style={styles.drawerheadtext}>交易账户:11010489</Text>
                            <Text style={styles.drawerheadtext}>账户余额:10000.00</Text>
                        </View>
                        </TouchableHighlight>
                    </View>

                <View style={{marginTop: 30, backgroundColor: 'white', paddingBottom: 5, paddingTop: 5}}>
                    <TouchableHighlight
                        underlayColor={'gray'}
                        onPress={() => this._skipIntoAccountManage("账户管理")}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>

                            <Image source={require('../images/set/iconfont_iconfontwohover.png')} style={{
                                width: 40,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 20
                            }}/>
                            <Text style={styles.drawertext}>账户管理</Text>

                        </View>

                    </TouchableHighlight>
                </View>
                <View style={styles.func}>
                    <TouchableHighlight
                        underlayColor={'gray'}
                        onPress={() => this._skipIntoContent("界面")}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../images/set/iconfont_dingwei.png')} style={{
                                width: 40,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 20
                            }}/>
                            <Text style={styles.drawertext}>界面</Text>
                        </View>

                    </TouchableHighlight>
                </View>
                <View style={styles.func}>
                    <TouchableHighlight
                        underlayColor={'gray'}
                        onPress={() => this._skipIntoContent("图表")}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../images/set/iconfont_youhui.png')} style={{
                                width: 40,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 20
                            }}/>
                            <Text style={styles.drawertext}>图表</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.func}>
                    <TouchableHighlight
                        underlayColor={'gray'}
                        onPress={() => this._skipIntoContent("日志")}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../images/set/iconfont_jine.png')} style={{
                                width: 40,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 20
                            }}/>
                            <Text style={styles.drawertext}>日志</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.func}>
                    <TouchableHighlight
                        underlayColor={'gray'}
                        onPress={() => this._skipIntoContent("消息")}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../images/set/iconfont_tixing.png')} style={{
                                width: 40,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 20
                            }}/>
                            <Text style={styles.drawertext}>消息</Text>
                        </View>

                    </TouchableHighlight>
                </View>
                <View style={styles.func}>
                    <TouchableHighlight
                        underlayColor={'gray'}
                        onPress={() => this._skipIntoContent("关于")}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../images/set/iconfont_wenti.png')} style={{
                                width: 40,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 20
                            }}/>
                            <Text style={styles.drawertext}>关于</Text>
                        </View>

                    </TouchableHighlight>
                </View>
            </View>
        )
    }

    _skipIntoContent(contentData) {
        Toast.show(contentData, {position: Toast.positions.CENTER});
    }

    _skipIntoAccountManage() {
        this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
            name:'SetContainer',
            component: SetContainer,
            // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
        })// push一个route对象到navigator中
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    account: {
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        top: 25,
    },
    drawerheadtext: {
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 8,
        color: 'black',
        fontSize: 18,
        textAlign: 'left'
    },
    drawertext: {
        marginLeft: 8,
        color: 'black',
        fontSize: 18,
        textAlign: 'left'
    },
    func: {
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'white',
    }
});