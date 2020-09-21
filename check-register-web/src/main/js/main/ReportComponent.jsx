import React from 'react';

import Grid from '@material-ui/core/Grid';
import SubscriptionsHistory from '../SubscriptionsHistory/SubscriptionsHistory';

class ReportComponent extends React.Component{

    constructor(props){
        super(props);
    }


    render(){
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <SubscriptionsHistory />
                </Grid>
            </Grid>
        );
    }
}

export default ReportComponent