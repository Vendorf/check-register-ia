import React from 'react';

import AccountPaneComponent from "./AccountPaneComponent";
import CheckTableComponent from "./CheckTableComponent";
import SummaryComponent from "./SummaryComponent";

import { Drawer, Grid, Paper, Typography, CssBaseline, List, ListItem, ListItemText, makeStyles, Divider, AppBar, Box, Container, Toolbar, Button, ListItemIcon } from "@material-ui/core";
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';

import Subscriptions from '../SubscriptionsHistory/SubscriptionsHistory'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// import SplitPane from "./SplitPane"
import SplitPane from "react-split-pane"

// import Split from "react-split";

// import './mainstyle.css';
import './split.css';
import PermanentDrawerLeft from './temp';
import ReportComponent from './ReportComponent';

const drawerWidth = 240;

const styles = makeStyles({
    root: {
        height: "100vh", //kind of feels wrong :/
        width: "100vw",
        display: 'flex',
        flexDirection: 'row',
        // border: "3px tomato solid"
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

    // content: {
    //     flexGrow: 1
    // },

    main: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        // border: "2px magenta solid"
    },

    tableView: {
        flex: 65,
        display: "flex",
        flexDirection: 'row',
        overflowY: "auto",
        backgroundColor: "#282c34",
        // border: "10px orange solid"
    },

    summaryView: {
        flex: 35,
        display: "flex",
        flexDirection: "column",
        // border: "4px red solid"
    },

    split: {
        flex: 1
    },

    appBar: {
        zIndex: 1400
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
            // transition: 0.1,
            backgroundColor: 'rgba(97, 218, 251, 0.8)',
            // color: 'rgba(255,255,255, 0.9)'
        }
    },

    subToolBar: {
        paddingTop: 25
    },

    listButton: {
        paddingTop: 20,
        paddingBottom: 20,
        // textAlign: "center",
        color: 'rgba(255,255,255, 0.7)',
        '&:hover': {
            backgroundColor: 'rgba(97, 218, 251, 0.8)',
        }
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

    // contentShifted: {
    //     display: 'flex',
    //     flex: 1,
    //     marginLeft: -drawerWidth,
    //     transition: 'margin-left 500ms cubic-bezier(0.23, 1, 0.32, 1)'
    // },
});

function Main() {

    const classes = styles();
    const [open, setOpen] = React.useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    }

    return (
        <Router>
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar disableGutters className={classes.toolBar}>
                        <Button className={classes.toolBarButton} onClick={toggleDrawer}>Menu</Button>
                        <Button className={classes.toolBarButton} component={Link} to="/">Main</Button>
                        <Button className={classes.toolBarButton} component={Link} to="/report">Report</Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={open ? classes.drawer : classes.drawerClosed}
                    variant="persistent"
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    open={open}
                    transitionDuration={0}>
                    <List className={classes.subToolBar}>
                        <ListItem button className={classes.listButton}>
                            <ListItemIcon>
                                <AccountBalanceWalletOutlinedIcon className={classes.accountIcon} />
                            </ListItemIcon>
                            <ListItemText primary="Account A"></ListItemText>
                        </ListItem>
                        <ListItem button className={classes.listButton}>
                            <ListItemIcon>
                                <AccountBalanceWalletOutlinedIcon className={classes.accountIcon} />
                            </ListItemIcon>
                            <ListItemText primary="Account B"></ListItemText>
                        </ListItem>
                        <ListItem button className={classes.listButton}>
                            <ListItemIcon>
                                <AccountBalanceWalletOutlinedIcon className={classes.accountIcon} />
                            </ListItemIcon>
                            <ListItemText primary="Account C"></ListItemText>
                        </ListItem>
                    </List>
                </Drawer>
                <div className={classes.content}>
                    <Switch>
                        <Route exact path="/">
                            <CheckTableComponent
                                classes={classes} />
                                {/* https://stackoverflow.com/questions/50777333/react-hide-a-component-on-a-specific-route
                                Right now this is re-rendering; want to instead configure where it uses withRouter
                                Instead of how they have it, however, the component is always rendered and will set hidden/visible
                                
                                ALTERNATIVELY (and this is probably better on second thought) just have a method here in Main.jsx
                                that is used as an onClick handler for the routing buttons, and that will hide/unhide the CheckTable
                                (or/and any other components) as necessary [with a direct DOM lookup]*/}
                        </Route>
                        <Route path="/report">
                            <ReportComponent />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>







        // <div className={classes.root}>
        //     <Drawer
        //         className={classes.drawer}
        //         variant="permanent"
        //         classes={{
        //             paper: classes.drawerPaper
        //         }}></Drawer>
        //     <CheckTableComponent
        //         classes={classes}/>
        // </div>











        // <div className={classes.root}>
        //     <CssBaseline />
        //     {/* <div className="sidebar">Sidebar</div> */}
        //     <Drawer
        //         className={classes.drawer}
        //         variant='permanent'
        //         classes={{
        //             paper: classes.drawerPaper
        //         }}></Drawer>
        //     <div className={classes.main}>
        //         {/* <SplitPane
        //             className={classes.split}
        //             split="horizontal"
        //             defaultSize="100%"
        //             > */}
        //             <div className={classes.tableView}>
        //                 <CheckTableComponent />
        //             </div>
        //             <div className={classes.summaryView}>
        //                 <SummaryComponent />
        //             </div>
        //         {/* </SplitPane> */}
        //     </div>
        //     {/* <div className={classes.main}> */}


        //     {/* <div className={classes.summaryView}>
        //             <SummaryComponent/>
        //         </div> */}

        //     {/* <SplitPane>
        //             <SplitPane.Top>
        //                 <div className="table-view">
        //                     <CheckTableComponent/>
        //                 </div>
        //             </SplitPane.Top>
        //             <SplitPane.Bottom>
        //                 <div className="summary-view">
        //                     <SummaryComponent/>
        //                 </div>
        //             </SplitPane.Bottom>
        //         </SplitPane> */}
        //     {/* </div> */}
        // </div>

        //--------------------------

        // <PermanentDrawerLeft />
        // <div className="temp">
        //     <CssBaseline/>
        //     <Drawer
        //         className="temp-drawer"
        //         variant="permanent"
        //         anchor="left"></Drawer>
        //     <main className="temp-content">
        //         <Typography paragraph>Lorem ipsum dolor sin amet</Typography>
        //     </main>
        // </div>

        // <div className={classes.root}>
        //     <CssBaseline />
        //     <Drawer
        //         className={classes.drawer}
        //         variant="permanent"
        //         anchor="left"
        //         classes={{
        //             paper: classes.drawerPaper
        //         }}>
        //         <Divider />
        //         <List>
        //             <ListItem button>
        //                 <ListItemText primary="Button A" />
        //             </ListItem>
        //         </List>
        //     </Drawer>
        //     <Typography paragraph>Lorem ipsum dolor sin amet lorem ispum dolor sin amet</Typography>
        // </div>

        //------------------------

        // <div className="temp">
        //     <CssBaseline/>
        //     <Drawer
        //     // className="temp-drawer"
        //     className={classes.test}
        //     variant="permanent"
        //     anchor="left">
        //             {/* <Typography>Hello this is content</Typography> */}
        //             <List>
        //                 <ListItem button>
        //                     <ListItemText primary="Text"/>
        //                 </ListItem>
        //             </List>
        //     </Drawer>
        //     <main className="temp2">
        //         {/* <Grid container>
        //             <Grid item xs={12}>
        //                 <Paper>jlkasjdfklajslkdfjalksjdflkajslkdfjlkasjdflkajskldfjlkasjfd</Paper>
        //             </Grid>
        //         </Grid> */}
        //         <Typography paragraph>Lorem ipsum dolor sin amet</Typography>
        //     </main>
        // </div>

        // <div className="container">
        //     {/* <Drawer 
        //         anchor="left" 
        //         variant="permanent"
        //         open/> */}
        //     <div className="sidebar">Sidebar</div>
        //     <div className="main">
        //         <SplitPane>
        //             <SplitPane.Top>
        //                 <div className="table-view">
        //                     <CheckTableComponent/>
        //                 </div>
        //             </SplitPane.Top>
        //             <SplitPane.Bottom>
        //                 <div className="summary-view">
        //                     <SummaryComponent/>
        //                 </div>
        //             </SplitPane.Bottom>
        //         </SplitPane>
        //     </div>
        // </div>

        // <div className="container">
        //     <div className="sidebar">Sidebar</div>
        //     <div className="main">
        //         <div className="table-view">
        //             <CheckTableComponent/>
        //         </div>
        //         <div className="summary-view">
        //             <SummaryComponent/>
        //         </div>
        //     </div>
        // </div>
    );
}

export default Main