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
import LoginContainer from '../containers/LoginContainer'


export default class SetPage extends Component {

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
                    backIconHidden={false}
                    barTintColor='red'
                    barStyle={styles.navbar}
                    title='设置'
                    titleColor='white'
                    backColor='white'
                    backFunc={() => {
                        this.props.navigator.pop()
                    }}
                    // actionName='添加'
                    // actionTextColor='white'
                    // actionFunc={() => {
                    //     this.props.navigator.push({
                    //         component: AboutPage
                    //     })
                    // }}
                />
                <View style={styles.funcfirst}>
                    <TouchableOpacity
                        onPress={() => this._skipIntoLogin()}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../images/set/app_login.png')} style={{
                                width: 40,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 20
                            }}/>
                            <Text style={styles.drawertext}>登录</Text>
                        </View>

                    </TouchableOpacity>
                </View>
                <View style={styles.func}>
                    <TouchableOpacity
                        onPress={() => this._skipIntoContent("注册")}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../images/set/app_registered.png')} style={{
                                width: 40,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 20
                            }}/>
                            <Text style={styles.drawertext}>注册</Text>
                        </View>

                    </TouchableOpacity>
                </View>
                <View style={styles.func}>
                    <TouchableOpacity
                        onPress={() => this._skipIntoContent("修改密码")}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../images/set/re_password.png')} style={{
                                width: 40,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 20
                            }}/>
                            <Text style={styles.drawertext}>修改密码</Text>
                        </View>

                    </TouchableOpacity>
                </View>
                <View style={styles.func}>
                    <TouchableOpacity
                        onPress={() => this._skipIntoContent("新建模拟账户")}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../images/set/re_password.png')} style={{
                                width: 40,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 20
                            }}/>
                            <Text style={styles.drawertext}>新建模拟账户</Text>
                        </View>

                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.buttonStyle}
                                    onPress={() => this._skipIntoContent("退出登录")}>
                    <Text style={styles.backlogin}>退出登录</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _skipIntoContent(contentData) {
        alert(contentData)
        // this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
        //     component: SetPage,
        //     // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
        // })// push一个route对象到navigator中
    }
    _skipIntoLogin() {
        this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
            name:'LoginContainer',
            component: LoginContainer,
            // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
        })// push一个route对象到navigator中
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    func: {
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'white',
    },
    funcfirst: {
        marginTop:20,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'white',
    },
    drawertext: {
        marginLeft: 8,
        color: 'black',
        fontSize: 18,
        textAlign: 'left'
    },
    buttonStyle: {
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:10,
        paddingBottom:10,
        marginTop: 20,
    },
    backlogin:{
        color:'white',
        fontSize: 20,
    }
});
