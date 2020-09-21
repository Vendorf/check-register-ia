import React from 'react';

import { Grid, Paper, Button, Select, MenuItem } from "@material-ui/core";

class FilterComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: {
                transactionNameFilter: "",
                memoFilter: "",
                paymentFilter: "",
                depositFilter: ""
            },
            sort: [0,0,0,0] //1 is ascending, -1 is descending, 0 is none
        }

        this.handleSubmit.bind(this);
        this.handleClear.bind(this);

        this.transactionNameFilterChanged.bind(this);
        this.memoFilterChanged.bind(this);
        this.paymentFilterChanged.bind(this);
        this.depositFilterChanged.bind(this);

        this.transactionNameSortChanged.bind(this);
        this.memoSortChanged.bind(this);
        this.paymentSortChanged.bind(this);
        this.depositSortChanged.bind(this);
    }

    handleSubmit(){
        this.props.handleSort(this.state.sort, 
            ()=>{this.props.handleFilters(this.state.filter)});
    }

    handleClear(){
        this.setState({
            filter: {
                transactionNameFilter: "",
                memoFilter: "",
                paymentFilter: "",
                depositFilter: ""
            },
            sort: [0,0,0,0]
        }, this.handleSubmit.bind(this));
    }

    //complexity: event doesn't persist so need to account for that
    transactionNameFilterChanged(event){
        let val = event.target.value;
        this.setState((prevState) => ({
            filter: {
                ...prevState.filter,
                transactionNameFilter: val
            }
        }));
    }

    memoFilterChanged(event){
        let val = event.target.value;
        this.setState((prevState) => ({
            filter: {
                ...prevState.filter,
                memoFilter: val
            }
        }));
    }

    paymentFilterChanged(event){
        let val = event.target.value;
        this.setState((prevState) => ({
            filter: {
                ...prevState.filter,
                paymentFilter: val
            }
        }));
    }

    depositFilterChanged(event){
        let val = event.target.value;
        this.setState((prevState) => ({
            filter: {
                ...prevState.filter,
                depositFilter: val
            }
        }));
    }

    //--sort handlers-------
    transactionNameSortChanged(event){
        this.setState({
            sort: [event.target.value, 0, 0]
        });
    }

    memoSortChanged(event){
        this.setState({
            sort: [0, event.target.value, 0, 0]
        });
    }

    paymentSortChanged(event){
        this.setState({
            sort: [0, 0, event.target.value, 0]
        });
    }

    depositSortChanged(event){
        this.setState({
            sort: [0, 0, 0, event.target.value]
        });
    }

    //at top: show/hide button that sets open hook, then conditionaly render based on the state of open hook
    render() {
        return (
            <div className={this.props.classes.root}>
                <Grid container
                    spacing={0}
                    justify="flex-end">
                    <Grid item xs={3}>
                        <Paper className={this.props.classes.paper}>
                            <input value={this.state.filter.transactionNameFilter} className={this.props.classes.input} placeholder="Search Transaction" onChange={this.transactionNameFilterChanged.bind(this)}></input>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={this.props.classes.paper}>
                            <input value={this.state.filter.memoFilter} className={this.props.classes.input} placeholder="Search Memo" onChange={this.memoFilterChanged.bind(this)}></input>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={this.props.classes.paper}>
                            <input value={this.state.filter.paymentFilter} type="number" className={this.props.classes.input} placeholder="Search Payment" onChange={this.paymentFilterChanged.bind(this)}></input>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={this.props.classes.paper}>
                            <input value={this.state.filter.depositFilter} type="number" className={this.props.classes.input} placeholder="Search Deposit" onChange={this.depositFilterChanged.bind(this)}></input>
                        </Paper>
                    </Grid>


                    <Grid item xs={3}>
                        <Paper className={this.props.classes.paper}>
                            {/* can make these selects their own class for ease of use later but whatever */}
                            <Select
                                disableUnderline={true}
                                className={this.props.classes.input}
                                MenuProps={{ classes: { paper: this.props.classes.menu } }}
                                onChange={this.transactionNameSortChanged.bind(this)}
                                value={this.state.sort[0]}>
                                <MenuItem value="" className={this.props.classes.button}>
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={1} className={this.props.classes.button}>Ascending</MenuItem>
                                <MenuItem value={-1} className={this.props.classes.button}>Descending</MenuItem>
                            </Select>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={this.props.classes.paper}>
                            <Select
                                disableUnderline={true}
                                className={this.props.classes.input}
                                MenuProps={{ classes: { paper: this.props.classes.menu } }}
                                onChange={this.memoSortChanged.bind(this)}
                                value={this.state.sort[1]}>
                                <MenuItem value="" className={this.props.classes.button}>
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={1} className={this.props.classes.button}>Ascending</MenuItem>
                                <MenuItem value={-1} className={this.props.classes.button}>Descending</MenuItem>
                            </Select>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={this.props.classes.paper}>
                            <Select
                                disableUnderline={true}
                                className={this.props.classes.input}
                                MenuProps={{ classes: { paper: this.props.classes.menu } }}
                                onChange={this.paymentSortChanged.bind(this)}
                                value={this.state.sort[2]}>
                                <MenuItem value="" className={this.props.classes.button}>
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={1} className={this.props.classes.button}>Ascending</MenuItem>
                                <MenuItem value={-1} className={this.props.classes.button}>Descending</MenuItem>
                            </Select>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={this.props.classes.paper}>
                            <Select
                                disableUnderline={true}
                                className={this.props.classes.input}
                                MenuProps={{ classes: { paper: this.props.classes.menu } }}
                                onChange={this.depositSortChanged.bind(this)}
                                value={this.state.sort[3]}>
                                <MenuItem value="" className={this.props.classes.button}>
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={1} className={this.props.classes.button}>Ascending</MenuItem>
                                <MenuItem value={-1} className={this.props.classes.button}>Descending</MenuItem>
                            </Select>
                        </Paper>
                    </Grid>


                    <Grid item xs={1}>
                        <Paper className={this.props.classes.paper}>
                            <Button className={this.props.classes.button} onClick={this.handleClear.bind(this)}>Clear</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper className={this.props.classes.paper}>
                            <Button className={this.props.classes.button} onClick={this.handleSubmit.bind(this)}>Submit</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default FilterComponent