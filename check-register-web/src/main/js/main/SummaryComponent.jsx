import React from 'react';
import { Typography } from '@material-ui/core';

class SummaryComponent extends React.Component{
    constructor(props){
        super(props);
        //STATE:
        //summary:
            //checkBookId
            //total
                //symbol
                //value
            //paymentTotal
                //symbol
                //value
            //depositTotal
                //symbol
                //value
    }

    getSafe(fn, defaultValue) {
        try {
            return fn();
        } catch (e) {
            return defaultValue;
        }
    }

    render(){
        return (
            <div className="summary">
                <Typography variant="h3">{'$' + this.getSafe(()=>this.props.summary.total.value, "---")}</Typography>
                <Typography variant="h4">{'Payments: -$' + this.getSafe(()=>this.props.summary.paymentTotal.value, "---")}</Typography>
                <Typography variant="h4">{'Deposits: +$' + this.getSafe(()=>this.props.summary.depositTotal.value, "---")}</Typography>
                <Typography>MVP: Reports, Calendar+Plug Reports, Input Validation, Database, Filter, Filter Summary, Accounts</Typography>
                <Typography>Monday: Chemistry IA</Typography>
                <Typography>Tuesday: Reports, Calendar+Plug Reports, Input Validation, Database</Typography>
                <Typography>Wednesday: Database, Filter</Typography>
                <Typography>Thursday: Filter Summary, Accounts, Quality of Life</Typography>
            </div>
        );
    }
}

export default SummaryComponent