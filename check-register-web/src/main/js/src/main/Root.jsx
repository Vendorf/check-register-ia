import React from 'react';

import CheckTableComponent from "./CheckTable/CheckTableComponent";

import { Drawer, List, ListItem, ListItemText, Popper, AppBar, Toolbar, Button, ListItemIcon, Paper, ButtonGroup, Collapse } from "@material-ui/core";
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import ReportComponent from './Report/ReportComponent';

require('react-datepicker/dist/react-datepicker.css')

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            drawerOpen: true,
            currAccount: 0,
            popperOpen: false,
            name: "",
            deletePopperOpen: false
        }

        this.refreshAccounts.bind(this);
        this.handleNewAccount.bind(this);
        this.toggleDrawer.bind(this);
        this.setCurrAccount.bind(this);
        this.handleCreateAccount.bind(this);
        this.handleDeleteAccount.bind(this);
        this.deleteAccount.bind(this);
        this.setDefaultAccount.bind(this);

        this.newButtonRef = React.createRef();
        this.deleteButtonRef = React.createRef();
    }

    componentDidMount() {
        this.refreshAccounts();
    }

    setDefaultAccount(){
        this.setState({
            currAccount: 0
        });
    }

    refreshAccounts() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/account', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                console.log(xhr.response)
                let result = (JSON.parse(xhr.response));
                this.setState({
                    accounts: result
                });
            }
        }.bind(this);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
    }

    handleCreateAccount() {
        let newAccount = {
            id: null,
            accountName: this.state.name
        }
        console.log(newAccount)
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/newAccount', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                this.setState(({
                    popperOpen: false,
                    name: ""
                }));
                this.refreshAccounts();
            }
        }.bind(this);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(newAccount));
    }

    deleteAccount(targetAccount) {
        if(!window.confirm("Delete '".concat(targetAccount.accountName).concat("'? This operation cannot be undone"))){
            return;
        }
        this.setState(({
            deletePopperOpen: false,
        }));
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', '/deleteAccount/'.concat(targetAccount.id), true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                this.setState(({
                    popperOpen: false,
                    name: ""
                }));
                this.refreshAccounts();
            }
        }.bind(this);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(targetAccount.id);
    }

    handleNewAccount() {
        this.setState((prevState) => ({
            popperOpen: !prevState.popperOpen,
            name: !prevState.popperOpen ? prevState.name : ""
        }));
    }

    handleDeleteAccount() {
        this.setState((prevState) => ({
            deletePopperOpen: !prevState.deletePopperOpen,
        }))
    }

    toggleDrawer() {
        this.setState((prevState) => ({
            drawerOpen: !prevState.drawerOpen
        }));
    }

    setCurrAccount(i) {
        this.setState({
            currAccount: i
        });
    }

    handleCreateInputChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    render() {
        let classes = this.props.classes;
        let accounts = this.state.accounts;
        let currAccount = this.state.currAccount;
        let drawerOpen = this.state.drawerOpen;
        let popperOpen = (this.state.popperOpen);
        let name = this.state.name;
        let deletePopperOpen = this.state.deletePopperOpen;

        return (
                <div className={classes.root}>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar disableGutters className={classes.toolBar}>
                            <Button className={classes.toolBarButton} onClick={this.toggleDrawer.bind(this)}>Menu</Button>
                            {/* <Button className={classes.toolBarButton} component={Link} to="/">Main</Button> */}
                            {/* <Button className={classes.toolBarButton} component={Link} to="/report">Report</Button> */}
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        className={drawerOpen ? classes.drawer : classes.drawerClosed}
                        variant="persistent"
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        open={drawerOpen}
                        transitionDuration={0}>
                        <List className={classes.subToolBar}>
                            {accounts.map((account, i) => (
                                <ListItem button value={i} className={classes.listButton} onClick={() => this.setCurrAccount(i)}>
                                    <ListItemIcon>
                                        <AccountBalanceWalletOutlinedIcon className={classes.accountIcon} />
                                    </ListItemIcon>
                                    <ListItemText primary={account.accountName}></ListItemText>
                                </ListItem>
                            ))}
                            <ListItem button className={classes.listButton} ref={this.newButtonRef} onClick={this.handleNewAccount.bind(this)}>
                                <ListItemIcon>
                                    <AddCircleOutlineIcon className={classes.accountIcon} />
                                </ListItemIcon>
                                <ListItemText primary="New Account"></ListItemText>
                                {popperOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={popperOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem className={classes.nestedListItem}>
                                        <input value={name} className={classes.accountInput} placeholder="Name" onChange={this.handleCreateInputChange.bind(this)}></input>
                                        <Button className={classes.filterButton} onClick={this.handleCreateAccount.bind(this)}>Create</Button>
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItem button className={classes.listButton} ref={this.deleteButtonRef} onClick={this.handleDeleteAccount.bind(this)}>
                                <ListItemIcon>
                                    <DeleteOutlineIcon className={classes.accountIcon} />
                                </ListItemIcon>
                                <ListItemText primary="Delete Account"></ListItemText>
                                {deletePopperOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={deletePopperOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {accounts.map((account) => (
                                        <ListItem button className={classes.nestedListButton} onClick={() => this.deleteAccount(account)}>
                                            <ListItemIcon>
                                                <RemoveCircleOutlineIcon className={classes.accountIcon} />
                                            </ListItemIcon>
                                            <ListItemText primary={account.accountName}></ListItemText>
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </List>
                    </Drawer>
                    <div className={classes.content}>
                                <CheckTableComponent
                                    classes={classes}
                                    setDefaultAccount={this.setDefaultAccount.bind(this)}
                                    account={accounts[currAccount] != null ? accounts[currAccount] : null} />
                    </div>
                </div>
        );
    }
}

export default Root