/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */


import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
} from 'react-native';

import Common from '../util/constants';
const positions = {
    TOP: 20,
    BOTTOM: -20,
    CENTER: 0
};

export default class Loading extends React.Component {
    render() {
        return (
            <View style={styles.loading}>
                <ActivityIndicator color="white" size="large"/>
                <Text style={styles.loadingTitle}>加载中……</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        // flexDirection: 'row',
        backgroundColor: 'gray',
        height: 100,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        // top: (Common.window.height-120)/2,
        // left: (Common.window.width-100)/2,
        // top: Common.window.height/20,
        left: Common.window.width/2.5,
        // bottom: -20,
    },

    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'white'
    }
})