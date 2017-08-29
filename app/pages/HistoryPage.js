'use strict'
import React, {Component} from 'react'
import {View, ListView,RefreshControl, Image, TouchableHighlight, Text, StyleSheet,InteractionManager} from 'react-native'
//引入标题支持包
import NavigationBar from 'react-native-navigationbar'


export default class HistoryPage extends Component {

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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    }
});