/**
 * 交易主框架界面
 */
'use strict';
import React, {Component} from 'react';
import {
  StyleSheet,
  Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import HomeContainer from './HomeContainer';
import ChartContainer from './ChartContainer';
import TradeContainer from './TradeContainer';
import HistoryContainer from './HistoryContainer';
import MyContainer from './MyContainer';

const TAB_NORMAL_MARKET=require('../images/tab/ic_tab_home.png');
const TAB_NORMAL_CHART=require('../images/tab/ic_tab_category.png');
const TAB_NORMAL_TRADE=require('../images/tab/ic_tab_cart.png');
const TAB_NORMAL_HISTORY=require('../images/tab/ic_tab_fun.png');
const TAB_NORMAL_MY=require('../images/tab/ic_tab_my.png');

const TAB_PRESS_MARKET=require('../images/tab/ic_tab_home_press.png');
const TAB_PRESS_CHART=require('../images/tab/ic_tab_category_press.png');
const TAB_PRESS_TRADE=require('../images/tab/ic_tab_cart_press.png');
const TAB_PRESS_HISTORY=require('../images/tab/ic_tab_fun_press.png');
const TAB_PRESS_MY=require('../images/tab/ic_tab_my_press.png');
class AppMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
	  	      selectedTab:'market'
	      };
    }
    
    render() {
        return (
          <TabNavigator
			  tabBarStyle={styles.tab}>
			  <TabNavigator.Item
			  	title="行情"
			    selected={this.state.selectedTab === 'market'}
			    selectedTitleStyle={styles.selectedTextStyle}
			    titleStyle={styles.textStyle}
			    renderIcon={() => <Image source={TAB_NORMAL_MARKET} style={styles.tabIcon}/>}
			    renderSelectedIcon={() => <Image source={TAB_PRESS_MARKET} style={styles.tabIcon}/>}
			    onPress={() => this.setState({ selectedTab: 'market' })}>
			    <HomeContainer {...this.props}/>
			  </TabNavigator.Item>
			  <TabNavigator.Item
			  	title="图表"
			    selected={this.state.selectedTab === 'chart'}
			    selectedTitleStyle={styles.selectedTextStyle}
			    titleStyle={styles.textStyle}
			    renderIcon={() => <Image source={TAB_NORMAL_CHART} style={styles.tabIcon}/>}
			    renderSelectedIcon={() => <Image source={TAB_PRESS_CHART} style={styles.tabIcon}/>}
			    onPress={() => this.setState({ selectedTab: 'chart' })}>
			    <ChartContainer {...this.props}/>
			  </TabNavigator.Item>
			  <TabNavigator.Item
			  	title="交易"
			    selected={this.state.selectedTab === 'trade'}
			    selectedTitleStyle={styles.selectedTextStyle}
			    titleStyle={styles.textStyle}
			    renderIcon={() => <Image source={TAB_NORMAL_TRADE} style={styles.tabIcon}/>}
			    renderSelectedIcon={() => <Image source={TAB_PRESS_TRADE} style={styles.tabIcon}/>}
			    onPress={() => this.setState({ selectedTab: 'trade' })}>
			    <TradeContainer {...this.props}/>
			  </TabNavigator.Item>
			  <TabNavigator.Item
				  title="历史"
				  selected={this.state.selectedTab === 'history'}
				  selectedTitleStyle={styles.selectedTextStyle}
				  titleStyle={styles.textStyle}
				  renderIcon={() => <Image source={TAB_NORMAL_HISTORY} style={styles.tabIcon}/>}
				  renderSelectedIcon={() => <Image source={TAB_PRESS_HISTORY} style={styles.tabIcon}/>}
				  onPress={() => this.setState({ selectedTab: 'history' })}>
				  <HistoryContainer {...this.props}/>
			  </TabNavigator.Item>
			  <TabNavigator.Item
			  	title="我的"
			    selected={this.state.selectedTab === 'my'}
			    selectedTitleStyle={styles.selectedTextStyle}
			    titleStyle={styles.textStyle}
			    renderIcon={() => <Image source={TAB_NORMAL_MY} style={styles.tabIcon}/>}
			    renderSelectedIcon={() => <Image source={TAB_PRESS_MY} style={styles.tabIcon}/>}
			    onPress={() => this.setState({ selectedTab: 'my' })}>
			    <MyContainer {...this.props}/>
			  </TabNavigator.Item>
			</TabNavigator>
        );
    }
}

const styles=StyleSheet.create({
   textStyle:{
       color:'gray',
   },
   selectedTextStyle:{
       color:'red',
   },
    tab:{
        height: 52,
        alignItems:'center',
        backgroundColor:'white',
    },
    tabIcon:{
        width:25,
        height:25,
    }
});

export default AppMain;

