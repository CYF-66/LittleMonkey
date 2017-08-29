/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-29
 */

'use strict';

import {AsyncStorage} from 'react-native';


class Storage {
    /**
     * 获取
     * @param key
     * @returns {Promise<T>|*|Promise.<TResult>}
     */

    static get (key) {
        return AsyncStorage.getItem(key).then((value) => {
            // const jsonValue = JSON.parse(value);
            // const changeValue=value.substring(1,value.length-1)
            return value;
        }).catch((err) => {
                console.log(err)
            }
        );
    }


    /**
     * 保存
     * @param key
     * @param value
     * @returns {*}
     */
    static save(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }


    /**
     * 更新
     * @param key
     * @param value
     * @returns {Promise<T>|Promise.<TResult>}
     */
    static update(key, value) {
        return DeviceStorage.get(key).then((item) => {
            value = typeof value === 'string' ? value : Object.assign({}, item, value);
            return AsyncStorage.setItem(key, JSON.stringify(value));
        }).catch((err) => {
                console.log(err)
            }
        );
    }


    /**
     * 更新
     * @param key
     * @returns {*}
     */
    static delete(key) {
        return AsyncStorage.removeItem(key);
    }
}

export default Storage;