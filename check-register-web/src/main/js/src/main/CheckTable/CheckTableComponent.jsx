import React from 'react';

import CheckRowComponent from './CheckRowComponent';
import SummaryComponent from '../Summary/SummaryComponent';

import websocketStompClient from '../websocket-client';

import './checktablestyle.css';
import '../mainstyle.css';
import FilterComponent from '../Filter/FilterComponent';

class CheckTableComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checks: [],
            filter: {
                transactionNameFilter: "",
                memoFilter: "",
                paymentFilter: "",
                depositFilter: "",
                baseDate: null
            },
            sort: [0,0,0,0] //these are all the checks from the given account, which will be passed to render to individual CheckRowComponents
        }

        this.scrollEndRef = React.createRef();
        this.newCheckRef = React.createRef();

        this.handleEdit.bind(this);
        this.scrollToBottom.bind(this);

        this.refreshChecks.bind(this);
        this.handleNew.bind(this);
        
        this.intervalPost.bind(this);
        this.handleFilters.bind(this);
        this.handleSort.bind(this);
        this.doSort.bind(this);
        this.handleBaseDate.bind(this);
        this.handleBaseDateClear.bind(this);
        this.handleDelete.bind(this);

        this.refreshSummary.bind(this);

        this.finalCheckRef = React.createRef();

        this.updatedContent = [];
        

        this.hasBeenRefreshed = false;


        this.handlingNewFlag = false;
        this.newCheckTransient = null;
    }

    componentDidMount() {
        this.refreshChecks(this.scrollToBottom);
        this.hasBeenRefreshed = true;
        // websocketStompClient.register([
        //     //the only reason for these to exist is if somebody else does an edit now, seeing as it
        //     //simply refreshes checks with the new editing system
        //     //for this, will want to rewrite editing system to have the id of the currently edited item,
        //     //and do a refresh on everything except that item when a websocket call comes in
        //     //still want to keep the refresh in intervalPost for when all editing done, to refresh that last
        //     //item as well
        //     //this is now [G]

        //     //{route: '/event/newCheck', callback: function(){this.refreshChecks(this.scrollToBottom.bind(this)).bind(this); this.finalCheckRef.current.giveFocus().bind(this)}.bind(this)}, //i think this is totally wrong? just refresh the check surely... at least if the id is correct this shouldn't be necessary; need to actually do usability test to see if it crops up
        //     //{route: '/event/updateCheck', callback: (message) => {this.refreshChecks()}}, //hallelujah it works omg
        //     // {route: '/event/deleteCheck', callback: (message) => {/*this.refreshChecks.bind(this)*/console.log('websocket delete event')}}
        // ]);

        let promise = Promise.resolve(true);
        let thisRef = this;
        setInterval(function(){
            promise = promise.then(function(){
                return new Promise(function(resolveCallback){
                    thisRef.intervalPost(resolveCallback);
                });
            });
        }, 2000);
    }

    componentDidUpdate(prevProps) {
        if(this.props.account == null) {
            this.props.setDefaultAccount();
        }
        else if(prevProps?.account?.id != this.props.account.id){
            this.refreshChecks();
        }
    }

    scrollToBottom(){
        this.scrollEndRef.current.scrollIntoView(/*{ behavior: 'smooth' }*/);   
    }

    //complexity: optomization, promises
    //See [H] for improvements to this
    intervalPost(callback){
        // console.log('interval')
        if(this.updatedContent.length > 0){ 
            //THIS IS THE PROBLEM!!!! if the id's are fake, when sent to server, will be changed, so repopulating the updatedContent then actually makes new!!! entries
            //Only real way to solve I think is going to be to, in handleNew, actually get the new check and then edit that
            this.hasBeenRefreshed = false;
            let xhr = new XMLHttpRequest();
            xhr.addEventListener("loadend", callback);
            xhr.open('POST', '/updateChecks/'.concat(this.props.account.id), true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(this.updatedContent));
            this.updatedContent = [];

            this.refreshSummary();
        } else if(!this.hasBeenRefreshed){ //if updatedContent isn't empty, it won't refresh; eliminates the need for the timer
            this.refreshChecks();
            this.hasBeenRefreshed = true;
            callback(true);
        } else{
            callback(true);
        }
    }

    handleFilters(newFilter){
        this.setState({
            filter: newFilter
        }, this.refreshChecks.bind(this));
    }

    handleSort(newSort, postSortCallback){
        this.setState({
            sort: newSort
        }, postSortCallback);
    }

    //complexity: sorting
    doSort(list){
        const sortConfig = this.state.sort;
        if(sortConfig[0] != 0){
            list.sort((a, b) => (a.transactionName.toUpperCase() > b.transactionName.toUpperCase()) ? sortConfig[0] : -sortConfig[0])
        } else if(sortConfig[1] != 0){
            list.sort((a, b) => (a.memo.toUpperCase() > b.memo.toUpperCase()) ? sortConfig[1] : -sortConfig[1])
        } else if(sortConfig[2] != 0){
            list.sort((a, b) => (parseFloat(a.payment.value) > parseFloat(b.payment.value)) ? sortConfig[2] : -sortConfig[2])
        } else if(sortConfig[3] != 0){
            list.sort((a, b) => (parseFloat(a.deposit.value) > parseFloat(b.deposit.value)) ? sortConfig[3] : -sortConfig[3])
        } 

        else {
            list.sort((a,b) => (
                a.date == b.date ? 0
                : a.date == null ? 1 
                : b.date == null ? -1
                : a.date < b.date ? -1 : 1))
        }
    }

    isValidDate(d) {
        return d instanceof Date && !isNaN(d);
      }

    getDate(dateStr){
        let date = null;
        if(dateStr != null){
            date = new Date(dateStr.replace(/-/g, '\/'));
        }
        if(this.isValidDate(date)){
            return date;
        }
        return null;
    }

    refreshChecks(onRefreshCallback) {
        console.log('refresh')
        console.log(this.props.account)
        if(this.props.account == null){
            console.log('block')
            return;
        }
            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/filteredChecks/'.concat(this.props.account.id), true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    console.log('CheckBook mounted');
                    console.log(JSON.parse(xhr.response));
                    let result = JSON.parse(xhr.response);
                    this.doSort(result.checks);
                    this.setState({
                        //checks: result.checks,
                        ...result
                    }, onRefreshCallback);
                }
            }.bind(this);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(this.state.filter));
    }


    refreshSummary(){
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/summary/'.concat(this.props.account.id), true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                let result = JSON.parse(xhr.response);
                this.setState({
                    summary: result,
                });
            }
        }.bind(this);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(this.state.filter));
    }

    // getSummary(onRetreivedCallback) {
    //     let xhr = new XMLHttpRequest();
    //     xhr.open('GET', 'http://localhost:5000/summary/0', true);
    //     xhr.onreadystatechange = function () {
    //         if (xhr.readyState == 4) {
    //             onRetreivedCallback(JSON.parse(xhr.response));
    //         }
    //     }

    //     xhr.setRequestHeader('Content-Type', 'application/json');
    //     xhr.send();

    // }

    //complexity: keeping track of changes
    handleEdit(updatedCheck) {
        // console.log('edit')
        // console.log('%c%s',
        // 'color: blue; background: orange; font-size: 24px;','Hit edit!')
        // console.log('%c%s',
        // 'color: blue; background: orange; font-size: 24px;',this.updatedContent)
        
        //See [E] in plan.txt
        this.setState(function (prevState) {
            let newChecks = prevState.checks.map(check => (check.id == updatedCheck.id) ?
                {
                    ...check,
                    transactionName: updatedCheck.transactionName,
                    memo: updatedCheck.memo,
                    payment: updatedCheck.payment,
                    deposit: updatedCheck.deposit,
                    date: updatedCheck.date
                } : check);
            return {
                checks: newChecks
            }
        });

        let contained = false;
        this.updatedContent.forEach((arrayCheck, i) => {
            // console.log(arrayCheck, updatedCheck)
            if(arrayCheck.id == updatedCheck.id){
                // console.log('set')
                this.updatedContent[i] = updatedCheck;
                contained = true;
            }
        });
        if(!contained){
            // console.log('pushed')
            this.updatedContent.push(updatedCheck);
        }
    }

    //complexity: describe the bug you squashed! need to suppress to get response from server, temp ids don't work
    handleNew(newCheck){
        if(this.handlingNewFlag){
            this.newCheckTransient = newCheck; //keep updating, but don't do more requests
            return; //blocking from doing request forever
        }
        this.handlingNewFlag = true;
        this.newCheckTransient = newCheck; //init time

        let completeCheck = null;

        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/newCheck/'.concat(this.props.account.id), true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                //got the new check, result will have the id we need
                // console.log(xhr.response)
                const result = JSON.parse(xhr.response);
                this.setState(function(prevState){
                    let newChecks = prevState.checks.map(check => check);
                    let newCheckUpd = this.newCheckTransient; //use the latest edits
                    newCheckUpd.id = result.id; //use the db id
                    completeCheck = newCheckUpd;
                    newChecks.push(newCheckUpd);
                    return ({
                        checks: newChecks
                    });
                }, () => {
                    this.finalCheckRef.current.giveFocus();
                    this.newCheckRef.current.resetState();
                    this.handlingNewFlag = false;
                    this.newCheckTransient = null;
                this.updatedContent.push(completeCheck); //because it will be the only new one for sure, and now have set id so can safely push
                                                        //have to use completeCheck to get the newCheckTransient updates AND the newCheckUpd id
                this.scrollToBottom();
            });
            }
        }.bind(this);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(newCheck));




        // console.log("new")
        // //PROBLEM HERE IS NEW CHECK DOESN'T HAVE AN ID YET!

        // //stuff for handling a new check
        // //for now this is same as handleEdit but with an additional push of the updated check
        // this.newCheckRef.current.resetState();
        
        // this.setState(function (prevState) {
        //     //can implement pseudo id or can try to patch over by finding largest id and doing +1 there

        //     //the reason for duplicates is likely that this id doesn't agree with repo one, so then
        //     //when it sets the state it actually adds it as another check; every simple time
        //     //the post interval happens, then, the check is sent as a new one because 
        //     //repo.save does both updating and merging, so unbeknownst what seems like it should
        //     //be an update is actually a save into the db
        //     //I think that's at least part of what it must be; might be deeper though
        //     let newChecks = prevState.checks.map(check => check);
        //     //See [F] on how to change to internal id
        //     newCheck.id = newChecks[newChecks.length-1].id + 1; //this is a hack for ids to work
        //     newChecks.push(newCheck);
        //     return {
        //         checks: newChecks
        //     }
        // }, () => {
        //     this.scrollToBottom();
        //     this.finalCheckRef.current.giveFocus()
            
        //     let contained = false;
        //     this.updatedContent.forEach((arrayCheck, i) => {
        //         if(arrayCheck.id == newCheck.id){
        //             contained = true;
        //         }
        //     });
        //     if(!contained){
        //         this.updatedContent.push(newCheck); 
        //         //so if a single character is entered, this check will still be pushed
        //         //BUT, if it is already in there (IE, with >1 character) from future handleEdit events,
        //         //then it won't be pushed; this prevents accidently reverting to the earlier state when
        //         //handleNew was called and then handleEdit was called in future
        //     }
        // });
    }

    getSafe(fn, defaultValue) {
        try {
            return fn();
        } catch (e) {
            return defaultValue;
        }
    }

    handleBaseDate(newDate){
        this.setState(function(prevState){
            let newState = {
                summary: {
                    ...prevState.summary,
                    baseDate: this.getSafe(()=>newDate.getTime()/1000, null)
                },
                filter: {
                    ...prevState.filter,
                    baseDate: this.getSafe(()=>newDate.getTime()/1000, null) 
                }
            };
            return newState;
    }, this.refreshChecks.bind(this));
        
    }

    handleBaseDateClear(){
        this.setState(function(prevState){
            let newState = {
                summary: {
                    ...prevState.summary,
                    baseDate: null
                },
                filter: {
                    ...prevState.filter,
                    baseDate: null
                }
            };
            return newState;
    }, this.refreshChecks.bind(this));
    }

    handleDelete(deleteId){
        if(deleteId){
            let xhr = new XMLHttpRequest();
            xhr.open('DELETE', '/deleteCheck/'.concat(deleteId), true);
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    this.refreshChecks();
                }
            }.bind(this)
            xhr.setRequestHeader('DELETE', 'application/json');
            xhr.send(deleteId);

            this.setState(function (prevState) {
                let newChecks = prevState.checks.map((check) => check);
                prevState.checks.forEach((check, i) =>{
                    if(check.id == deleteId){
                        newChecks.splice(i, 1);
                    }
                });
                return {
                    checks: newChecks
                };
            });
        }
    }


    //this should have methods for sorting the checks array by the various filtering options to allow that to happen

    render() {
        return (
            <div className={this.props.classes.main}>
                <div className={this.props.classes.filterView}>
                    <FilterComponent classes={{
                        root: this.props.classes.filterRoot,
                        paper: this.props.classes.filterPaper,
                        input: this.props.classes.filterInput,
                        button: this.props.classes.filterButton,
                        select: this.props.classes.filterSelect,
                        menu: this.props.classes.filterMenu,
                    }}
                    handleFilters={this.handleFilters.bind(this)}
                    handleSort={this.handleSort.bind(this)}/>
                </div>
                <div className={this.props.classes.tableView}>
                    <div className="check-table">
                        {this.state.checks.map((checkEntry, i) =>
                            <CheckRowComponent key={checkEntry.id}
                                check={checkEntry}
                                handleEdit={this.handleEdit.bind(this)}
                                classes = {this.props.classes}
                                handleDelete={this.handleDelete.bind(this)}
                                ref={i==this.state.checks.length-1 ? this.finalCheckRef : undefined} />
                            )}
                        <CheckRowComponent  
                            classes = {this.props.classes}
                            handleEdit={this.handleNew.bind(this)}
                            immutable={true}
                            ref={this.newCheckRef}/>
                        <div ref={this.scrollEndRef} />
                    </div>
                </div>
                <div className={this.props.classes.summaryView}>
                    <SummaryComponent 
                        classes={this.props.classes}
                        summary={this.state?.summary}
                        handleBaseDate={this.handleBaseDate.bind(this)}
                        handleBaseDateClear={this.handleBaseDateClear.bind(this)}/> {/*change to getSafe perhaps*/}
                </div>
            </div>
        );
    }
}



export default CheckTableComponent