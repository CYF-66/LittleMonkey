'use strict'
import React, {Component} from 'react'
import {
    View,
    TextInput,
    Image,
    TouchableHighlight,
    Text,
    StyleSheet,
    Switch,
    InteractionManager
} from 'react-native'
//引入标题支持包
import NavigationBar from 'react-native-navigationbar';
import Toast from 'react-native-root-toast';
import {HttpLogin} from '../actions/loginActions';
import Loading from '../components/Loading';
import HomePage from "./HomePage";
import AppMain from '../containers/AppMain';
import Common from '../util/constants';
import Storage from '../util/Storage'

export default class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            switchType: true,
            account: '',
            accountPWD: '',
            isLoading: false,
            date: '',
            code:'',
        };
    }

    // 这个函数调用时机是在组件创建，并初始化了状态之后，在第一次绘制 render() 之前。可以在这里做一些业务初始化操作，也可以设置组件状态。这个函数在整个生命周期中只被调用一次。
    componentWillMount() {

        Storage.get('loginState').then((loginState) => {
            if (loginState == 'false') {
                this.setState({
                    switchType: false,
                })
            } else {
                this.setState({
                    switchType: true,
                })
            }
        });
        Storage.get('account').then((account) => {
            if (this.state.switchType) {
                this.setState({
                    account: account
                })
            } else {
                this.setState({
                    account: ''
                })
            }
        });
        Storage.get('accountPWD').then((accountPWD) => {
            if (this.state.switchType) {
                this.setState({
                    accountPWD: accountPWD
                })
            } else {
                this.setState({
                    accountPWD: ''
                })
            }
        });
    }

    componentDidMount() {
        // Storage.getUserAccount()

    }

    render() {
        const {homeReducer} = this.props;
        this.state.date = homeReducer.Data;
        return (
            <View style={styles.container}>
                {/*<Header*/}
                {/*leftIcon='angle-left'*/}
                {/*leftIconAction={()=>this.props.navigator.pop()}*/}
                {/*title='手机号登录'*/}
                {/*/>*/}
                <NavigationBar
                    backIconHidden={false}
                    barTintColor='red'
                    barStyle={styles.navbar}
                    title='登录'
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

                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('../images/set/login_icon.png')}
                           style={{width: 25, height: 25, resizeMode: 'contain'}}/>
                    <TextInput
                        ref="login_name"
                        placeholder='交易账户'
                        restrict="^."
                        maxLength={8}
                        editable={true}
                        keyboardType='numeric'
                        multiline={false}
                        defaultValue={this.state.account.substring(1,this.state.account.length-1)}
                        underlineColorAndroid={'transparent'}
                        // field.restrict = "0-9"
                        style={styles.loginInput}
                        onChangeText={this.onChangeMobile.bind(this)}/>
                </View>
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('../images/set/login_pwd_icon.png')}
                           style={{width: 25, height: 25, resizeMode: 'contain'}}/>
                    <TextInput
                        ref="login_psw"
                        style={styles.loginInput}
                        // field.restrict = "0-9"
                        restrict="0-9"
                        multiline={false}
                        defaultValue={this.state.accountPWD.substring(1,this.state.accountPWD.length-1)}
                        keyboardType={'default'}
                        secureTextEntry={true}
                        placeholder='密码'
                        onChangeText={this.onChangePassword.bind(this)}/>
                </View>
                <View style={styles.switch}>
                    <Text style={styles.textStyle}>记住密码</Text>
                    <Switch value={this.state.switchType}
                            onValueChange={(value) => {
                                this._changeSate(value)
                            }}/>
                </View>
                <TouchableHighlight style={styles.loginBtn} underlayColor={'#FF0000'} onPress={this._login.bind(this)}>
                    <Text style={styles.loginText}>登录</Text>
                </TouchableHighlight>
                <View style={styles.registerWrap}>
                    <TouchableHighlight underlayColor={'#F0F0F0'} onPress={this._forgetPassword.bind(this)}>
                        <Text style={{color: '#62a2e0', fontSize: 18}}>忘记密码</Text>
                    </TouchableHighlight>
                    <Text style={{color: '#62a2e0', marginLeft: 15, marginRight: 15, fontSize: 18}}>
                        |
                    </Text>
                    <TouchableHighlight underlayColor={'#F0F0F0'} onPress={this._register.bind(this)}>
                        <Text style={{color: '#62a2e0', fontSize: 18}}>立即注册</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }

    _login() {
        // alert("登录")
        let {account, accountPWD} = this.state;

        if (!account.length) {
            Toast.show('请输入正确的交易账户', {position: Toast.positions.CENTER});
            return;
        }
        if (!accountPWD.length) {
            Toast.show('请输入密码', {position: Toast.positions.CENTER});
            return;
        }
        // 交互管理器在任意交互/动画完成之后，允许安排长期的运行工作. 在所有交互都完成之后安排一个函数来运行。
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            // dispatch(GetOneKeyRegister(isLoading));
            //11010497   cks69t
            this.state.isLoading = true;
            let data = {'accountNo': account, 'loginPwd': accountPWD, 'eqInfo': '860549030412279;23;1.0;android'};
            // let data={'accountNo':'11010497','loginPwd':'cks69t','eqInfo':'860549030412279;23;1.0;android'};
            dispatch(HttpLogin(data, this.state.isLoading));
        });

        const {loginReducer} = this.props;
        let data = loginReducer.Data;
        let code = loginReducer.Code;
        this._loginSuccess(code,data);
    }

    _loginSuccess(code,data) {
        const {switchType, account, accountPWD} = this.state;
        // Toast.show("登录成功kkkkkk", {position: Toast.positions.CENTER});
        // Toast.show("登录成功account==-----======"+account, {position: Toast.positions.CENTER});
        Toast.show("登录成功code==-----======"+code, {position: Toast.positions.CENTER});
        if(code=='0'){
            Storage.save('accountPWD', accountPWD);
            Storage.save('account', account);
            this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                name:'AppMain',
                component: AppMain,
                // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
            })// push一个route对象到navigator中
        }
    }

    _forgetPassword() {
        Toast.show('忘记密码', {position: Toast.positions.CENTER});
    }

    _register() {
        Toast.show('注册', {position: Toast.positions.CENTER});
    }

    _changeSate(value) {
        Storage.save('loginState', value);
        this.setState({
            switchType: value
        })
    }

    onChangeMobile(text) {
        this.state.account = text;
    }

    onChangePassword(text) {
        this.state.accountPWD = text;
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    loginWrap: {
        backgroundColor: '#FCE9D4',
    },
    imgWrap: {
        flexDirection: 'row',
        flex: 1,
    },
    loginMain: {
        flex: 1,
    },
    comCulture: {
        width: 320,
        marginTop: 50,
    },
    formInput: {
        flexDirection: 'row',
        height: 60,
        padding: 20,
    },
    formInputSplit: {
        borderBottomWidth: 1,
        borderBottomColor: '#dbdada',
    },
    loginInput: {
        height: 40,
        paddingLeft: 10,
        flex: 1,
        fontSize: 16,
    },

    loginBtn: {
        backgroundColor: 'red',
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 3,
    },
    loginText: {
        color: '#ffffff',
        fontSize: 17,
    },

    registerWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    switch: {
        width: Common.window.width * 0.9,
        height: 55,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 18,
        color: Common.colors.bluelogin,
        marginLeft: 7,
        marginRight: 10,
        fontWeight: 'bold'
    },
});