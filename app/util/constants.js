/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */
import {Dimensions} from 'react-native';

let window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};

let colors = {
    themeColor: 'rgb(217, 51, 58)',
    white: '#ffffff',
    black: '#000000',
    allbackgroundColor:'#F0F0F0',
    bluelogin: '#62a2e0',
    blue1: '#3DBFFB',
    blue2: '#6ABAFF',
    blue3: '#3692f9',
    black1: '#515151',
    black2: '#333333',
    black3: '#4C4C4C',
    black4: '#666666',
    black5: '#7F7F7F',
    whiter: '#fff',
    gray1: '#7E8188',
    gray2: '#808080',
    gray3: '#D6D6D6',
    gray4: '#F6FAF8',
    gray5: '#CCCCCC',
    gray6: '#E6E6E6',
    yellow1: '#FFCC66',
    green1: '#CCFF66',
    green2: '#80FF00',
    brown1: '#996633',
    red1: '#FF0000',
    backgroundColor0: 'rgba(128,128,128,0.3)',
    backgroundColor1: 'rgba(128,128,128,0.5)',
    backgroundColor2: 'rgba(128,128,128,0.7)'
};

let storeKeys = {
    SEARCH_HISTORY_KEY: 'SEARCH_HISTORY_KEY',
};

let mapper = {
    'calory': {name: '热量', unit: ''},
    'protein': {name: '蛋白质', unit: '克'},
    'fat': {name: '脂肪', unit: '克'},
    'carbohydrate': {name: '碳水化合物', unit: '克'},
    'fiber_dietary': {name: '膳食纤维', unit: '克'},
    'vitamin_a': {name: '维生素A', unit: 'IU'},
    'vitamin_c': {name: '维生素C', unit: '毫克'},
    'vitamin_e': {name: '维生素E', unit: '毫克'},
    'carotene': {name: '胡萝卜素', unit: '微克'},
    'thiamine': {name: '维生素B1', unit: '毫克'},
    'lactoflavin': {name: '维生素B2', unit: '毫克'},
    'niacin': {name: '烟酸', unit: '毫克'},
    'cholesterol': {name: '胆固醇', unit: '毫克'},
    'magnesium': {name: '镁', unit: '毫克'},
    'calcium': {name: '钙', unit: '毫克'},
    'iron': {name: '铁', unit: '毫克'},
    'zinc': {name: '锌', unit: '毫克'},
    'copper': {name: '铜', unit: '毫克'},
    'manganese': {name: '锰', unit: '毫克'},
    'kalium': {name: '钾', unit: '毫克'},
    'phosphor': {name: '磷', unit: '毫克'},
    'natrium': {name: '钠', unit: '毫克'},
    'selenium': {name: '硒', unit: '毫克'}
};

export default {
    window: window,
    colors: colors,
    storeKeys: storeKeys,
    ingredientMapper: mapper
};