import React from 'react';

import CheckTableComponent from "./CheckTable/CheckTableComponent";

import { Drawer, List, ListItem, ListItemText, makeStyles, AppBar, Toolbar, Button, ListItemIcon } from "@material-ui/core";
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import ReportComponent from './Report/ReportComponent';
import Root from './Root';

require('react-datepicker/dist/react-datepicker.css')

const drawerWidth = 240;

const styles = makeStyles({
    root: {
        height: "100vh",
        width: "100vw",
        display: 'flex',
        flexDirection: 'row',
    },

    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },

    drawerClosed: {
        width: 0,
        flexShrink: 0
    },

    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#20232a'
    },

    main: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },

    filterView:{
        flex: 10,
        display: "flex"
    },

    tableView: {
        flex: 70,
        display: "flex",
        flexDirection: 'row',
        overflowY: "auto",
        backgroundColor: "#282c34",
    },

    summaryView: {
        flex: 20,
        display: "flex",
        flexDirection: "column",
    },

    split: {
        flex: 1
    },

    appBar: {
        zIndex: 1400
    },

    accountPopper: {
        zIndex: 1401
    },

    accountPaper: {
        backgroundColor: 'rgb(50,54,62)',
    },

    accountInput: {
        paddingLeft: 50
    },

    toolBar: {
        minHeight: 25,
        backgroundColor: '#20232a'
    },

    toolBarButton: {
        textTransform: 'none',
        borderRadius: 0,
        maxHeight: 25,
        minHeight: 25,
        maxWidth: 75,
        minWidth: 75,
        fontSize: 15,
        color: 'rgba(255,255,255, 0.7)',
        padding: 0,
        '&:hover': {
            backgroundColor: 'rgba(97, 218, 251, 0.8)',
            padding: 0
        }
    },

    subToolBar: {
        paddingTop: 25
    },

    listButton: {
        paddingTop: 20,
        paddingBottom: 20,
        color: 'rgba(255,255,255, 0.7)',
        '&:hover': {
            backgroundColor: 'rgba(97, 218, 251, 0.8)',
        }
    },

    nestedListButton: {
        color: 'rgba(255,255,255, 0.7)',
        '&:hover': {
            backgroundColor: 'rgba(255, 0, 0, 0.8)',
        },
        paddingLeft: 20
    },

    nestedListItem: {
        color: 'rgba(255,255,255, 0.7)',
        paddingLeft: 20
    },

    accountIcon: {
        fill: 'rgba(255,255,255, 0.7)',
    },

    content: {
        display: 'flex',
        flex: 1,
        paddingTop: 25, //this is so that is below the toolbar
        // transition: 'all 500ms cubic-bezier(0.23, 1, 0.32, 1)'
    },

    filterRoot: {
        flexGrow: 1,
        backgroundColor: "#20232a"
      },

    filterPaper: {
        // padding: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 2,
        marginTop: 2,
        textAlign: 'center',
        backgroundColor: "#20232a",
        display: "flex"
      },

    filterInput: {
        border: 'none !important',
        borderColor: 'transparent !important',
        backgroundColor: 'transparent !important',
        padding: '0 !important',
        margin: '0 !important',
        /* flex-grow: 1; */
        flex: 1,
        height: 27,
        color: 'white',
        // boxShadow: 'inset 0px -2px #ebebeb',
        transition: 'box-shadow 0.3s',
        '&:focus': {
            outline: 'none',
            boxShadow: 'inset 0px -2px rgb(97, 218, 251)',
        }
    },

    filterButton: {
        flex: 1,
        color: 'rgba(255,255,255, 0.7)',
        '&:hover': {
            backgroundColor: 'rgba(97, 218, 251, 0.8)',
        }
    },

    filterSelect: {
        
    },

    filterMenu: {
        backgroundColor: "#20232a",
        color: 'rgba(255,255,255, 0.7)',
        // display: "flex"
    },

    datePicker: {
        
    },

    summaryDatePicker: {
        backgroundColor: 'transparent',
        color: 'white',
        border: 'none',
        display: 'flex',
        flex: 1,
        ':&:focus':{
            outline: 'none',
        }
    },

    summaryPaper: {
        // padding: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
        marginTop: 2,
        paddingRight: 30,
        paddingLeft: 30,
        backgroundColor: "#20232a",
        display: "inline-block",
        color: 'rgba(255,255,255, 0.7)'
    },

    futureSummaryPaper: {
        marginLeft: 30,
        marginRight: 10,
        marginBottom: 2,
        marginTop: 2,
        paddingRight: 30,
        paddingLeft: 30,
        backgroundColor: "#20232a",
        display: "inline-block",
        color: 'rgba(255,255,255, 0.7)'
    },

    deleteButton: {
        backgroundColor: '#282c34',
        border: 'none',
        transition: '0.3s',
        ':&:hover': {
            backgroundColor: 'red',
            padding: '8px',
            transition: '0.3s'
        },
        ':&:focus': {
            outline: 'none'
        }
    }
});

const Main = () => {
    const classes = styles();
    return (
        <Root
            classes={classes}/>
    );
}

export default Main