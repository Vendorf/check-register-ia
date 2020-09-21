import React from 'react';
import { Typography, Button, Grid, Paper } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

import './summary.css';

class SummaryComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    getSafe(fn, defaultValue) {
        try {
            return fn();
        } catch (e) {
            return defaultValue;
        }
    }

    isValidDate(d) {
        return d instanceof Date && !isNaN(d);
    }

    toDate(millis) {
        if (millis != null) {
            let date = new Date(millis * 1000);
            return this.isValidDate(date) ? date : null;
        }
        return null;
    }

    render() {
        let defaultStr = "---";

        let total = parseFloat(this.getSafe(() => this.props.summary.total.value, "---"));
        let paymentTotal = parseFloat(this.getSafe(() => this.props.summary.paymentTotal.value, "---"));
        let depositTotal = parseFloat(this.getSafe(() => this.props.summary.depositTotal.value, "---"));

        let futureTotal = parseFloat(this.getSafe(() => this.props.summary.futureTotal.value, "---"));
        let futurePaymentTotal = parseFloat(this.getSafe(() => this.props.summary.futurePaymentTotal.value, "---"));
        let futureDepositTotal = parseFloat(this.getSafe(() => this.props.summary.futureDepositTotal.value, "---"));

        const styleGreen = {
            color: 'rgba(0,255,0,0.6)'
        }
        const styleRed = {
            color: 'rgba(255,0,0,0.6)'
        }
        const styleDefault = {
        }

        const getStyle = (value) => {
            return isNaN(value) || value == 0 ? styleDefault
                : value > 0 ? styleGreen
                    : styleRed;
        }

        const getSign = (value) => {
            return isNaN(value) || value==0 ? "" : value > 0 ? "▲" : "▼-";
        }

        const getDisplayValue = (value) => {
            return isNaN(value) ? defaultStr : Math.abs(value).toFixed(2);
        }

        return (
            <div className="summary">
                <Grid container
                    spacing={0}
                    justify="flex-end">
                    <Grid item xs={3}>
                        <Paper className={this.props.classes.filterPaper}>
                            <Typography style={{ color: 'rgba(255,255,255, 0.7)', marginRight: 5, marginLeft: 10 }}>Filter Future Date:</Typography>

                            <DatePicker className={this.props.classes.summaryDatePicker} selected={this.toDate(this.getSafe(() => this.props.summary.baseDate, null))} onChange={this.props.handleBaseDate} />
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper className={this.props.classes.filterPaper}>
                            <Button className={this.props.classes.filterButton} onClick={this.props.handleBaseDateClear}>Clear</Button>
                        </Paper>
                    </Grid>
                </Grid>

                <Paper className={this.props.classes.summaryPaper}>
                    <Typography variant="h3" style={getStyle(total)}>{getSign(total) + '$' + getDisplayValue(total)}</Typography>
                    <Typography variant="h4" style={styleRed}>{'Payments: -$' + getDisplayValue(paymentTotal)}</Typography>
                    <Typography variant="h4" style={styleGreen}>{'Deposits: +$' + getDisplayValue(depositTotal)}</Typography>
                </Paper>

                <Paper className={this.props.classes.futureSummaryPaper}>
                    <Typography style={getStyle(futureTotal)}>{"Future Total Change: " + getSign(futureTotal) + "$" + getDisplayValue(futureTotal)}</Typography>
                    <Typography style={isNaN(futurePaymentTotal) ? styleDefault : styleRed}>{"Future Payment Change: -$" + getDisplayValue(futurePaymentTotal)}</Typography>
                    <Typography style={isNaN(futureDepositTotal) ? styleDefault : styleGreen}>{"Future Deposit Change: +$" + getDisplayValue(futureDepositTotal)}</Typography>
                </Paper>
            </div>
        );
    }
}

export default SummaryComponent