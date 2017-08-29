/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import HistoryPage from '../pages/HistoryPage';

class HistoryContainer extends Component {
    render() {
        return (
            <HistoryPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return { historyReducer} = state;
})(HistoryContainer);