/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */

'use strict';

// import {FormData} from 'react-native';
import Toast from 'react-native-root-toast';

let Util = {
    /**
     * http get 请求简单封装
     * @param url 请求的URL
     * @param successCallback 请求成功回调
     * @param failCallback 请求失败回调
     */
    get: (url, successCallback, failCallback) => {
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                let result = JSON.parse(responseText);
                successCallback(result.Code, result.Message, result.DataList);
            })
            .catch((err) => {
                failCallback(err);
            });
    },

    /**
     * http post 请求简单封装
     * @param url 请求的URL
     * @param data post的数据
     * @param successCallback 请求成功回调
     * @param failCallback failCallback 请求失败回调
     */
    post: (url, data, successCallback, failCallback) => {
        // let formData = new FormData();
        // Object.keys(data).map(function(key) {
        //     var value = data[key];
        //     formData.append(key, value);
        // });

        let fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Content-Type': 'multipart/form-data',
            },
            // body: formData
            body: JSON.stringify(data)
        };

        fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseText) => {
                let result = JSON.parse(responseText);
                // alert(result.Message);
                Toast.show(result.Message, {position:Toast.positions.CENTER});
                successCallback(result.Code, result.Message, result.DataList);
            })
            .catch((err) => {
                failCallback(err);
            });
    },

    /**
     * 日志打印
     * @param obj
     */
    log: (obj) => {
        var description = "";
        for(let i in obj){
            let property = obj[i];
            description += i + " = " + property + "\n";
        }
        alert(description);
    },

    socket:(url,successCallback) =>{
        // SocketAddress socketaddress = new InetSocketAddress(NetUrl.SOCKET_IP, NetUrl.SOCKET_PORT);
        const ws = new WebSocket(url);
        // ws.connect(url,5000);
        // ws.CONNECTING=() =>{
        //     ws.OPEN(5000);
        // };
        Toast.show("onconnectbegin", {position:Toast.positions.CENTER});
        ws.onopen = () => {
            // 打开一个连接
            alert('onopen');
            ws.send('something'); // 发送一个消息
        };

        ws.onmessage = (e) => {
            // 接收到了一个消息
            console.log(e.data);
            Toast.show("onmessage="+e.data, {position:Toast.positions.CENTER});
            // alert('onmessage='+e.data);
            successCallback(e.data);
        };

        ws.onerror = (e) => {
            // 发生了一个错误
            console.log(e.message);
            // alert('onerror='+e.message);
            Toast.show("onerror="+e.message, {position:Toast.positions.CENTER});
        };

        ws.onclose = (e) => {
            // 连接被关闭了
            alert('onclose'+e.reason);
            Toast.show("onclose="+e.reason, {position:Toast.positions.CENTER});
            console.log(e.code, e.reason);
        };
        Toast.show("onconnectend", {position:Toast.positions.CENTER});
        // alert('onconnectend');
    }
};

export default Util;