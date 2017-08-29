/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import TradePage from '../pages/TradePage';

class TradeContainer extends Component {
    render() {
        return (
            <TradePage {...this.props} />
        )
    }
}

export default connect((state) => {
    return { tradeReducer} = state;
})(TradeContainer);