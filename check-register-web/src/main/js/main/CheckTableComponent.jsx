import React from 'react';

import CheckRowComponent from './CheckRowComponent';
import SummaryComponent from './SummaryComponent';

import websocketStompClient from './websocket-client';

import './checktablestyle.css';

class CheckTableComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checks: [] //these are all the checks from the given account, which will be passed to render to individual CheckRowComponents
        }

        this.scrollEndRef = React.createRef();

        this.handleEdit.bind(this);
        this.scrollToBottom.bind(this);

        this.refreshChecks.bind(this);
        this.handleNew.bind(this);

        this.finalCheckRef = React.createRef();
    }

    componentDidMount() {
        this.refreshChecks(this.scrollToBottom);
        websocketStompClient.register([
            {route: '/event/newCheck', callback: () => {this.refreshChecks(this.scrollToBottom); this.finalCheckRef.current.giveFocus()}},
            {route: '/event/updateCheck', callback: this.refreshChecks},
            {route: '/event/deleteCheck', callback: this.refreshChecks}
        ]);
    }

    componentDidUpdate() {
        //this.scrollToBottom();
    }

    scrollToBottom(){
        console.log(this.refs);
        this.scrollEndRef.current.scrollIntoView(/*{ behavior: 'smooth' }*/);   
    }

    // scrollToBottom = () => {
    //     console.log(this.refs);
    //     this.scrollEndRef.current.scrollIntoView(/*{ behavior: 'smooth' }*/);
    // }

    refreshChecks(onRefreshCallback) {
        //will have service call here to get from server

        //temp
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/checks', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                console.log('CheckBook mounted');
                console.log(JSON.parse(xhr.response));
                const result = JSON.parse(xhr.response);
                this.setState({
                    // checks: result.checks
                    ...result
                }, onRefreshCallback);
            }
        }.bind(this);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
        //----

        //[See A in plan.txt]
        // this.getSummary((updatedSummary)=>{this.setState({
        //     summary: updatedSummary
        // })})


        // this.setState({
        //     checks: [
        //         {
        //             id: 0,
        //             transactionName: "AAA",
        //             memo: "Memo A",
        //             payment: {
        //                 value: "99.99"
        //             },
        //             deposit: {
        //                 value: "88.88"
        //             }
        //         },
        //         {
        //             id: 1,
        //             transactionName: "BBB",
        //             memo: "Memo B",
        //             payment: {
        //                 value: "99.99"
        //             },
        //             deposit: {
        //                 value: "88.88"
        //             }
        //         },
        //         {
        //             id: 2,
        //             transactionName: "CCC",
        //             memo: "Memo C",
        //             payment: {
        //                 value: "99.99"
        //             },
        //             deposit: {
        //                 value: "88.88"
        //             }
        //         },
        //         {
        //             id: 3
        //         },
        //         {
        //             id: 4
        //         },
        //         {
        //             id: 5
        //         },
        //         {
        //             id: 6
        //         }
        //     ]
        // });
    }

    getSummary(onRetreivedCallback) {
        //going to later expand this to include getting the summary of only the selected checks
        //passing those to the server for the summary util to handle

        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/summary/0', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                onRetreivedCallback(JSON.parse(xhr.response));
            }
        }

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();

    }

    handleEdit(updatedCheck) {
        //search checks for the check with the given key
        //update that check

        //better way to handle this might be to push the info to state, push to server, and then use server response to update
        //state again; that way can maintain better consistency (????)

        // this.setState(function (prevState) {
        //     let newChecks = prevState.checks.map(check => (check.id == updatedCheck.id) ?
        //         {
        //             ...check,
        //             transactionName: updatedCheck.transactionName,
        //             memo: updatedCheck.memo,
        //             payment: updatedCheck.payment,
        //             deposit: updatedCheck.deposit
        //         } : check);
        //     return {
        //         checks: newChecks
        //     }
        // });
       
        //POST
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/updateCheck', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(updatedCheck));
        console.log('Sent Updated Check:', updatedCheck);

        //now do service call to update the check with the updatedCheck.id in the repo
        
        // this.refreshChecks(()=>{console.log('Post-Refresh State: ', this.state)});


        //[See A in plan.txt]
        //pass checks to server, 
        // this.getSummary((updatedSummary) => { //GET new summary from server, 
        //     this.setState({ //set state with new summary
        //         summary: updatedSummary
        //     }, () => { console.log(this.state) }); //callback for debug; remove later
        // });

        






        //No clue why the one below doesn't work? maybe it's an issue with mapping inside the object, maybe I mistyped something
        // this.setState((prevState)=>{
        //     checks: prevState.checks.map(check => (check.id === updatedCheck.id ? {
        //         ...check, 
        //         transactionName: updatedCheck.transactionName,
        //         memo: updatedCheck.memo,
        //         payment: updatedCheck.payment,
        //         deposit: updatedCheck.deposit //maybe should actually go into these and set values; not problematic atm so did this lazy approach
        //     } : check));
        // }, /*for testing purposes*/console.log(this.state.checks));




        //Old, incomplete. Here in case something explodes above and I have to continue writing like this
        // let target = null;
        // for(checkEntry in checks){
        //     if(checkEntry.id == senderKey){
        //         target = checkEntry;
        //         break;
        //     }
        // }
        // if(target !== null){ //valid check being updated; do update
        //     this.setState((prevState)=>{
        //         checks: prevState.checks.map(check => (check.id == senderKey ? {...check, 
        //         }))
        //     })

        //     target = {
        //         ...target,
        //         transactionName: updatedCheck.transactionName,
        //         memo: updatedCheck.memo,
        //         payment: updatedCheck.payment,
        //         deposit: updatedCheck.deposit //maybe should actually go into these and set values; not problematic atm so did this lazy approach
        //     }
        // }
    }

     
    handleNew(newCheck){

        //PROBLEM HERE IS NEW CHECK DOESN'T HAVE AN ID YET!

        //stuff for handling a new check
        //for now this is same as handleEdit but with an additional push of the updated check
        console.log('New Check', newCheck);

        this.setState(function (prevState) {
            let newChecks = prevState.checks.map(check => check);
            newCheck.id = newChecks[newChecks.length-1].id + 1; //this is a hack for ids to work
            newChecks.push(newCheck);
            return {
                checks: newChecks
            }
        }, () => {
            this.scrollToBottom();
            this.finalCheckRef.current.giveFocus()});

        // this.getSummary((updatedSummary) => { //GET new summary from server, 
        //     this.setState({ //set state with new summary
        //         summary: updatedSummary
        //     }, () => { console.log(this.state) }); //callback for debug; remove later
        // });
    }

    //remove later
    testClickHandler() {
        console.log(this.state.checks);
    }


    //this should have methods for sorting the checks array by the various filtering options to allow that to happen

    render() {
        return (
            //map each check to CheckRowComponent and replace all props with simple check={eachCheck}
            //then rewrite CheckRowComponent to function with just check prop
            //then add the service calls within handleUserInput to update a check
            //need to figure out how want to handle deletion of a check; should probably be a separate control or if all fields empty

            //then, go ahead and figure out how you want to display the check register portion itself
            //goal for today is at least above, then tomorrow can do accounts/summary and that is presentable already

            //then figure out accounts
            //then figure out summary [or summary first]
            //then figure out calendar, etc.
            //then go on and do reporting, login, etc. that's all later

            <div className={this.props.classes.main}>
                <div className={this.props.classes.tableView}>
                    <div className="check-table">
                        {this.state.checks.map((checkEntry, i) =>
                            <CheckRowComponent key={checkEntry.id}
                                check={checkEntry}
                                handleEdit={this.handleEdit.bind(this)}
                                ref={i==this.state.checks.length-1 ? this.finalCheckRef : undefined} />
                            )}
                        <CheckRowComponent  handleEdit={this.handleNew.bind(this)}/>
                        <div ref={this.scrollEndRef} />
                        {/* <button onClick={this.testClickHandler.bind(this)}>Test Check Update</button> */}
                    </div>
                </div>
                <div className={this.props.classes.summaryView}>
                    <SummaryComponent 
                        summary={this.state?.summary}/> {/*change to getSafe perhaps*/}
                </div>
            </div>





            // OLD:
            // <div>
            //     <CheckRowComponent transactionName={"Name A"} memo={"Memo A"} payment={{
            //         symbol: "$",
            //         value: "12.30"
            //     }} />
            //     <CheckRowComponent transactionName={"Populated Name"} />
            //     <CheckRowComponent deposit={{
            //         symbol: "₹",
            //         value: "699.90"
            //     }} />
            // </div>
        );
    }
}



export default CheckTableComponent