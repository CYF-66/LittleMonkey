/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import ChartPage from '../pages/ChartPage';

class ChartContainer extends Component {
    render() {
        return (
            <ChartPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return { chartReducer} = state;
})(ChartContainer);