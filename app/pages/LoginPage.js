

'use strict'
import React, {Component} from 'react'
import {
    View,
    TextInput,
    Image,
    TouchableHighlight,
    Text,
    StyleSheet,
    InteractionManager
} from 'react-native'
//引入标题支持包
import NavigationBar from 'react-native-navigationbar'
import Toast from 'react-native-root-toast';
import {HttpLogin} from '../actions/loginActions';
import Loading from '../components/Loading';
import HomePage from "./HomePage";
import AppMain from '../containers/AppMain'

export default class LoginPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            account: '',
            password: '',
            isLoading: false,
        };
    }

    componentDidMount() {


    }
    componentWillUpdate() {
        InteractionManager.runAfterInteractions(() => {
            const {loginReducer} = this.props;
            // let isLoading = loginReducer.isLoading;
            // {isLoading ?
            //                 <Loading /> :Toast.show("哈哈哈哈或或成功", {position: Toast.positions.CENTER});
            //             }
            // if (loginReducer.isLoading) {
            //     <Loading />
            // }else{
            //     Toast.show("哈哈哈哈或或成功", {position: Toast.positions.CENTER});
            //     // this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
            //     //     name:'AppMain',
            //     //     component: AppMain,
            //     //     // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
            //     // })
            // }

            if (!loginReducer.isLoading) {

                Toast.show("登录成功哈哈哈哈", {position: Toast.positions.CENTER});
            }
        });
    }
    render(){
        // const {homeReducer} = this.props;
        // let Data=homeReducer.Data;
        // let isLoading = homeReducer.isLoading;
        // let content;
        // content = (
        //     <View style={styles.container}>
        //         {isLoading ?
        //             <Loading /> :null
        //         }
        //     </View>
        // )
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
                    <Image source={require('../images/set/login_icon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                    <TextInput
                        ref="login_name"
                        placeholder='交易账户'
                        restrict = "^."
                        maxLength={8}
                        keyboardType='numeric'
                        // field.restrict = "0-9"
                        style={styles.loginInput}
                        onChangeText={this.onChangeMobile.bind(this)} />
                </View>
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('../images/set/login_pwd_icon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                    <TextInput
                        ref="login_psw"
                        style={styles.loginInput}
                        // field.restrict = "0-9"
                        restrict = "0-9"
                        secureTextEntry={true}
                        placeholder='密码'
                        onChangeText={this.onChangePassword.bind(this)} />
                </View>
                <TouchableHighlight style={styles.loginBtn} underlayColor={'#FF0000'} onPress={this._login.bind(this)}>
                    <Text style={styles.loginText}>登录</Text>
                </TouchableHighlight>
                <View style={styles.registerWrap}>
                    <TouchableHighlight underlayColor={'#F0F0F0'} onPress={this._forgetPassword.bind(this)}>
                        <Text style={{color:'#62a2e0',fontSize:18}}>忘记密码</Text>
                    </TouchableHighlight>
                    <Text style={{color:'#62a2e0',marginLeft:15,marginRight:15,fontSize:18}}>
                        |
                    </Text>
                    <TouchableHighlight underlayColor={'#F0F0F0'} onPress={this._register.bind(this)}>
                        <Text style={{color:'#62a2e0',fontSize:18}}>立即注册</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }

    _login() {
        // alert("登录")
        let {account, password} = this.state;

        if (!account.length) {
            Toast.show('请输入正确的交易账户', {position:Toast.positions.CENTER});
            return;
        }
        if (!password.length) {
            Toast.show('请输入密码', {position:Toast.positions.CENTER});
            return;
        }
        // 交互管理器在任意交互/动画完成之后，允许安排长期的运行工作. 在所有交互都完成之后安排一个函数来运行。
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            // dispatch(GetOneKeyRegister(isLoading));
            //11010497   cks69t
            this.state.isLoading=true;
            let data={'accountNo':'11010497','loginPwd':'cks69t','eqInfo':'860549030412279;23;1.0;android'};
            dispatch(HttpLogin(data,this.state.isLoading));

        });
        // this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
        //     name:'LoginContainer',
        //     component: LoginContainer,
        //     // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
        // })// push一个route对象到navigator中
    }
    _forgetPassword() {
        Toast.show('忘记密码', {position:Toast.positions.CENTER});
        // this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
        //     name:'LoginContainer',
        //     component: LoginContainer,
        //     // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
        // })// push一个route对象到navigator中
    }
    _register() {
        Toast.show('注册', {position:Toast.positions.CENTER});
        // this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
        //     name:'LoginContainer',
        //     component: LoginContainer,
        //     // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
        // })// push一个route对象到navigator中
    }

    onChangeMobile(text){
        this.state.account = text;
        // this.setState({'mobile': text});
    }

    onChangePassword(text){
        this.state.password = text;
        // this.setState({'password': text});
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
        flex:1,
    },
    comCulture: {
        width:320,
        marginTop:50,
    },
    formInput:{
        flexDirection:'row',
        height: 60,
        padding: 20,
    },
    formInputSplit:{
        borderBottomWidth:1,
        borderBottomColor:'#dbdada',
    },
    loginInput: {
        height: 40,
        paddingLeft: 10,
        flex: 1,
        fontSize: 16,
    },

    loginBtn:{
        backgroundColor: 'red',
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 3,
    },
    loginText:{
        color:'#ffffff',
        fontSize: 17,
    },

    registerWrap: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
    },
});